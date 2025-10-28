'use client'
import { useTranslation } from 'react-i18next'
import { languages } from '@/app/i18n/settings'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-2">
      {languages.map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          className={`px-3 py-1 rounded ${
            i18n.language === lng
              ? 'bg-pink-300 text-white'
              : 'bg-white opacity-70 text-gray-800'
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
