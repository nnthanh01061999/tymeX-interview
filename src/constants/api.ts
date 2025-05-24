import { API_ENDPOINT } from "./env"

export const baseHeader = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  pragma: "no-cache"
}

export const multipartFormHeader = {
  "Content-Type": "multipart/form-data",
  "cache-control": "no-cache",
  pragma: "no-cache"
}

export const APPLICATION_JSON = "application/json"
