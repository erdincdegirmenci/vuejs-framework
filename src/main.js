import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VuejsDialog from 'vuejs-dialog'
import i18n from './library/plugins/i18n.js'
import messageplugin from './library/plugins/messageplugin'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

/* ---------- Legalden Kalanlar --------- */
import './assets/styles/styles.css'
import './assets/fonts/webfonts/all.css'
/* --------------------------------- */

import './assets/styles/apexcharts.css'
import './assets/styles/app-dark.css'
import './assets/styles/app-light.css'
import './assets/styles/app-rtl.css'
import './assets/styles/bootstrap-datepicker.css'
import './assets/styles/dataTables.bootstrap4.css'
import './assets/styles/daterangepicker.css'
import './assets/styles/dropzone.css'
import './assets/styles/dropzone.min.css'
import './assets/styles/feather.css'
import './assets/styles/fullcalendar.css'
import './assets/styles/jquery.steps.css'
import './assets/styles/jquery.timepicker.css'
import './assets/styles/perfect-scrollbar.css'
import './assets/styles/quill.snow.css'
import './assets/styles/select2-bootstrap4.css'
import './assets/styles/select2.css'
import './assets/styles/simplebar.css'
import './assets/styles/uppy.min.css'

import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/scripts/tinycolor-min'
import './assets/scripts/jquery.stickOnScroll'
import './assets/scripts/datamaps.custom'
import './assets/scripts/daterangepicker'
import './assets/scripts/jquery.timepicker'

import 'vuejs-dialog/dist/vuejs-dialog.min.css'

import EventBus from './library/helpers/eventbus'
import vuetify from './plugins/vuetify'

Vue.use(Vuelidate)
Vue.use(VuejsDialog, {
  html: true,
  loader: false
})

EventBus.CreateEventBus()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  messageplugin,
  vuetify,
  render: h => h(App)
}).$mount('#app')
