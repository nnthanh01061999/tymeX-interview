export type TCategory =
  | "All"
  | "Upper Body"
  | "Lower Body"
  | "Hat"
  | "Shoes"
  | "Accessory"

export type TTheme = "Dark" | "Light" | "Colorful" | "Halloween"

export type TTier = "Basic" | "Premium" | "Deluxe"

export interface IProduct {
  id: number
  title: string
  category: TCategory
  price: number
  isFavorite: boolean
  createdAt: number
  theme: TTheme
  tier: TTier
  imageId: number
  author: IAuthor
}

export interface IAuthor {
  firstName: string
  lastName: string
  email: string
  gender: string
  avatar: string
  onlineStatus: string
}

export type TProductParams = {
  _page?: string
  _limit?: string
  q?: string
  category?: string
  theme?: string
  tier?: string
  price_gte?: string
  price_lte?: string
  _sort?: keyof IProduct
  _order?: "asc" | "desc"
  //custom
  sort?: string
}
