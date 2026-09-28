import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'ProjectLoop — Evolving Institutional Intelligence',
  description: 'Turn student projects, failures and discoveries into an evolving institutional intelligence. Every project has a story — don\'t let it disappear.',
  keywords: ['student projects', 'institutional intelligence', 'project DNA', 'failure memory', 'knowledge management'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
