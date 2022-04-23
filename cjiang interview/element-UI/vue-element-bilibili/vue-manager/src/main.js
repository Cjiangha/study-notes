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
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./../router/index";
import '../src/assets/less/home.less'
import vuex from 'vuex'


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

Vue.use(vuex)

var store = new vuex.Store({//store对象
  state:{
      show:false
  }
})

new Vue({
  render: (h) => h(App),
  router,
  store,//使用store
}).$mount("#app");
