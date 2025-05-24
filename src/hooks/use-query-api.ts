import { apiConfig, ApiKey } from "@/configs/api"
import { sendRequest } from "@/helpers/fetch/sendRequest"
import { RequestConfig } from "@/helpers/fetch/type"
import { injectVariablesToPath } from "@/helpers/fetch/util"
import { toast } from "@/hooks/use-toast"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { useRef } from "react"

export interface UseQueryApiOptions<
  TData = unknown,
  TKey extends ApiKey = ApiKey
> extends Omit<RequestConfig<TData>, "method" | "url">,
    Omit<UseQueryOptions<TData>, "queryKey"> {
  pathVariables?: TExtractParams<TKey>
  onError?: (error: ReturnType<Awaited<typeof useQuery>>["error"]) => void
  onSuccess?: (data: TData) => void
}

function useQueryApi<TData, TKey extends ApiKey = ApiKey>(
  apiKey: TKey,
  opts?: UseQueryApiOptions<TData, TKey>
) {
  const {
    pathVariables = {},
    params,
    headers,
    payload,
    onError,
    onSuccess,
    ...rest
  } = opts ?? {}
  const { url, options } = apiConfig[apiKey]
  const method = options.method
  const apiPath = pathVariables
    ? injectVariablesToPath(url, pathVariables)
    : url

  const firstCallRef = useRef<boolean>(false)

  return useQuery({
    queryKey: [apiKey, ...Object.values(pathVariables), params, payload],
    queryFn: () => {
      const requestOptions: RequestConfig<any>["headers"] = {
        ...apiConfig[apiKey].options.headers,
        ...headers
      }
      return sendRequest({
        method,
        url: apiPath,
        headers: requestOptions,
        params,
        payload
      })
        .then((res) => {
          if (!firstCallRef.current) {
            onSuccess?.(res.responseData as TData)
            firstCallRef.current = true
          }

          return res.responseData as TData
        })
        .catch((error) => {
          if (onError) {
            onError?.(error)
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive"
            })
          }
          return error
        })
    },
    retry: false,
    ...rest
  })
}

export default useQueryApi
