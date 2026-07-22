// app/layout.tsx
import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DemoModal } from '@/components/DemoModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'KPR Chess Academy',
    template: '%s | KPR Chess Academy',
  },
  description:
    'Master chess with KPR Chess Academy in Mylapore & Pallikaranai, Chennai. Structured chess training for all levels under Founder TV Kumar.',
  keywords: [
    'KPR Chess Academy',
    'KPR Chess',
    'Chess Academy Chennai',
    'Chess coaching Mylapore',
    'Chess training Pallikaranai',
    'Learn chess in Chennai',
    'Chess coaching',
  ],
  metadataBase: new URL('https://www.kprchessacademy.com'),
  alternates: {
    canonical: 'https://www.kprchessacademy.com',
  },
  authors: [{ name: 'KPR Chess Academy', url: 'https://www.kprchessacademy.com' }],
  creator: 'KPR Chess Academy',
  publisher: 'KPR Chess Academy',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'KPR Chess Academy',
    description: 'Master chess with KPR Chess Academy. Structured chess training in Chennai under TV Kumar.',
    url: 'https://www.kprchessacademy.com',
    siteName: 'KPR Chess Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KPR Chess Academy',
    description: 'Master chess with KPR Chess Academy. Structured chess training in Chennai under TV Kumar.',
  },
  generator: 'Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="logo.jpg"/>
        <link rel="icon" type="image/png" sizes="16x16" href="logo.jpg"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                name: 'KPR Chess Academy',
                alternateName: 'KPR Chess Academy Chennai',
                url: 'https://www.kprchessacademy.com',
                description: 'World-class chess training academy offering structured coaching in Mylapore and Pallikaranai, Chennai.',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Near Amma Hotel, Alamelu Mangapuram, Mylapore',
                  addressLocality: 'Chennai',
                  addressRegion: 'Tamil Nadu',
                  postalCode: '600004',
                  addressCountry: 'IN',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91 99419 87881',
                  contactType: 'customer service',
                  email: 'kumartv1978@gmail.com',
                  areaServed: 'IN',
                  availableLanguage: ['en', 'ta'],
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '200',
                  bestRating: '5',
                  worstRating: '1',
                },
                knowsAbout: [
                  'Chess Training',
                  'Beginner Chess Classes',
                  'Advanced Chess Coaching',
                  'Tournament Preparation'
                ],
                foundingDate: '2020',
                founder: {
                  '@type': 'Person',
                  name: 'TV Kumar'
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'SportsOrganization',
                name: 'KPR Chess Academy',
                sport: 'Chess',
                description: 'Professional chess training organization offering courses from beginner to advanced levels in Chennai.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Chennai',
                  addressRegion: 'Tamil Nadu',
                  addressCountry: 'India'
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is KPR Chess Academy?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'KPR Chess Academy is a premier chess training institute in Chennai offering comprehensive online and offline training programs for all skill levels under Founder TV Kumar.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What makes KPR Chess Academy different?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We offer structured coaching from expert FIDE-rated coaches, personalized learning paths, and regular internal tournaments to cultivate a champion mindset.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What courses does KPR Chess Academy offer?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We offer comprehensive chess courses including Beginner, Intermediate, Advanced levels, and specialized Tournament Training programs.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Does KPR Chess Academy offer online classes?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, we offer both online and offline classes across our Mylapore and Pallikaranai branches in Chennai.'
                    }
                  }
                ]
              }
            ]),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <DemoModal />
      </body>
    </html>
  );
}
