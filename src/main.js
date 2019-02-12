import { library } from '@fortawesome/fontawesome-svg-core';
import { faHandPaper, faTimes, faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import toast from './toast';

library.add(faHandPaper);
library.add(faTimes);
library.add(faLaptopCode);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  toast,
  store,
  render: h => h(App),
}).$mount('#app');
