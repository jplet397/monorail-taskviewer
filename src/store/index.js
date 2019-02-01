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
    getTasks({commit}) {
      const url = `${constants.DEFAULT_URL}.GetActiveTasks();`;
      console.log(url);
      axios.get(url)
        .then((result) => {
          if (result.data.MethodeSucceed === true) {
            commit('updateTasks', result.data.Result);
          } else {
            console.log('Getting tasks failed', result.data);
          }
        })
        .catch(console.error);
    },
    getTasksById(config, parameter) {
      console.log('task id:', parameter);
      const url = `${constants.DEFAULT_URL}.GetTaskById(${parameter});`;
      console.log(url);
      return axios.get(url)
        .then((result) => {
          if (result.data.MethodeSucceed === true) {
            return result.data.Result;
          }
          console.log('Getting task failed', result.data);
          return false;
        })
        .catch(console.error);
    },
    getExecutionStates({commit}) {
      const url = `${constants.DEFAULT_URL}.GetExecutionStates();`;
      console.log(url);
      axios.get(url)
        .then(result => commit('updateExecutionStates', result.data.Result))
        .catch(console.error);
    },
    getTaskStates({commit}) {
      const url = `${constants.DEFAULT_URL}.GetTaskStates();`;
      console.log(url);
      axios.get(url)
        .then(result => commit('updateTaskStates', result.data.Result))
        .catch(console.error);
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
      return axios.get(url)
        .then((result) => {
          if (result.data.MethodeSucceed === true) {
            return true;
          }
          return result.data.ResultException.InnerException.Message;
        })
        .catch(() => {
          console.error();
          return 'Something went wrong';
        });
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
      return axios.get(url)
        .then((result) => {
          if (result.data.MethodeSucceed === true) {
            return true;
          }
          return result.data.ResultException.InnerException.Message;
        })
        .catch(() => {
          console.error();
          return 'Something went wrong';
        });
    },
    cancelTask(config, taskId) {
      const urlBase = `${constants.DEFAULT_URL}.CancelTask(`;
      const urlEnd = ');';
      const url = urlBase.concat(taskId, urlEnd);

      return axios.get(url)
        .then((result) => {
          console.log(result);
          if (result.data.MethodeSucceed === true) {
            return true;
          }
          return result.data.ResultException.InnerException.Message;
        })
        .catch(() => {
          console.error();
          return 'Something went wrong';
        });
    },
    clearFailed(config, taskId) {
      const urlBase = `${constants.DEFAULT_URL}.ClearFailed(`;
      const urlEnd = ');';
      const url = urlBase.concat(taskId, urlEnd);

      console.log(url);
      return axios.get(url)
        .then((result) => {
          console.log(result);
          if (result.data.MethodeSucceed === true) {
            return true;
          }
          return result.data.ResultException.InnerException.Message;
        })
        .catch(() => {
          console.error();
          return 'Something went wrong';
        });
    },
    resetRounds(config, taskId) {
      const urlBase = `${constants.DEFAULT_URL}.ResetRounds(`;
      const urlEnd = ');';
      const url = urlBase.concat(taskId, urlEnd);

      console.log(url);
      return axios.get(url)
        .then((result) => {
          console.log(result);
          if (result.data.MethodeSucceed === true) {
            return true;
          }
          return result.data.ResultException.InnerException.Message;
        })
        .catch(() => {
          console.error();
          return 'Something went wrong';
        });
    },
  },
});
