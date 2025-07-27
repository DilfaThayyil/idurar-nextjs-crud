import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ProjectHub - Project Management Made Simple',
  description: 'A modern project management application built with Next.js and MongoDB',
  keywords: ['project management', 'nextjs', 'mongodb', 'react', 'typescript'],
  authors: [{ name: 'Your Name' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
