import axios from 'axios';

export default {
  namespaced: true,
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
      axios.get('/api/parts')
        .then(result => commit('updateTasks', result.data.results))
        .catch(console.error);
    },
  },
  // getters: {
  //   cartSaleItems(state) {
  //     return state.cart.filter(item => item.head.onSale);
  //   },
  // },
};
