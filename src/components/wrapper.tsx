import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface WrapperProps {
  children: ReactNode
}

function Wrapper({ children }: WrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-white to-red-50 px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Wrapper;
