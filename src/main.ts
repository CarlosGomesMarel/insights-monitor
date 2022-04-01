/**
 * Main entry point.
 */

import DebugModule from "@/support/debug";
/**
 * Initialize Debug before all other modules
 * */
DebugModule.ensureCalled();

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Env } from "@/support/environment";

import Vue from "vue";
Vue.config.productionTip = false;

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(Element, { locale });

import VueJsModal from "vue-js-modal";
Vue.use(VueJsModal);

import VueAppInsights from "vue-application-insights";

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", VueSelect);

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  timeout: 3000,
  closeButton: false,
  position: "top-center",
  hideProgressBar: true,
};
Vue.use(Toast, options);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBug,
  faCog,
  faEdit,
  faExclamationTriangle,
  faFileCsv,
  faFileExcel,
  faFileExport,
  faQuestion,
  faRefresh,
  faSave,
  faSpinner,
  faShareSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faBug,
  faCog,
  faEdit,
  faExclamationTriangle,
  faFileCsv,
  faFileExcel,
  faFileExport,
  faQuestion,
  faRefresh,
  faSave,
  faSpinner,
  faShareSquare,
  faTrash
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Vue.use(VueAppInsights as any, {
  id: Env.APPINSIGHTS_INSTRUMENTATIONKEY,
});

import App from "./views/app/app.vue";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
