import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

export default function Layout({ children }) {
  return (
    <>
      <main className={poppins.className}>
        <Navbar />
        <div>{children}</div>
      </main>
    </>
  );
}
