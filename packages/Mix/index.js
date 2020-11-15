import Mix from "./src/main";

Mix.install = function (Vue) {
  Vue.component(Mix.name, Mix)
}
 
export default Mix