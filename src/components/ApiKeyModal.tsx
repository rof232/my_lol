import React from 'react';
import { Key, X } from 'lucide-react';
import AIProviderSelector from './AIProviderSelector';
import type { AISettings } from '../lib/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (settings: AISettings) => void;
  settings: AISettings;
}

export default function ApiKeyModal({ isOpen, onClose, onSubmit, settings }: Props) {
  const [localSettings, setLocalSettings] = React.useState<AISettings>(settings);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSettings.apiKey.trim()) {
      onSubmit(localSettings);
      onClose();
    }
  };

  const handleUpdate = (updates: Partial<AISettings>) => {
    setLocalSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Key className="w-5 h-5" />
            إعدادات الذكاء الاصطناعي
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <AIProviderSelector
            settings={localSettings}
            onUpdate={handleUpdate}
          />
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}