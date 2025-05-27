import ImageRandom from "@/app/[locale]/_components/image-random"

function Hero() {
  return (
    <div className="flex rounded-xl items-end md:items-center justify-center animate-fade-right animate-once animate-duration-500 animate-delay-300 animate-ease-in-out">
      <div className="placeholder-image aspect-[2/1] sm:aspect-[1/1.2] md:aspect-square border border-input h-auto w-full rounded-md shadow-md relative">
        <ImageRandom index={20} className="rounded-lg" />
        <div className="absolute -bottom-4 shadow-md left-1/2 transform w-3/4 -translate-x-1/2">
          <div className="bg-background px-6 sm:px-6 py-2 text-center rounded-md border border-input text-primary font-medium shadow-xs text-lg hover:shadow-sm transition-all duration-200 hover:scale-105 active:scale-95">
            THE DJ
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
