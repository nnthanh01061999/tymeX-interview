import { apiConfig } from "@/configs/api"
import { RequestConfig, ResponseError } from "@/helpers/fetch/fetch.type"
import { sendRequest } from "@/helpers/fetch/send-request"
import { injectVariablesToPath } from "@/helpers/fetch/util"
import { toast } from "@/hooks/use-toast"
import { DeepPartial } from "@/types"
import {
  MutationFunction,
  useMutation,
  UseMutationOptions
} from "@tanstack/react-query"

type ApiKey = keyof typeof apiConfig

type TVariables<
  TPayload,
  TKey extends ApiKey = ApiKey
> = DeepPartial<TPayload> & {
  pathVariables?: TExtractParams<TKey>
  params?: RequestConfig<any>["params"]
}

type UseMutationApiOptions<
  TPayload,
  TData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _TError,
  TKey extends ApiKey = ApiKey
> = UseMutationOptions<TData, ResponseError, TPayload> & {
  pathVariables?: TExtractParams<TKey>
  keepOriginalResponse?: boolean
  keepParams?: boolean
  headers?: RequestConfig<any>["headers"]
}

function useMutationApi<
  TPayload = any,
  TData = unknown,
  TError = unknown,
  TKey extends ApiKey = ApiKey
>(
  apiKey: TKey,
  opts?: UseMutationApiOptions<TVariables<TPayload, TKey>, TData, TError, TKey>
) {
  const {
    pathVariables: defaultPathVariables = {},
    keepOriginalResponse = false,
    keepParams = false,
    headers,
    ...rest
  } = opts || {}
  const { url, options } = apiConfig[apiKey]
  const { method: methodOption } = options

  const mutationFn: MutationFunction<
    TData,
    TVariables<TPayload, TKey>
  > = async (payload) => {
    const {
      pathVariables: payloadPathVariables,
      params = {},
      ...payloadRest
    } = payload

    const pathVariables = payloadPathVariables || defaultPathVariables
    const urlObject = new URL(
      pathVariables ? injectVariablesToPath(url, pathVariables) : url
    )

    const paramsProps = { params: { ...payloadRest, ...params } }
    const dataProps = { data: Array.isArray(payload) ? payload : payloadRest }
    const methodProps = methodOption === "GET" ? paramsProps : dataProps

    const res = await sendRequest({
      url: urlObject.href,
      throwError: true,
      ...options,
      method: methodOption,
      headers: {
        ...options.headers,
        ...headers
      },
      ...methodProps,
      ...(keepParams ? { params } : {})
    })
    return keepOriginalResponse ? res : res.data
  }

  return useMutation<TData, ResponseError, TVariables<TPayload, TKey>>({
    mutationFn,
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive"
      })
    },
    ...rest
  })
}

export default useMutationApi
