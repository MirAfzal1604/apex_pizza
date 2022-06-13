import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['bootstrap-vue-3/nuxt'],
    css: ['bootstrap/dist/css/bootstrap.css'],
    app: {
        head: {
            title: "Apex PIZZA",
            link: [
                { rel: 'stylesheet', href: '/assets/css/main.css' },
            ]
        }
    }
})
