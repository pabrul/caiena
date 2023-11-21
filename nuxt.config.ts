// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["nuxt-icon", "@pinia/nuxt"],

  icon: {
    // Suas configurações de ícone vão aqui
    size: "24px",
    class: "teste",
    aliases: {
      nuxt: "logos:nuxt-icon",
    },
  },

  css: ["~/assets/css/main.css", "~/assets/css/reset.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.GITHUB_API_BASE,
      gitHubToken: process.env.GITHUB_TOKEN,
    },
  },
});
