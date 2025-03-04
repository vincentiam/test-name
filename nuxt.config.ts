import tailwindcss from '@tailwindcss/vite';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/supabase'
  ],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  primevue: {
    importTheme: { from: '@/themes/index.js' }
  },
  runtimeConfig: {
    public: {
      // 這些變數 **會暴露給前端**
      SupabaseUrl: process.env.SUPABASE_URL || '',
      SupabaseKey: process.env.SUPABASE_KEY || '',
    }
  }
})
