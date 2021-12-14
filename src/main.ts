import { createApp } from "vue";
import VueGTag from "vue-gtag-next";
import VueMeta from "vue-meta";
// import VueI18n from "vue-i18n";
import * as icons from "@/utils/icons";
import LoadScript from "vue-plugin-load-script";
// import PortalVue from "portal-vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { i18n, vuetify } from "./plugins/vuetify";

const app = createApp({
    i18n,
    router,
    store,
    vuetify,
    render: (h) => h(App),
} as any).$mount("#app");

app.config.productionTip = false;
app.config.devtools = window.location.hostname === "localhost";
app.config.performance = ["localhost", "staging.holodex.net"].includes(window.location.hostname);

app.use(
    VueGTag,
    {
        config: {
            id: "UA-178428556-1",
        },
    },
    router,
);

// Create a manager to use a custom path (due to reverse proxy)
if (!(window as any).hideMeta) {
    app.use(VueMeta, {
        refreshOnceOnNavigation: true,
    });
}
// app.use(VueI18n);
app.use(LoadScript);

// Vue.use(PortalVue);
app.prototype.icons = icons;

