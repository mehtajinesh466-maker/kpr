// app/layout.tsx
import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Chesseasy Academy',
    template: '%s | Chesseasy Academy',
  },
  description:
    'Master chess with Chesseasy Academy. Learn ancient chess strategies combined with modern techniques. Online and offline chess training for all levels at Chesseasy Academy.',
  keywords: [
    'Chesseasy Academy',
    'Chesseasy',
    'Chess Academy',
    'Learn chess online',
    'Chess training',
    'Ancient chess strategies',
    'Modern chess techniques',
    'Chess classes',
    'Chess coaching',
  ],
  metadataBase: new URL('https://www.chesseasy.com'),
  alternates: {
    canonical: 'https://www.chesseasy.com',
  },
  authors: [{ name: 'Chesseasy Academy', url: 'https://www.chesseasy.com' }],
  creator: 'Chesseasy Academy',
  publisher: 'Chesseasy Academy',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Chesseasy Academy',
    description: 'Master chess with Chesseasy Academy. Learn ancient strategies with modern techniques.',
    url: 'https://www.chesseasy.com',
    siteName: 'Chesseasy Academy',
    images: [
      {
        url: 'https://chesseasy.com/assets/chesseasy-CwFIMgD9.jpg',
        width: 800,
        height: 600,
        alt: 'Chesseasy Academy Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chesseasy Academy',
    description: 'Master chess with Chesseasy Academy. Learn ancient strategies with modern techniques.',
    images: ['https://chesseasy.com/assets/chesseasy-CwFIMgD9.jpg'],
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
                name: 'Chesseasy Academy',
                alternateName: 'International School of Chess',
                url: 'https://www.chesseasy.com',
                logo: 'https://chesseasy.com/assets/chesseasy-CwFIMgD9.jpg',
                description: 'World-class chess training academy combining ancient strategies with modern chess techniques.',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Sector 3',
                  addressLocality: 'Udaipur',
                  addressRegion: 'Rajasthan',
                  postalCode: '313001',
                  addressCountry: 'IN',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+91-',
                  contactType: 'customer service',
                  email: 'info@chesseasy.com',
                  areaServed: 'IN',
                  availableLanguage: ['en', 'hi'],
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
                  'Modern Chess Techniques',
                  'Beginner Chess Classes',
                  'Advanced Chess Coaching',
                  'Tournament Preparation'
                ],
                foundingDate: '2020',
                founder: {
                  '@type': 'Person',
                  name: 'Chesseasy Academy Team'
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'SportsOrganization',
                name: 'Chesseasy Academy',
                sport: 'Chess',
                description: 'Professional chess training organization offering courses from beginner to advanced levels.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Udaipur',
                  addressRegion: 'Rajasthan',
                  addressCountry: 'India'
                }
              },
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'What is Chesseasy Academy?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Chesseasy Academy is a premier chess training institute that combines ancient strategic principles with modern chess techniques, offering comprehensive online and offline training programs for all skill levels.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What makes Chesseasy Academy different?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We integrate timeless strategic wisdom with contemporary chess methodologies, providing a unique holistic approach to chess education that enhances both tactical skills and mental discipline.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'What courses does Chesseasy Academy offer?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'We offer comprehensive chess courses including Beginner, Intermediate, Advanced levels, and specialized Tournament Training programs, all designed to cater to different age groups and skill levels.'
                    }
                  },
                  {
                    '@type': 'Question',
                    name: 'Does Chesseasy Academy offer online classes?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Yes, we offer both online and offline classes to accommodate students from different locations and preferences, ensuring quality chess education is accessible to everyone.'
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
        {/* <footer style={{ marginTop: '20px', textAlign: 'center', padding: '2rem', backgroundColor: '#f8f9fa' }}>
          <p>&copy; {new Date().getFullYear()} Chesseasy Academy - International School of Chess. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
            Combining Ancient Wisdom with Modern Chess Excellence
          </p>
        </footer> */}
      </body>
    </html>
  );
}
