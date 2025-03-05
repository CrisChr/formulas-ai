'use client'
import { useState, useEffect } from 'react';
import { useI18n } from '../app/i18n';
import { XIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useApiStore } from '../store';
import { toast } from 'react-hot-toast';


export function SettingsDrawer({ isOpen, onClose }) {
  const { t } = useI18n();
  const { deepSeekApiKey, setDeepseekApiKey } = useApiStore();
  const [apiKey, setApiKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(deepSeekApiKey);
    }
  }, [isOpen, deepSeekApiKey]);

  const validateApiKey = (key) => {
    if (!key || key.trim() === '') {
      toast.error(t('settings.apiKeyEmpty') || 'API Key不能为空');
      return false;
    }

    // 检查是否只包含合法字符（字母、数字和特定符号）
    const validKeyPattern = /^[A-Za-z0-9_-]+$/;
    if (!validKeyPattern.test(key)) {
      toast.error(t('settings.apiKeyFormatError') || 'API Key包含非法字符');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateApiKey(apiKey)) {
      setDeepseekApiKey(apiKey);
      toast.success(t('settings.apiKeySaveSuccess') || 'API Key保存成功');
      onClose();
    } else {
      toast.error(t('settings.apiKeySaveError') || '保存API Key失败');
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-64 sm:w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-3 sm:p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold dark:text-white">{t('settings.title') || '设置'}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <XIcon className="h-5 w-5 sm:h-6 sm:w-6 dark:text-white" />
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <label htmlFor="apiKey" className="block text-sm sm:text-base font-medium text-gray-700 dark:text-white mb-1 sm:mb-2">
            {t('settings.deepseekApiKey') || 'DeepSeek API Key'}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-md pr-10 text-sm sm:text-base bg-white dark:bg-gray-700 dark:text-white"
              placeholder={t('settings.enterApiKey') || '输入您的API Key'}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {t('settings.apiKeyDescription') || 'API密钥将以加密形式保存在内存中，页面刷新后需要重新输入'}
          </p>
        </div>
        <div className="mt-auto">
          <div className="border-t dark:border-gray-700 p-3 sm:p-4">
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm sm:text-base dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              {t('settings.save') || '保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}