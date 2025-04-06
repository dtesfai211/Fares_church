import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fares Church</h3>
            <p className="mb-4 text-gray-300">
              A place of worship, community, and spiritual growth. Join us in our journey of faith and service.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-secondary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-secondary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-secondary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://youtube.com" className="hover:text-secondary">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="hover:text-secondary">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-secondary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-secondary">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-secondary">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-secondary" />
                <span>123 Church Street, City, State 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-secondary" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-secondary" />
                <span>info@fareschurch.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter to receive updates on our events and activities.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-black">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Fares Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

