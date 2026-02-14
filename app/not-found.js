import Link from "next/link";
import { Home, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-off-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20">
        <div className="text-center max-w-2xl">
          <h1 className="text-9xl font-light text-dark-grey mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-light text-dark-grey mb-6">
            Page Not <span className="text-gradient-gold font-normal">Found</span>
          </h2>
          <p className="text-lg text-mid-grey mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/customization">
              <Button variant="secondary" size="lg">
                <Search className="w-4 h-4 mr-2" />
                Explore Options
              </Button>
            </Link>
          </div>

          <div className="mt-16 pt-16 border-t border-beige">
            <p className="text-sm text-mid-grey mb-4">Popular Pages:</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/customization" className="text-sm text-dark-grey hover:text-gold transition-colors">Customization Options</Link>
              <span className="text-light-grey">•</span>
              <Link href="/bulk" className="text-sm text-dark-grey hover:text-gold transition-colors">Bulk Orders</Link>
              <span className="text-light-grey">•</span>
              <Link href="/about" className="text-sm text-dark-grey hover:text-gold transition-colors">About Us</Link>
              <span className="text-light-grey">•</span>
              <Link href="/contact" className="text-sm text-dark-grey hover:text-gold transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
