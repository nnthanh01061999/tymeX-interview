import { RequestConfig } from "@/helpers/fetch/type"

import product from "./product"

export const apiConfig = {
  ...product
} satisfies Record<string, ApiConfig>

export type ApiKey = keyof typeof apiConfig

declare global {
  type ApiConfig = {
    url: PathWithOptionalColon
    options?: RequestConfig<any>
  }

  type PathWithOptionalColon =
    | `${string}:${string}/${string}`
    | `${string}/${string}`

  type ApiKeyValue<T extends ApiKey = ApiKey> = (typeof apiConfig)[T]

  type ExtractRouteParams<T extends string> =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
      ? { [K in Param | keyof ExtractRouteParams<Rest>]: string }
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        T extends `${infer _Start}:${infer Param}`
        ? { [K in Param]: string | number | undefined }
        : undefined

  type TExtractParams<T extends ApiKey> = ExtractRouteParams<
    ApiKeyValue<T>["url"]
  >
}
