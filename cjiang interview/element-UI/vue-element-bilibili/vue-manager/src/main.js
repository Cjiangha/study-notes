import Vue from "vue";
import App from "./App.vue";

// import ElementUI from 'element-ui';
import {
  Button,
  Radio,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./../router/index";

Vue.config.productionTip = false;
// Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
