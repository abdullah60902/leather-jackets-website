import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://atsas.co.uk'),
  title: {
    default: "ATSAS | Luxury Leather Jackets | Custom Manufacturing UK",
    template: "%s | ATSAS"
  },
  description: "ATSAS - Premium bespoke leather jacket manufacturing for brands and bulk orders. MOQ 10 jackets. UK-based, ISO certified.",
  keywords: [
    "ATSAS leather",
    "custom leather jackets UK",
    "bespoke leather jacket manufacturer",
    "bulk leather jackets",
    "leather jacket customization",
  ],
  authors: [{ name: "ATSAS Ltd" }],
  creator: "ATSAS Ltd",
  publisher: "ATSAS Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://atsas.co.uk',
    siteName: 'ATSAS',
    title: 'ATSAS | Luxury Leather Jackets | Custom Manufacturing UK',
    description: 'Premium bespoke leather jacket manufacturing. MOQ 10 jackets. UK-based, ISO certified.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ATSAS Custom Leather Jackets',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATSAS | Luxury Leather Jackets | Custom Manufacturing UK',
    description: 'Premium bespoke leather jacket manufacturing. MOQ 10 jackets.',
    images: ['/og-image.jpg'],
    creator: '@atsasleather',
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
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://atsas.co.uk/#organization",
        "name": "ATSAS Ltd",
        "url": "https://atsas.co.uk",
        "logo": "https://atsas.co.uk/logo.svg",
        "description": "Premium bespoke leather jacket manufacturing for brands and bulk orders",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Leather Lane, Shoreditch",
          "addressLocality": "London",
          "postalCode": "E1 6AN",
          "addressCountry": "GB"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+44-20-7946-0958",
          "contactType": "Customer Service",
          "email": "orders@atsas.co.uk",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://facebook.com/atsasleather",
          "https://instagram.com/atsasleather",
          "https://twitter.com/atsasleather"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://atsas.co.uk/#localbusiness",
        "name": "ATSAS Ltd",
        "image": "https://atsas.co.uk/og-image.jpg",
        "priceRange": "£££",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Leather Lane",
          "addressLocality": "London",
          "postalCode": "E1 6AN",
          "addressCountry": "GB"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 51.5244,
          "longitude": -0.0759
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "16:00"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
