import { AUTO_LANGUAGE, TARGET_LANGUAGES, SOURCE_LANGUAGES } from '@/constants'

export type FromLanguage = keyof typeof SOURCE_LANGUAGES | AutoLanguage

export type AutoLanguage = typeof AUTO_LANGUAGE

export type ToLanguage = keyof typeof TARGET_LANGUAGES

export enum SectionType {
  From = 'from',
  To = 'to',
}

export interface APIResponse {
  success: boolean
  result?: {
    detectedSourceLang: FromLanguage
    text: string
  }
  error?: {
    message: string
  }
}
