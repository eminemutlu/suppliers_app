import { createStore } from "vuex";
import AuthModule from "./modules/AuthModule";
import ContentModule from "./modules/ContentModule";

const store = createStore({
  modules: {
    AuthModule,
    ContentModule
  },
});

export default store;
