import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { Facebook, Instagram, Mail, Twitter } from "lucide-react"

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("py-8 sm:py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Navigation */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "#", label: "Whitepaper" },
                { href: "#", label: "Marketplace" },
                { href: "#", label: "About" }
              ].map((link, index) => (
                <li
                  key={index}
                  className="transition-transform hover:translate-x-1 duration-200">
                  <Link href={link.href}>
                    <span className="text-gray-600 hover:text-gray-900">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-medium text-gray-700 mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {[
                {
                  href: "#",
                  label: "Facebook",
                  icon: <Facebook className="w-4 h-4" />
                },
                {
                  href: "mailto:nnthanh01061999@gmail.com",
                  label: "Email",
                  icon: <Mail className="w-4 h-4" />
                },
                {
                  href: "#",
                  label: "Twitter",
                  icon: <Twitter className="w-4 h-4" />
                },
                {
                  href: "#",
                  label: "Instagram",
                  icon: <Instagram className="w-4 h-4" />
                }
              ].map((contact, index) => (
                <li
                  key={index}
                  className="transition-transform hover:translate-x-1 duration-200">
                  <Link href={contact.href}>
                    <span className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                      {contact.icon}
                      {contact.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
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
