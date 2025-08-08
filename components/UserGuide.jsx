'use client'
import { XIcon } from 'lucide-react';
import { useI18n } from '../app/i18n';

export function UserGuide({ onClose }) {
  const { t } = useI18n();

  return (
    <div className="absolute top-16 right-4 z-20 w-64 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
      <div className="flex justify-between items-start">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t('userGuide.addApiKey') || '请在设置中添加您的API Key以使用全部功能。'}
        </p>
        <button onClick={onClose} className="p-1 -mt-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <XIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
