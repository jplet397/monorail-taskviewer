import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import constants from '../constants';

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
      const url = `${constants.DEFAULT_URL}.GetActiveTasks();`;
      console.log(url);
      axios.get(url)
        .then(result => commit('updateTasks', result.data.Result))
        .catch(console.error);
    },
    getExecutionStates({ commit }) {
      axios.get(`${constants.DEFAULT_URL}.GetExecutionStates();`)
        .then(result => commit('updateExecutionStates', result.data.Result))
        .catch(this.$toasted.show('Something went wrong'));
    },
    getTaskStates({ commit }) {
      axios.get(`${constants.DEFAULT_URL}.GetTaskStates();`)
        .then(result => commit('updateTaskStates', result.data.Result))
        .catch(this.$toasted.show('Something went wrong'));
    },
    pushTask(config, parameters) {
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

      const urlBase = `${constants.DEFAULT_URL}.PushNewTask(`;
      const urlEnd = ');';
      const url = urlBase.concat(urlParameters, urlEnd);

      console.log(url);
      axios.get(url)
        .then(console.log('working'))
        .catch(console.error);
    },
    updateTask(config, parameters) {
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

      const urlBase = `${constants.DEFAULT_URL}.UpdateTask(`;
      const urlEnd = ');';
      const url = urlBase.concat(urlParameters, urlEnd);

      console.log(url);
      axios.get(url)
        .then(console.log('working'))
        .catch(console.error);
    },
    cancelTask(config, taskId) {
      const urlBase = `${constants.DEFAULT_URL}.CancelTask(`;
      const urlEnd = ');';
      const url = urlBase.concat(taskId, urlEnd);

      axios.get(url)
        .then(console.log('working'))
        .catch(console.error);
    },
    clearFailed(config, taskId) {
      const urlBase = `${constants.DEFAULT_URL}.ClearFailed(`;
      const urlEnd = ');';
      const url = urlBase.concat(taskId, urlEnd);

      console.log(url);
      axios.get(url)
        .then(console.log('working'))
        .catch(console.error);
    },
  },
});
