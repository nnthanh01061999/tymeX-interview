import ImageRandom from "@/app/[locale]/_components/ImageRandom"

function Featured() {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl animate-fade-up animate-once animate-duration-500 animate-ease-in-out">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`thumb-${index}`}
          className="placeholder-image shadow-md aspect-square h-auto sm:h-28 md:h-24 border border-input rounded-md overflow-hidden hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95 relative">
          <ImageRandom index={index + 1} />
        </div>
      ))}
    </div>
  )
}

export default Featured
