import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTasks: [],
  },
  mutations: {
    // addRobotToCart(state, robot) {
    //   state.cart.push(robot);
    // },
    updateTasks(state, tasks) {
      state.activeTasks = tasks;
    },
  },
  actions: {
    getTasks({ commit }) {
      axios.get('http://127.0.0.1:5000/invoke?cmd=Intrion.Service.MonorailControl.TaskRestService.GetActiveTasks();')
        .then(result => commit('updateTasks', result.data.Result))
        .catch(console.error);
    },
  },

});
