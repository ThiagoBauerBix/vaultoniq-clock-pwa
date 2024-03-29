import axios from 'axios'

export let baseURL = 'https://api-staging.vaultoniq.com/api/v1'

if (import.meta.env.VITE_APP_API_URL) {
  baseURL = import.meta.env.VITE_APP_API_URL
}

const api = axios.create({
  baseURL,
})

export default api
