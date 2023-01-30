import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'authentication',
  state: () => ({
    token: '',
    isAuthenticated: false
  }),
  actions: {
    setToken(token) {
      this.token = token
      this.isAuthenticated = true
    },
    removeToken() {
      this.token = ''
      this.isAuthenticated = false
    }
  },
  persist: true
})