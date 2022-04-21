import { createStore } from "@alife/anyui-wx-framework/vuex";
import onlineCar from "../onlineCar/store/index";
import Environment from "../common/environment.js";
const isNotProd = Environment.getEnvironment() !== "public";
const storeInstance = createStore({
  modules: { ...onlineCar },
  strict: isNotProd,
});

function registerModule(modules) {
  if (!modules || modules.length < 1) {
    return;
  }

  Object.keys(modules).forEach((name) => {
    const module = modules[name];
    storeInstance.registerModule(name, module);
  });
}

export { storeInstance, registerModule };
