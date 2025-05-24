export type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}`
    }[keyof T]
  : never

export type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never ? "" : `.${Leaves<T[K]>}`}`
    }[keyof T]
  : never

export type ValueOf<T> = T[keyof T]

export type OrderBy<T> = {
  order: "asc" | "desc" | string
  order_by: string | keyof T
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
