import { ReadonlyURLSearchParams } from "next/navigation"
import qs from "qs"

export type GetQueryString = {
  searchParams: URLSearchParams | ReadonlyURLSearchParams
  data: Record<string, unknown>
  qsStringifyOptions?: qs.IStringifyOptions
  keepPrevious?: boolean
}

export default function getQueryString({
  searchParams,
  data,
  qsStringifyOptions,
  keepPrevious = true
}: GetQueryString) {
  const paramObject = qs.parse(searchParams.toString())
  return qs.stringify(
    { ...(keepPrevious ? paramObject : {}), ...data },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
      ...qsStringifyOptions
    }
  )
}
