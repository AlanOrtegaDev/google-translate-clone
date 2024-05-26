import { $axios } from '@/lib/axios'

interface Props {
  text: string
  sourceLang: string | null
  targetLang: string
}

export const translate = async ({ text, sourceLang, targetLang }: Props) => {
  try {
    const res = await $axios.post('https://google-translate-clone-server.vercel.app/translate', {
      text,
      sourceLang,
      targetLang,
    })

    return res.data
  } catch (error) {
    console.log(error)
    return error as Error
  }
}
