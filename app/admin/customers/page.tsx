import CustomerTable from '@/components/admin/CustomerTable';

export default function CustomersPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-darkblue mb-4">Kunden</h1>
      <CustomerTable />
    </div>
  );
}
