import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from './plugins/font-awesome';
import router from "./router";
import store from "./store";
import ApiService from "./services/ApiService";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

const app = createApp(App);

app.use(store);
app.use(router);
ApiService.init(app);
app.use(VueSweetalert2)
.component("font-awesome-icon", FontAwesomeIcon)
app.mount("#app");