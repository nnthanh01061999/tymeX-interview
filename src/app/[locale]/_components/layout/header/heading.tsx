function Heading() {
  return (
    <div className="animate-fade-down animate-once animate-duration-500 animate-ease-in-out">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
          NEW
        </span>
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
          ARRIVAL
        </span>
      </h1>
    </div>
  )
}

export default Heading
