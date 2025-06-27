
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import ThreeParticleSystem from '@/components/effects/three-particle-system';
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggleButton } from '@/components/layout/ThemeToggleButton';
import { MainLayoutWrapper } from '@/components/layout/MainLayoutWrapper'; // New import
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hyresense.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    images: [
      {
        // TODO: Replace with your actual OG image URL (e.g., 1200x630px in /public/hyresense-og-image.png)
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'HyreSense - AI Powered Job Matching and Smart Hiring Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HyreSense: AI-Powered Job Matching & Smart Hiring',
    description: 'Leverage AI for your job search or hiring needs. Smart matching, skill insights, and faster results with HyreSense.',
    // TODO: Replace with your actual Twitter image URL (e.g., 1200x600px in /public/hyresense-twitter-image.png)
    images: [`${siteUrl}/hyresense-twitter-image.png`],
    // TODO: Replace with your actual Twitter handle
    creator: '@HyreSense',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  // TODO: Create a site.webmanifest file in your public folder for PWA features
  manifest: `${siteUrl}/site.webmanifest`,
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
          <MainLayoutWrapper>
            {children}
          </MainLayoutWrapper>
          <Toaster />
          <div className="fixed bottom-6 right-6 z-50">
            <ThemeToggleButton />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
