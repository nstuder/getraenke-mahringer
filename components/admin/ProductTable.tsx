'use client';

import { useState, useEffect, useRef } from 'react';
import { Product } from '@/schema/products';
import { Search, Plus, FileUp, FileDown, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductModal from './ProductModal';
import { getProducts, getAllProductsForExport, importProductsFromCSV } from '@/lib/actions/products';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getProducts({ page: currentPage, search });
    setProducts(result.data);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, search]);

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleExportCSV = async () => {
    const allProducts = await getAllProductsForExport();
    const csv = stringify(allProducts, {
      header: true,
      delimiter: ';',
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'produkte.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      try {
        const records = parse(text, {
          columns: true,
          delimiter: ';',
          skip_empty_lines: true,
        });
        const formatted = records.map((r: any) => ({
            name: r.name || r.Name,
            category: r.category || r.Kategorie,
            price: parseFloat((r.price || r.Preis || '0').toString().replace(',', '.')),
            quantity: r.quantity || r.Verkaufsmenge,
            brand: r.brand || r.Marke,
            description: r.description || r.Beschreibung,
        }));
        await importProductsFromCSV(formatted);
        fetchProducts();
        alert('Import erfolgreich');
      } catch (error) {
        console.error(error);
        alert('Fehler beim Importieren der CSV');
      }
    };
    reader.readAsText(file);
  };

  const handleExportPDF = async () => {
    const allProducts = await getAllProductsForExport();
    const doc = new jsPDF();
    
    const addHeader = (data: any) => {
      const pageWidth = doc.internal.pageSize.width;
      
      // Logo
      const logoWidth = 40;
      const logoHeight = 20;
      const logoX = (pageWidth - logoWidth) / 2;
      
      try {
        doc.addImage('/logo.jpg', 'JPEG', logoX, 10, logoWidth, logoHeight);
      } catch (e) {
        // Fallback if image fails
        doc.setFontSize(18);
        doc.setTextColor(0, 51, 102);
        const fallbackText = 'Mahringer';
        const fallbackWidth = doc.getTextWidth(fallbackText);
        doc.text(fallbackText, (pageWidth - fallbackWidth) / 2, 20);
      }
      
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const contactText = 'Forlenstraße 4-6, 68305 Mannheim | Tel: +49 (0)6 21 75 39 54 | E-Mail: bernd-mahringer@t-online.de';
      const textWidth = doc.getTextWidth(contactText);
      doc.text(contactText, (pageWidth - textWidth) / 2, 35);
    };

    const categoriesList = Array.from(new Set(allProducts.map(p => p.category)));
    const groupedData: { title: string, products: Product[] }[] = [];

    categoriesList.forEach(category => {
        const catProducts = allProducts.filter(p => p.category === category);
        const brandsInCategory = Array.from(new Set(catProducts.map(p => p.brand).filter(Boolean)));
        
        let remainingProducts = [...catProducts];
        
        brandsInCategory.forEach(brand => {
            const brandProducts = catProducts.filter(p => p.brand === brand);
            if (brandProducts.length > 5) {
                groupedData.push({
                    title: `${category} - ${brand}`,
                    products: brandProducts
                });
                remainingProducts = remainingProducts.filter(p => p.brand !== brand);
            }
        });
        
        if (remainingProducts.length > 0) {
            groupedData.push({
                title: category,
                products: remainingProducts
            });
        }
    });
    
    let currentY = 40;
    let currentColumn = 0; // 0 for left, 1 for right
    const columnWidth = 90;
    const gutter = 10;
    const marginLeft = 14;
    
    groupedData.forEach((group, index) => {
        const startX = marginLeft + (currentColumn * (columnWidth + gutter));
        
        autoTable(doc, {
            startY: currentY,
            margin: { left: startX, right: doc.internal.pageSize.width - (startX + columnWidth) },
            head: [[{ content: group.title, colSpan: 2, styles: { fillColor: [0, 51, 102], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 10 } }]],
            body: group.products.map(p => [
                `${p.name} ${p.quantity ? `(${p.quantity})` : ''}`,
                `${p.price.toFixed(2).replace('.', ',')} €`
            ]),
            theme: 'striped',
            headStyles: { fillColor: [0, 51, 102] },
            styles: { fontSize: 8, cellPadding: 1 },
            columnStyles: {
                0: { cellWidth: 'auto' },
                1: { cellWidth: 20, halign: 'right' }
            },
            didDrawPage: (data) => {
                addHeader(data);
            }
        });

        const lastY = (doc as any).lastAutoTable.finalY;
        
        // Decide where to put next group
        if (index < groupedData.length - 1) {
            const nextGroup = groupedData[index + 1];
            const estimatedHeight = 10 + (nextGroup.products.length * 5); // Rough estimation

            if (lastY + estimatedHeight > doc.internal.pageSize.height - 20) {
                // Not enough space in current column
                if (currentColumn === 0) {
                    currentColumn = 1;
                    currentY = 40;
                } else {
                    doc.addPage();
                    currentColumn = 0;
                    currentY = 40;
                }
            } else {
                currentY = lastY + 5;
            }
        }
    });

    doc.save('preisliste.pdf');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-darkblue">Produkte</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors"
          >
            <Plus size={18} />
            <span>Neu</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            <FileUp size={18} />
            <span>Import</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportCSV}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
          >
            <FileDown size={18} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
          >
            <FileText size={18} />
            <span>Preisliste PDF</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Produkte suchen..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-darkblue focus:border-darkblue sm:text-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marke</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Menge</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preis</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">Laden...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">Keine Produkte gefunden</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => handleRowClick(product)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toFixed(2).replace('.', ',')} €</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Zurück
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Weiter
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Zeige <span className="font-medium">{(currentPage - 1) * 20 + 1}</span> bis <span className="font-medium">{Math.min(currentPage * 20, total)}</span> von <span className="font-medium">{total}</span> Ergebnissen
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === i + 1
                      ? 'z-10 bg-darkblue border-darkblue text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          </div>
        </div>
      </div>

      <ProductModal
        key={selectedProduct?.id || 'new'}
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={() => {
          setIsModalOpen(false);
          fetchProducts();
        }}
      />
    </div>
  );
}
