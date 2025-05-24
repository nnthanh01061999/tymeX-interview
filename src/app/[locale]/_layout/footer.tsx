import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Facebook, Mail, Twitter } from "lucide-react"

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("mt-16", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h3 className="font-medium text-gray-600 mb-4">NAVIGATION</h3>
            <ul className="space-y-2">
              <li>Home</li>
              <li>Whitepaper</li>
              <li>Marketplace</li>
              <li>About</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-medium text-gray-600 mb-4">CONTACT US</h3>
            <ul className="space-y-2">
              <Link href="#">
                <li className="flex items-center">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </li>
              </Link>
              <Link href="mailto:info@example.com">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </li>
              </Link>
              <Link href="#">
                <li className="flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </li>
              </Link>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-gray-600 mb-4">NEWSLETTER</h3>
            <div className="space-y-4 items-end flex flex-col">
              <Input type="email" placeholder="Enter your email" />
              <Button
                type="button"
                className="md:w-1/2 bg-white text-black border border-gray-300 hover:bg-gray-100 rounded px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
