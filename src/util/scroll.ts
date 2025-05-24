export const scrollHorizontallyToCenter = (id: string) => {
  const element = document.querySelector(`#${CSS.escape(id)}`)
  if (!element) return

  const parent = element.closest("div")
  if (!parent) return

  const parentRect = parent.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  const scrollLeft =
    parent.scrollLeft +
    (elementRect.left - parentRect.left) -
    parentRect.width / 2 +
    elementRect.width / 2

  parent.scrollTo({
    left: scrollLeft,
    behavior: "smooth"
  })
}
