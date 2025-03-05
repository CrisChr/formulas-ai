import { create } from 'zustand'

// 创建API Key存储
export const useApiStore = create((set) => ({
  deepSeekApiKey: '',
  setDeepseekApiKey: (key) => set({ deepSeekApiKey: key }),
}))
