import { useStore } from './stores'
import { InterchangeIcon, LoadingIcon } from './components/icons'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import LanguageSelector from './components/LanguageSelector'
import { APIResponse, FromLanguage, SectionType, ToLanguage } from './types'
import { translate } from './services/api'
import { AUTO_LANGUAGE, SOURCE_LANGUAGES, TARGET_LANGUAGES } from './constants'
import { useDebouncedCallback } from 'use-debounce'

function App() {
  const {
    fromLanguage,
    fromText,
    setFromText,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    interchangeLanguages,
    result,
    setResult,
    loading,
    setLoading,
  } = useStore()

  const debounced = useDebouncedCallback(async () => {
    const response: APIResponse = await translate({
      text: fromText,
      sourceLang:
        fromLanguage === AUTO_LANGUAGE ? null : fromLanguage.slice(0, 2),
      targetLang: toLanguage,
    })

    if (!response.success) {
      setLoading(false)
      return setResult('')
    }

    if (response.result) {
      setLoading(false)
      setFromLanguage(response.result.detectedSourceLang)
      setResult(response.result.text)
    }
  }, 500)

  const handleFromLanguageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const inputValue = event.target.value
    setFromText(inputValue)
    setLoading(true)
    debounced()
  }

  const onSelectedFromLanguageChange = (language: FromLanguage) => {
    setFromLanguage(language)

    if (fromLanguage !== AUTO_LANGUAGE && fromText.length > 0) {
      setLoading(true)
      debounced()
    }
  }

  const onSelectedToLanguageChange = (language: ToLanguage) => {
    setToLanguage(language)

    if (fromLanguage !== AUTO_LANGUAGE && fromText.length > 0) {
      setLoading(true)
      debounced()
    }
  }

  return (
    <main className='flex flex-col justify-center items-center md:container px-4 h-screen py-10'>
      <h1 className='text-4xl font-bold'>Google Translate Clone</h1>

      <section className='flex flex-col lg:flex-row gap-2 mt-10 w-full max-w-screen-xl'>
        <div className='grid gap-y-2 w-full'>
          <div className='flex gap-x-2'>
            <LanguageSelector
              value={fromLanguage}
              onValueChange={onSelectedFromLanguageChange}
              type={SectionType.From}
              languages={SOURCE_LANGUAGES}
            />
            <Button
              className='self-start text-xl h-14 min-w-14 lg:hidden'
              variant='ghost'
              size='icon'
              onClick={interchangeLanguages}
            >
              <InterchangeIcon />
            </Button>
          </div>
          <div className='lg:hidden'>
            <LanguageSelector
              value={toLanguage}
              onValueChange={onSelectedToLanguageChange}
              type={SectionType.To}
              languages={TARGET_LANGUAGES}
            />
          </div>
          <Textarea
            className='resize-none text-2xl w-full h-[250px] lg:h-[400px]'
            placeholder='Ingresar texto'
            onChange={handleFromLanguageChange}
          />
        </div>
        <Button
          className='self-start text-xl h-14 min-w-14 hidden lg:flex'
          variant='ghost'
          size='icon'
          onClick={interchangeLanguages}
        >
          <InterchangeIcon />
        </Button>
        <div className='grid gap-y-2 w-full'>
          <div className='hidden lg:flex'>
            <LanguageSelector
              value={toLanguage}
              onValueChange={onSelectedToLanguageChange}
              type={SectionType.To}
              languages={TARGET_LANGUAGES}
            />
          </div>
          <div className='relative'>
            <Textarea
              className='resize-none read-only:bg-gray-100 text-2xl w-full h-[250px] lg:h-[400px]'
              placeholder={loading ? '' : result !== '' ? result : 'Traducción'}
              readOnly
            />
            {loading && (
              <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-none text-gray-400'>
                <LoadingIcon className='animate-spin w-10 h-10' />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
