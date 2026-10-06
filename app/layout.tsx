import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Noto_Serif_Tamil, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--f-serif', display: 'swap' });
const tamil = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['400', '600', '700'], variable: '--f-tamil', display: 'swap' });
const deva = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: ['400', '600'], variable: '--f-deva', display: 'swap' });
const title = 'Pandi Kirubhakaran E ❤️ Sowmiya C | Wedding Invitation';
const description = 'We are getting married on 20 November 2026. Join us and bless our new beginning.';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), title, description,
  openGraph: { title, description, type: 'website', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Pandi ❤️ Sowmiya — 20 • 11 • 2026' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
};
export const viewport: Viewport = { themeColor: '#6D071A', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ta" className={`${serif.variable} ${tamil.variable} ${deva.variable}`}><body>{children}</body></html>;
}
