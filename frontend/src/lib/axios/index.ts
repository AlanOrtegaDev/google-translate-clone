import axios from 'axios'
import { apiBase, apiKey } from '@/config'

export const $axios = axios.create({
  baseURL: apiBase,
  headers: {
    Authorization: `DeepL-Auth-Key ${apiKey}`,
  },
})
