import Vue from "vue"
import App from "./App.vue"

import vueHelloWorld from './components/HelloWorld/HelloWorld.js'

Vue.use(vueHelloWorld)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app")
