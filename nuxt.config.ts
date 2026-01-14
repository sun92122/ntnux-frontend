// https://nuxt.com/docs/api/configuration/nuxt-config
import { MyPreset } from "./themes/app-theme";

export default defineNuxtConfig({
  app: {
    baseURL: "", // 使用自訂網域，保留為根路徑
    head: {
      title: "NTNUx｜課程查詢系統",
      meta: [
        {
          name: "description",
          content: "更適合師大人的課程查詢系統，更快、更強、行動裝置友好。",
        },
      ],
    },
  },
  nitro: {
    preset: "cloudflare-module",
    prerender: {
      autoSubfolderIndex: false,
    },
    cloudflare: {
      wrangler: { name: "ntnux" },
      deployConfig: true,
      nodeCompat: true,
    },
  },
  router: {
    options: {
      strict: true,
    },
  },

  modules: ["@primevue/nuxt-module"],

  css: ["primeicons/primeicons.css"],

  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          dark: false,
          darkModeSelector: ".dark-mode-toggle",
        },
      },
    },
    components: {
      prefix: "Prime",
      exclude: ["Editor", "Chart", "Form", "FormField"], // To fix import error from PrimeVue
    },
  },

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      isCloudflare: process.env.NUXT_RUNTIME_ENV === "cloudflare",
    },
  },

  compatibilityDate: "2025-11-09",
});
