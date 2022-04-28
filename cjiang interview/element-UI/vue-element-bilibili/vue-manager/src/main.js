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
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Dialog,
  RadioGroup,
  RadioButton
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '../src/assets/less/index.less'
import router from "./../router/index";
import store from '../store'
// import vuex from 'vuex'



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
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Dialog);
Vue.use(RadioGroup);
Vue.use(RadioButton);



new Vue({
  store,//使用store
  router,
  render: (h) => h(App),
}).$mount("#app");
