import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(BootstrapVue)
Vue.use( CKEditor );

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
