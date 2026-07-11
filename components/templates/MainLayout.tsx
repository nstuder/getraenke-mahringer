import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-12 prose prose-slate prose-headings:text-darkblue prose-a:text-primary max-w-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
