import { cn } from "@/lib/utils"

export default function Header({ className }: { className?: string }) {
  return (
    <header className={cn(className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Left side - NEW ARRIVAL section */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-600">
              NEW
              <br />
              ARRIVAL
            </h1>
          </div>

          {/* Featured Item Thumbnails */}
          <div className="grid grid-cols-4 gap-4 max-w-3xl">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`thumb-${index}`}
                className="placeholder-image aspect-square h-24 border border-gray-300">
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-full h-full text-gray-300"
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
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Hero Featured Item */}
        <div>
          <div className="placeholder-image aspect-square border border-gray-300 h-64 relative">
            <span className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-full h-full text-gray-300"
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
              <div className="bg-white px-6 py-2 rounded-md border border-gray-200 text-gray-600 font-medium">
                THE DJ
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
