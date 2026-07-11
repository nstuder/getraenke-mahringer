import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Image 
          src="/logo.jpg" 
          alt="Logo" 
          width={400} 
          height={200} 
          priority 
          className="h-auto w-auto max-w-[300px] sm:max-w-[400px]" 
        />
      </div>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        {children}
      </div>
    </div>
  );
}
