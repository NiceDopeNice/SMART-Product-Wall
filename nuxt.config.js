
export default {
  mode: 'universal',  
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    // Local URL
    CMSUrl_image: (process.env.NODE_ENV == "development") ? 'http://odsdev.intra.smart/CMS_SMART/image/productwall/phone_images/' : 'https://odsdev.intra.smart/CMS_SMART/image/productwall/phone_images/'
    // Live URL
    // CMSUrl_image: 'http://ods.intra.smart/CMS_SMART/image/productwall/phone_images/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'SMART | PRODUCT WALL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  // STAGING
  router: {
    base: "/SMARTProductwall/"
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS 
  */
  css: [
    '~/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/vue-slick-carousel.js'}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios', 
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: (process.env.NODE_ENV == "development") ? 'http://stg-ws.intra.smart/NSMARTProductwallAPI/' : 'http://stg-ws.intra.smart/ODSVisualizerAPI/',
    credentials: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
