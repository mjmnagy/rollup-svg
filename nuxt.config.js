import path from 'path'

module.exports = {
  mode: 'universal',

  /*
   ** Set the server
   */
  server: {
    port: 1000,
    host: 'localhost'
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/icons'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  /*
   ** runtime system parameters configuration (this.$config)
   */
  publicRuntimeConfig: {},
  privateRuntimeConfig: {},

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias['@icons'] = path.resolve(__dirname, 'src', 'icons')
      config.resolve.alias['@mixins'] = path.resolve(__dirname, 'src', 'mixins')

      // config.module.rules.push({
      //   loader: 'html-loader',
      //   test: /\.svg$/
      // })
      /*
      const svgRule = config.module.rule('svg')
      svgRule.uses.clear()
      config.module
        .rule('svg')
        .test(/\.svg$/)
        .use('html-loader')
        .loader('html-loader')
        .end()
        */
    }
  }
}
