'use client';

import { useState, useEffect, useRef } from 'react';
import { Customer } from '@/schema/customers';
import { Search, Plus, FileUp, FileDown, ChevronLeft, ChevronRight } from 'lucide-react';
import CustomerModal from './CustomerModal';
import { getCustomers, getAllCustomersForExport, importCustomersFromCSV } from '@/lib/actions/customers';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

export default function CustomerTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCustomers = async () => {
    setLoading(true);
    const result = await getCustomers({ page: currentPage, search });
    setCustomers(result.data);
    setTotal(result.total);
    setTotalPages(result.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, [currentPage, search]);

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleExportCSV = async () => {
    const allCustomers = await getAllCustomersForExport();
    const csv = stringify(allCustomers, {
      header: true,
      delimiter: ';',
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'kunden.csv');
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
            customerNumber: r.customerNumber || r.Kundennummer,
            name: r.name || r.Name,
            notes: r.notes || r.Anmerkungen,
            template: r.template || r.Template,
            invoices: r.invoices || r.Rechnungen,
            email: r.email || r.Email || r['E-Mail'],
            street: r.street || r.Strasse || r.Straße,
            houseNumber: r.houseNumber || r.Hausnummer,
            city: r.city || r.Stadt || r.Ort,
            zipCode: r.zipCode || r.PLZ,
            address: r.address || r.Adresse,
        }));
        await importCustomersFromCSV(formatted);
        fetchCustomers();
        alert('Import erfolgreich');
      } catch (error) {
        console.error(error);
        alert('Fehler beim Importieren der CSV');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-darkblue">Kunden</h1>
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
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Kunden suchen..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kundennummer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-Mail</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Laden...</td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Keine Kunden gefunden</td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  onClick={() => handleRowClick(customer)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.customerNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                    {customer.street ? `${customer.street} ${customer.houseNumber || ''}, ${customer.zipCode || ''} ${customer.city || ''}` : customer.address}
                  </td>
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
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Zurück
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
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
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Zurück</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Weiter</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchCustomers();
        }}
        customer={selectedCustomer}
      />
    </div>
  );
}
