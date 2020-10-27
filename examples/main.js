import Vue from "vue"
import App from "./App.vue"

import fechart from "../packages/index"
console.log(fechart)
Vue.use(fechart)
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app")
