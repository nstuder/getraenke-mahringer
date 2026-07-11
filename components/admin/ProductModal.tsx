'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/schema/products';
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products';
import { X } from 'lucide-react';

interface ProductModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || { name: '', category: '', price: 0, quantity: '', brand: '', description: '' }
  );

  useEffect(() => {
    if (isOpen) {
      setFormData(product || { name: '', category: '', price: 0, quantity: '', brand: '', description: '' });
    }
  }, [product, isOpen]);

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (product?.id) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData as any);
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
    if (!product?.id) return;
    if (!confirm('Produkt wirklich löschen?')) return;
    setLoading(true);
    try {
      await deleteProduct(product.id);
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
          <h2 className="text-xl font-bold">{product ? 'Produkt bearbeiten' : 'Neues Produkt'}</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
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
              <label className="block text-sm font-medium">Kategorie</label>
              <input
                type="text"
                required
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Preis (€)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Menge</label>
              <input
                type="text"
                value={formData.quantity || ''}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Marke</label>
              <input
                type="text"
                value={formData.brand || ''}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Beschreibung</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            {product && (
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
