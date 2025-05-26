export const getValidatedParams = (data: Record<string, any>) => {
  return Object.entries(data)
    .filter(([, value]) =>
      Array.isArray(value) ? value.filter(Boolean).length > 0 : value !== ""
    )
    .reduce(
      (acc, [key, value]) => {
        if (Array.isArray(value)) {
          return {
            ...acc,
            [`${key}_gte`]: value[0],
            [`${key}_lte`]: value[1]
          }
        }
        if (key === "category") {
          return { ...acc, category: value === "all" ? undefined : value }
        }
        return { ...acc, [key]: value }
      },
      {} as Record<string, string | number>
    )
}
