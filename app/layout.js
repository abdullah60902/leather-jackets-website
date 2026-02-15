import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import FloatingActions from "@/components/ui/FloatingActions";

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
    default: "ATSAS | Premium Bespoke Leather Jacket Manufacturer | Custom & Bulk",
    template: "%s | ATSAS Leather Manufacturing London"
  },
  description: "World-class bespoke leather jacket manufacturer based in London. We craft premium custom leather jackets, bulk orders, and private label apparel with hereditary craftsmanship. 100% Real Leather. Global Shipping.",
  keywords: [
    "ATSAS leather",
    "bespoke leather jacket manufacturer",
    "custom leather jackets UK",
    "mens leather jacket supplier",
    "womens leather jacket factory",
    "private label leather clothing",
    "bulk leather manufacturing",
    "small batch leather production",
    "leather jacket tailor london",
    "luxury leather apparel",
    "genuine leather jackets",
    "handcrafted leather goods",
    "sustainable leather manufacturing",
    "startup fashion brand manufacturer"
  ],
  authors: [{ name: "ATSAS Ltd", url: 'https://atsas.co.uk' }],
  creator: "ATSAS Ltd",
  publisher: "ATSAS Ltd",
  alternates: {
    canonical: '/',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://atsas.co.uk',
    siteName: 'ATSAS Leather Manufacturing',
    title: 'ATSAS | Elite Custom Leather Jacket Manufacturer',
    description: 'Design your own premium leather jacket or manufacture for your brand. Expert craftsmanship, finest materials, and ethical production. Made in London.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ATSAS Bespoke Leather Jacket Craftsmanship',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATSAS | Luxury Leather Jacket Manufacturing',
    description: 'Expertly crafted bespoke leather jackets for elite brands and individuals. MOQ 10 for bulk. Lifetime Warranty.',
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
    google: 'your-google-verification-code', // user to replace
    yandex: 'your-yandex-verification-code', // user to replace
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
        "logo": {
          "@type": "ImageObject",
          "url": "https://atsas.co.uk/logo.png",
          "width": 112,
          "height": 112
        },
        "image": "https://atsas.co.uk/og-image.jpg",
        "description": "ATSAS is a premier manufacturer of bespoke leather jackets, offering custom solutions for individuals and brands worldwide.",
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
          "contactType": "Sales",
          "areaServed": "Global",
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://facebook.com/atsasleather",
          "https://instagram.com/atsasleather",
          "https://linkedin.com/company/atsas-leather"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://atsas.co.uk/#website",
        "url": "https://atsas.co.uk",
        "name": "ATSAS Leather Manufacturing",
        "publisher": { "@id": "https://atsas.co.uk/#organization" },
        "inLanguage": "en-GB"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://atsas.co.uk/#localbusiness",
        "parentOrganization": { "@id": "https://atsas.co.uk/#organization" },
        "name": "ATSAS Leather Factory",
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
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
