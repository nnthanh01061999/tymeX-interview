import { API_ENDPOINT, baseHeader } from "@/constants"

export default {
  "products/list": {
    url: `${API_ENDPOINT}/products`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "products/detail": {
    url: `${API_ENDPOINT}/products/:id`,
    options: {
      method: "GET",
      headers: baseHeader
    }
  },
  "products/create": {
    url: `${API_ENDPOINT}/products`,
    options: {
      method: "POST",
      headers: baseHeader
    }
  },
  "products/update": {
    url: `${API_ENDPOINT}/products/:id`,
    options: {
      method: "PUT",
      headers: baseHeader
    }
  },
  "products/delete": {
    url: `${API_ENDPOINT}/products/:id`,
    options: {
      method: "DELETE",
      headers: baseHeader
    }
  }
} satisfies Record<string, ApiConfig>
