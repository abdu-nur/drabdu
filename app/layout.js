import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Dr. Abdu - Premium Dental Care & Cosmetic Dentistry",
  description: "Experience the future of dentistry with Dr. Abdu. Premium cosmetic dentistry, implants, and orthodontics with cutting-edge technology and precision care. Transform your smile today.",
  keywords: "dentist, cosmetic dentistry, dental implants, orthodontics, dental care, smile transformation, Dr. Abdu",
  authors: [{ name: "Dr. Abdu" }],
  creator: "Dr. Abdu",
  publisher: "Dr. Abdu Dental Care",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://drabdu.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Dr. Abdu - Premium Dental Care & Cosmetic Dentistry",
    description: "Experience the future of dentistry with Dr. Abdu. Premium cosmetic dentistry, implants, and orthodontics with cutting-edge technology and precision care.",
    url: 'https://drabdu.com',
    siteName: 'Dr. Abdu Dental Care',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Abdu - Premium Dental Care',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr. Abdu - Premium Dental Care & Cosmetic Dentistry",
    description: "Experience the future of dentistry with Dr. Abdu. Premium cosmetic dentistry, implants, and orthodontics with cutting-edge technology and precision care.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
