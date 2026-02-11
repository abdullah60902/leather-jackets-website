import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-light text-dark-grey mb-8">Terms & Conditions</h1>
            <p className="text-sm text-mid-grey mb-12">Last updated: February 10, 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">1. Agreement to Terms</h2>
                <p className="text-mid-grey leading-relaxed">
                  By accessing and using the LuxeLeather website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">2. Company Information</h2>
                <p className="text-mid-grey leading-relaxed">
                  LuxeLeather Ltd is a company registered in England and Wales.<br />
                  <strong>Registered Address:</strong> 123 Leather Lane, Shoreditch, London E1 6AN, UK<br />
                  <strong>Company Number:</strong> 12345678<br />
                  <strong>VAT Number:</strong> GB123456789
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">3. Services</h2>
                <p className="text-mid-grey leading-relaxed mb-4">
                  We provide custom leather jacket manufacturing services with the following terms:
                </p>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li><strong>Minimum Order Quantity (MOQ):</strong> 10 jackets</li>
                  <li><strong>Production Time:</strong> 4-6 weeks (standard), 2-3 weeks (express with 30% surcharge)</li>
                  <li><strong>Customization:</strong> All specifications must be finalized before production begins</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">4. Orders and Payment</h2>
                <h3 className="text-xl font-medium text-dark-grey mb-3">Order Process</h3>
                <ul className="list-disc pl-6 text-mid-grey space-y-2 mb-4">
                  <li>All orders require a 50% deposit to commence production</li>
                  <li>Final 50% payment is due before shipment</li>
                  <li>Prices are quoted in GBP and exclude VAT (20% will be added for UK customers)</li>
                </ul>

                <h3 className="text-xl font-medium text-dark-grey mb-3">Payment Methods</h3>
                <p className="text-mid-grey leading-relaxed">
                  We accept payments via Stripe (credit/debit cards, Apple Pay, Google Pay). All transactions are secure and encrypted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">5. Cancellations and Refunds</h2>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li><strong>Before Production:</strong> Full refund minus 10% administrative fee if cancelled within 48 hours of order</li>
                  <li><strong>During Production:</strong> No refunds once production has commenced</li>
                  <li><strong>Defective Products:</strong> Full refund or replacement for manufacturing defects within 30 days</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">6. Quality Guarantee</h2>
                <p className="text-mid-grey leading-relaxed">
                  All jackets are subject to our 12-point quality inspection. We guarantee that products will match approved specifications. If jackets do not meet agreed specifications, we will remake them at no additional cost.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">7. Warranty</h2>
                <p className="text-mid-grey leading-relaxed mb-4">
                  We provide a lifetime warranty against manufacturing defects, covering:
                </p>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li>Stitching failures</li>
                  <li>Hardware defects (zippers, buttons)</li>
                  <li>Material flaws (excluding normal wear and tear)</li>
                </ul>
                <p className="text-mid-grey leading-relaxed mt-4">
                  The warranty does not cover damage from misuse, accidents, or alterations by third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">8. Intellectual Property</h2>
                <p className="text-mid-grey leading-relaxed">
                  You retain ownership of any logos, designs, or artwork you provide. We will not use your intellectual property for any purpose other than fulfilling your order without your explicit consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">9. Shipping and Delivery</h2>
                <ul className="list-disc pl-6 text-mid-grey space-y-2">
                  <li>UK delivery is free for orders over £2,000</li>
                  <li>International shipping costs are calculated at checkout</li>
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk passes to you upon delivery</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">10. Limitation of Liability</h2>
                <p className="text-mid-grey leading-relaxed">
                  Our liability is limited to the value of your order. We are not liable for indirect, consequential, or incidental damages. This does not affect your statutory rights under UK consumer law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">11. Governing Law</h2>
                <p className="text-mid-grey leading-relaxed">
                  These Terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">12. Changes to Terms</h2>
                <p className="text-mid-grey leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-dark-grey mb-4">13. Contact</h2>
                <p className="text-mid-grey leading-relaxed">
                  For questions about these Terms, contact us at:<br />
                  <strong>Email:</strong> legal@luxeleather.co.uk<br />
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
