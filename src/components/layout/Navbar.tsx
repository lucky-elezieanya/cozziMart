
import React from 'react'
import SearchBar from './SearchBar'
import { Headset } from 'lucide-react'

const Navbar = () => {
  return (
    <section id="navbar" className="shadow-md">
      <div className="w-full">
        {/* Top Bar */}
        <div className="hidden md:flex w-full items-center justify-between bg-primary px-6 py-2">
          {/* Left Section */}
          <div className="flex items-center gap-4 text-primary-foreground font-normal">
            <span className="text-sm whitespace-nowrap">
              Free Shipping on orders over $50
            </span>
            {/* Vertical Separator */}
            <div className="h-4 w-px bg-primary-foreground/60" />
            <span className="text-sm whitespace-nowrap">
              Secure Payments
            </span>
            {/* Vertical Separator */}
            <div className="h-4 w-px bg-primary-foreground/60" />
            <span className="text-sm whitespace-nowrap flex items-center gap-1">
                 <Headset className="h-5 w-5 text-primary-foreground" />
              24/7 Customer Support
            </span>
          </div>
          {/* Right Section */}
          <div className="flex items-center gap-4 text-primary-foreground font-normal">
            <span className="text-sm whitespace-nowrap">
              Track Order
            </span>

            {/* Vertical Separator */}
            <div className="h-4 w-px bg-primary-foreground/60" />

            <span className="text-sm whitespace-nowrap">
              Help
            </span>

            {/* Vertical Separator */}
            <div className="h-4 w-px bg-primary-foreground/60" />

            <span className="text-sm whitespace-nowrap">
              Login / Register
            </span>

          </div>

        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Bottom Navigation Bar */}

      </div>
    </section>
  )
}

export default Navbar
