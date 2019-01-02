import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTasks: [],
    executionStates: [],
    taskStates: [],
  },
  mutations: {
    updateTasks(state, tasks) {
      state.activeTasks = tasks;
    },
    updateExecutionStates(state, states) {
      state.executionStates = states;
    },
    updateTaskStates(state, states) {
      state.taskStates = states;
    },
  },
  actions: {
    getTasks({ commit }) {
      axios.get('http://127.0.0.1:5000/invoke?cmd=Intrion.Service.MonorailControl.TaskRestService.GetActiveTasks();')
        .then(result => commit('updateTasks', result.data.Result))
        .catch(console.error);
    },
    getExecutionStates({ commit }) {
      axios.get('http://127.0.0.1:5000/invoke?cmd=Intrion.Service.MonorailControl.TaskRestService.GetExecutionStates();')
        .then(result => commit('updateExecutionStates', result.data.Result))
        .catch(this.$toasted.show('Something went wrong'));
    },
    getTaskStates({ commit }) {
      axios.get('http://127.0.0.1:5000/invoke?cmd=Intrion.Service.MonorailControl.TaskRestService.GetTaskStates();')
        .then(result => commit('updateTaskStates', result.data.Result))
        .catch(this.$toasted.show('Something went wrong'));
    },
    pushTask(config, parameters) {
      console.log(parameters);

      let urlParameters = '';
      Object.entries(parameters).forEach((key, index) => {
        let parameter = key[1];
        if (parameter === '') {
          parameter = '\xa0';
        }

        urlParameters += parameter;
        if (index !== Object.keys(parameters).length - 1) {
          urlParameters += ', ';
        }
      });

      const urlBase = 'http://127.0.0.1:5000/invoke?cmd=Intrion.Service.MonorailControl.TaskRestService.PushActiveTask(';
      const urlEnd = ');';
      const url = urlBase.concat(urlParameters, urlEnd);

      console.log(url);
      axios.get(url)
        .then(console.log('working'))
        .catch(console.error);
    },
  },
});
