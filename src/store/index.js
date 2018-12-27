import Vue from 'vue';
import Vuex from 'vuex';

import taskModule from './modules/tasks';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  modules: {
    tasks: taskModule,
  },
});
