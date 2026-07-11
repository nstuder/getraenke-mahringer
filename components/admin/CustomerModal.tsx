'use client';

import { useState, useEffect } from 'react';
import { Customer } from '@/schema/customers';
import { Product } from '@/schema/products';
import { createCustomer, updateCustomer, deleteCustomer } from '@/lib/actions/customers';
import { getAllProducts } from '@/lib/actions/products';
import { X, Plus, Trash2 } from 'lucide-react';

interface TemplateItem {
  productId: number;
  quantity: string;
}

interface CustomerModalProps {
  customer?: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomerModal({ customer, isOpen, onClose }: CustomerModalProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);

  const [formData, setFormData] = useState<Partial<Customer>>(
    customer || { 
      customerNumber: '', 
      name: '', 
      notes: '', 
      template: '', 
      invoices: '', 
      email: '', 
      street: '',
      houseNumber: '',
      city: '',
      zipCode: '',
      address: '' 
    }
  );

  useEffect(() => {
    const fetchAllProducts = async () => {
      const products = await getAllProducts();
      setAllProducts(products);
    };
    if (isOpen) {
      fetchAllProducts();
      const initialData = customer || { 
        customerNumber: '', 
        name: '', 
        notes: '', 
        template: '', 
        invoices: '', 
        email: '', 
        street: '',
        houseNumber: '',
        city: '',
        zipCode: '',
        address: '' 
      };
      setFormData(initialData);
      
      try {
        if (initialData.template) {
          setTemplateItems(JSON.parse(initialData.template));
        } else {
          setTemplateItems([]);
        }
      } catch (e) {
        console.error("Failed to parse template", e);
        setTemplateItems([]);
      }
    }
  }, [customer, isOpen]);

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddTemplateItem = () => {
    setTemplateItems([...templateItems, { productId: allProducts[0]?.id || 0, quantity: '1' }]);
  };

  const handleRemoveTemplateItem = (index: number) => {
    setTemplateItems(templateItems.filter((_, i) => i !== index));
  };

  const handleTemplateItemChange = (index: number, field: keyof TemplateItem, value: any) => {
    const newItems = [...templateItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setTemplateItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSave = {
        ...formData,
        template: JSON.stringify(templateItems)
      };
      if (customer?.id) {
        await updateCustomer(customer.id, dataToSave);
      } else {
        await createCustomer(dataToSave as any);
      }
      onClose();
    } catch (error) {
      console.error(error);
      alert('Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!customer?.id) return;
    if (!confirm('Kunde wirklich löschen?')) return;
    setLoading(true);
    try {
      await deleteCustomer(customer.id);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Fehler beim Löschen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-primary text-white">
          <h2 className="text-xl font-bold">{customer ? 'Kunde bearbeiten' : 'Neuer Kunde'}</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Kundennummer</label>
              <input
                type="text"
                required
                value={formData.customerNumber || ''}
                onChange={(e) => setFormData({ ...formData, customerNumber: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">E-Mail</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="col-span-2 grid grid-cols-4 gap-2">
              <div className="col-span-3">
                <label className="block text-sm font-medium">Straße</label>
                <input
                  type="text"
                  value={formData.street || ''}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Nr.</label>
                <input
                  type="text"
                  value={formData.houseNumber || ''}
                  onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-4 gap-2">
              <div>
                <label className="block text-sm font-medium">PLZ</label>
                <input
                  type="text"
                  value={formData.zipCode || ''}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-sm font-medium">Stadt</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Adresse (Vollständig / Alt)</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full border rounded p-2"
                rows={1}
              />
            </div>
            <div className="col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Produkt-Template</label>
                <button
                  type="button"
                  onClick={handleAddTemplateItem}
                  className="text-xs flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  <Plus size={14} />
                  <span>Hinzufügen</span>
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto border rounded p-2 bg-gray-50">
                {templateItems.map((item, index) => (
                  <div key={index} className="flex space-x-2 items-center">
                    <select
                      value={item.productId}
                      onChange={(e) => handleTemplateItemChange(index, 'productId', parseInt(e.target.value))}
                      className="flex-1 text-sm border rounded p-1"
                    >
                      <option value={0}>Produkt wählen...</option>
                      {allProducts.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Menge"
                      value={item.quantity}
                      onChange={(e) => handleTemplateItemChange(index, 'quantity', e.target.value)}
                      className="w-20 text-sm border rounded p-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTemplateItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {templateItems.length === 0 && (
                  <p className="text-xs text-gray-500 text-center py-2">Keine Produkte im Template</p>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Rechnungen (Kommagetrennt)</label>
              <input
                type="text"
                value={formData.invoices || ''}
                onChange={(e) => setFormData({ ...formData, invoices: e.target.value })}
                className="w-full border rounded p-2"
                placeholder="INV-001, INV-002..."
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Anmerkungen</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border rounded p-2"
                rows={2}
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            {customer && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                Löschen
              </button>
            )}
            <div className="flex space-x-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="border px-4 py-2 rounded hover:bg-gray-100 transition-colors"
                disabled={loading}
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="bg-darkblue text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                disabled={loading}
              >
                {loading ? 'Speichern...' : 'Speichern'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
