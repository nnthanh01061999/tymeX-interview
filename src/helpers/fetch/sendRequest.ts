import { RequestType, ResponseError } from "./type"
import { createRequest, HttpStatusCode } from "./util"

//Place holder for get token user
const getTokenUser = () => {
  return ""
}

//Place holder for on retry failed
const onRetryFailed = () => {
  window.location.replace("/")
}

//Place holder for should refresh token
const shouldRefreshToken = (response: ResponseError) =>
  response.status === HttpStatusCode.UNAUTHORIZED

//Place holder for refresh token
const refreshToken = async () => {
  return { token: "" }
}

const { fetchData } = createRequest({
  refreshToken,
  getToken: getTokenUser,
  onRetryFailed,
  shouldRefreshToken,
  minTokenRefreshDuration: 200
})

const sendRequest = <T>(props: RequestType<T>) => {
  return fetchData<T>({
    ...props
  })
}

export { sendRequest }
