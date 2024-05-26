import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AUTO_LANGUAGE, SOURCE_LANGUAGES, TARGET_LANGUAGES } from '@/constants'
import { FromLanguage, SectionType, ToLanguage } from '@/types'

type Props =
  | {
      type: SectionType.From
      value: FromLanguage
      onValueChange: (language: FromLanguage) => void
      languages: typeof SOURCE_LANGUAGES
    }
  | {
      type: SectionType.To
      value: ToLanguage
      onValueChange: (language: ToLanguage) => void
      languages: typeof TARGET_LANGUAGES
    }

const LanguageSelector: React.FC<Props> = ({
  value,
  onValueChange,
  type,
  languages,
}) => {
  return (
    <Select
      value={
        type === SectionType.From && value !== AUTO_LANGUAGE
          ? value.slice(0, 2)
          : value
      }
      onValueChange={onValueChange}
    >
      <SelectTrigger className='w-full h-14 text-lg'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          <SelectGroup>
            {type === SectionType.From && (
              <SelectItem className='text-base' value={AUTO_LANGUAGE}>
                detectar idioma
              </SelectItem>
            )}

            {Object.entries(languages)
              .slice(0, 12)
              .map(([key, value]) => (
                <SelectItem
                  className='text-base'
                  key={key}
                  value={type === SectionType.From ? key.slice(0, 2) : key}
                >
                  {value}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            {Object.entries(languages)
              .slice(12, type === SectionType.From ? 25 : 24)
              .map(([key, value]) => (
                <SelectItem
                  className='text-base'
                  key={key}
                  value={type === SectionType.From ? key.slice(0, 2) : key}
                >
                  {value}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectGroup>
            {Object.entries(languages)
              .slice(type === SectionType.From ? 25 : 24, 32)
              .map(([key, value]) => (
                <SelectItem
                  className='text-base'
                  key={key}
                  value={type === SectionType.From ? key.slice(0, 2) : key}
                >
                  {value}
                </SelectItem>
              ))}
          </SelectGroup>
        </div>
      </SelectContent>
    </Select>
  )
}

export default LanguageSelector
