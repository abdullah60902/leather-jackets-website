import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-8">Privacy Policy</h1>
            <p className="text-sm text-mid-grey mb-12">Last updated: February 10, 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">1. Introduction</h2>
                <p className="text-mid-grey leading-relaxed">
                  ATSAS Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, in compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-medium text-dark-grey mb-3">Personal Data</h3>
                <p className="text-mid-grey leading-relaxed mb-4">
                  We may collect the following personal information:
                </p>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Company name and billing address</li>
                  <li>Payment information (processed securely via Stripe)</li>
                  <li>Order details and customization preferences</li>
                  <li>Uploaded logos and design drawings</li>
                </ul>

                <h3 className="text-xl font-medium text-dark-grey mb-3 mt-6">Usage Data</h3>
                <p className="text-mid-grey leading-relaxed">
                  We automatically collect information about your device, browsing actions, and patterns, including IP address, browser type, pages visited, and time spent on pages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your orders and inquiries</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">4. Legal Basis for Processing</h2>
                <p className="text-mid-grey leading-relaxed">
                  We process your personal data under the following legal bases:
                </p>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li><strong>Contract Performance:</strong> To fulfill our contractual obligations to you</li>
                  <li><strong>Legitimate Interests:</strong> To improve our services and communicate with you</li>
                  <li><strong>Consent:</strong> For marketing communications (you may withdraw consent at any time)</li>
                  <li><strong>Legal Obligation:</strong> To comply with UK laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">5. Data Sharing</h2>
                <p className="text-mid-grey leading-relaxed mb-4">
                  We do not sell your personal data. We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li>Payment processors (Stripe) for secure transactions</li>
                  <li>Shipping partners for order delivery</li>
                  <li>Service providers who assist in business operations</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">6. Your Rights Under UK GDPR</h2>
                <p className="text-mid-grey leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Request erasure of your data</li>
                  <li>Restrict or object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                  <li>Lodge a complaint with the ICO (Information Commissioner's Office)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">7. Data Security</h2>
                <p className="text-mid-grey leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">8. Data Retention</h2>
                <p className="text-mid-grey leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, typically 7 years for financial records in compliance with UK tax law, and 2 years for marketing data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">9. Cookies</h2>
                <p className="text-mid-grey leading-relaxed">
                  We use essential cookies for website functionality and analytics cookies (with your consent) to improve user experience. You can manage cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">10. Contact Us</h2>
                <p className="text-mid-grey leading-relaxed">
                  For any privacy-related questions or to exercise your rights, contact our Data Protection Officer at:
                </p>
                <p className="text-mid-grey mt-4">
                  <strong>Email:</strong> privacy@atsas.co.uk<br />
                  <strong>Address:</strong> 123 Leather Lane, Shoreditch, London E1 6AN, UK<br />
                  <strong>Phone:</strong> +44 20 7946 0958
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
