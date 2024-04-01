// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: [],
  },

  css: ['@/assets/css/main.css'],

  components: [
    { path: '@/components', extensions: ['vue'] },
    {
      path: '@/components/ui',
      pathPrefix: false,
      extensions: ['vue'],
    },
    {
      path: '@/components/modules',
      pathPrefix: false,
      extensions: ['vue'],
    },
  ],

  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0',
    port: 3030,
  },

  experimental: {
    // typedPages: true,
  },

  imports: {
    dirs: ['stores', 'services'],
  },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vant/nuxt',
    '@element-plus/nuxt',
  ],

  router: {
    options: {
      hashMode: true,
    },
  },

  runtimeConfig: {
    public: {
      publicPath: process.env.NUXT_PUBLIC_PATH || '/',
      appName: process.env.NUXT_APP_NAME || '',
      jsonServerPath: process.env.NUXT_JSON_SERVER_PATH || '/',
    },
  },

  ssr: false,

  tailwindcss: {
    // ! tailwind.css  imported this way makes other css files which depend on tailwind functionality fail to compile
    cssPath: false,

    exposeConfig: true,
  },

  vite: {
    define: {
      __DEV__: process.env.NODE_ENV === 'development',
    },
  },
});
