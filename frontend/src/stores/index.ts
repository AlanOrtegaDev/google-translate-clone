import { create } from 'zustand'
import type { ToLanguage, FromLanguage } from '@/types'

interface State {
  fromLanguage: FromLanguage
  toLanguage: ToLanguage
  fromText: string
  result: string
  loading: boolean
}

interface Actions {
  interchangeLanguages: () => void
  setFromLanguage: (language: FromLanguage) => void
  setToLanguage: (language: ToLanguage) => void
  setFromText: (text: string) => void
  setResult: (result: string) => void
  setLoading: (value: boolean) => void
}

export const useStore = create<State & Actions>()((set, get) => ({
  fromLanguage: 'auto',
  toLanguage: 'en-US',
  fromText: '',
  result: '',
  loading: false,

  setFromLanguage: (language) => {
    if (get().toLanguage.includes(language)) {
      get().interchangeLanguages()
      return
    }

    set({ fromLanguage: language })
  },
  setToLanguage: (language) => {
    if (get().fromLanguage.includes(language)) {
      get().interchangeLanguages()
      return
    }

    set({ toLanguage: language })
  },
  setFromText: (text) => set({ fromText: text }),
  setResult: (result) => set({ result }),
  interchangeLanguages: () => {
    if (get().fromLanguage === 'auto') return

    if (get().fromLanguage === 'en') {
      return set((state) => ({
        fromLanguage: state.toLanguage as FromLanguage,
        toLanguage: 'en-US',
      }))
    }

    if (get().fromLanguage === 'pt') {
      return set((state) => ({
        fromLanguage: state.toLanguage as FromLanguage,
        toLanguage: 'pt-PT',
      }))
    }

    set((state) => ({
      fromLanguage: state.toLanguage as FromLanguage,
      toLanguage: state.fromLanguage as ToLanguage,
    }))
  },
  setLoading: (value) => {
    set({ loading: value })
  },
}))
