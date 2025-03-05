'use client'
import { createContext, useContext, useState } from 'react'

import en from '../translations/en.json'
import zh from '../translations/zh.json'
import zhTW from '../translations/zh-TW.json'
import fr from '../translations/fr.json'
import es from '../translations/es.json'
import ja from '../translations/ja.json'

const translations = { en, zh, 'zh-TW': zhTW, fr, es, ja }

const flagMaps = {
  '🇬🇧 English': 'en',
  '🇨🇳 简体中文': 'zh',
  '🇭🇰 繁體中文': 'zh-TW',
  '🇫🇷 Français': 'fr',
  '🇪🇸 Español': 'es',
  '🇯🇵 日本語': 'ja',
}

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState('🇬🇧 English')

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[flagMaps[locale]];
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}