
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import ThreeParticleSystem from '@/components/effects/three-particle-system';
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggleButton } from '@/components/layout/ThemeToggleButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyresense.com'; // Define a base URL, ideally from an env variable

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important for resolving relative Open Graph URLs
  title: {
    default: 'HyreSense: AI-Powered Job Matching & Smart Hiring Platform',
    template: '%s | HyreSense',
  },
  description: 'HyreSense revolutionizes recruitment with AI. Job seekers find dream jobs with smart matching and skill analysis. Employers discover top talent faster. Swipe, apply, and hire smarter.',
  keywords: [
    'AI job search',
    'intelligent hiring',
    'job matching',
    'career development',
    'skill gap analysis',
    'talent acquisition',
    'recruitment platform',
    'swipe to apply',
    'candidate ranking',
    'HR technology',
    'job board',
    'get hired',
    'find talent',
  ],
  authors: [{ name: 'HyreSense Team', url: siteUrl }],
  creator: 'HyreSense',
  publisher: 'HyreSense',
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
  openGraph: {
    title: 'HyreSense: AI-Powered Job Matching & Smart Hiring',
    description: 'Discover a new era of recruitment. HyreSense uses AI for smart job matching, skill analysis, and efficient talent acquisition.',
    url: siteUrl,
    siteName: 'HyreSense',
    // images: [ // Add a default OG image if you have one
    //   {
    //     url: `${siteUrl}/og-image.png`, // Example: place an image in your public folder
    //     width: 1200,
    //     height: 630,
    //     alt: 'HyreSense - AI Powered Hiring',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyreSense: AI-Powered Job Matching & Smart Hiring',
    description: 'Leverage AI for your job search or hiring needs. Smart matching, skill insights, and faster results with HyreSense.',
    // images: [`${siteUrl}/twitter-image.png`], // Example: specific Twitter image
    // creator: '@HyreSense', // Example: Your Twitter handle
  },
  icons: { // Add favicon information if you have icons
    icon: '/favicon.ico',
    // apple: '/apple-touch-icon.png',
  },
  // manifest: `${siteUrl}/site.webmanifest`, // If you have a web app manifest
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-transparent relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThreeParticleSystem />
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <div className="fixed bottom-6 right-6 z-50">
            <ThemeToggleButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
