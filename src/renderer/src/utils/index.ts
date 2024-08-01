import clsx, { ClassValue } from 'clsx'
import { Locale, format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { enUS, ptBR } from 'date-fns/locale'
import { twMerge } from 'tailwind-merge'

const localeMap: { [key: string]: Locale } = {
  'en-US': enUS,
  'pt-BR': ptBR
}

const userLocale = window.context.locale || 'en-US'
const locale = localeMap[userLocale] || enUS
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const formatDateFromMs = (ms: number) => {
  const zonedDate = toZonedTime(ms, timeZone)
  return format(zonedDate, 'Pp', { locale })
}

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
