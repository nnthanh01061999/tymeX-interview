"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

//it specific for search product page so it should be put in search product page
export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn("overflow-hidden", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
        {/* Left side - NEW ARRIVAL section */}
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500">
                NEW
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                ARRIVAL
              </span>
            </h1>
          </motion.div>

          {/* Featured Item Thumbnails - with responsive grid and animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`thumb-${index}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="placeholder-image aspect-square h-auto sm:h-24 border border-gray-300 rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200 relative">
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-full h-full text-gray-200"
                    viewBox="0 0 100 100">
                    <line
                      x1="0"
                      y1="0"
                      x2="100"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <line
                      x1="0"
                      y1="100"
                      x2="100"
                      y2="0"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right side - Hero Featured Item with animation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center">
          <div className="placeholder-image aspect-square border border-gray-300 h-auto w-full rounded-md overflow-hidden shadow-md relative">
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-full h-full text-gray-200"
                viewBox="0 0 100 100">
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            </span>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white px-4 sm:px-6 py-2 rounded-md border border-gray-200 text-gray-800 font-medium shadow-sm hover:shadow transition-shadow duration-200">
                THE DJ
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
