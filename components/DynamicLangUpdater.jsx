'use client'
import { useEffect } from 'react';
import { useI18n } from '../app/i18n';

const flagMaps = {
  '🇬🇧 English': 'en',
  '🇨🇳 简体中文': 'zh-CN',
  '🇭🇰 繁體中文': 'zh-TW',
  '🇫🇷 Français': 'fr',
  '🇪🇸 Español': 'es',
  '🇯🇵 日本語': 'ja',
};

export function DynamicLangUpdater() {
  const { locale } = useI18n();

  useEffect(() => {
    const langCode = flagMaps[locale] || 'en';
    document.documentElement.lang = langCode;
  }, [locale]);

  return null; // This component does not render anything
}
