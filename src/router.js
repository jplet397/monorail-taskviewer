import Vue from 'vue';

import Router from 'vue-router';
import TaskOverview from './overview/TaskOverview.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'taskOverview',
      component: TaskOverview,
    },
    {
      path: '/insert',
      name: 'insert',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './insert/AddTask.vue'),
    },
  ],
});
