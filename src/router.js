import Vue from 'vue';

import Router from 'vue-router';
import TaskOverview from './overview/TaskOverview.vue';
import UpdateTask from './insert/UpdateTask.vue';

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
      name: 'Insert',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './insert/AddTask.vue'),
    },
    {
      path: '/update/:taskId/',
      name: 'Update',
      component: UpdateTask,
      props: true,
      beforeEnter(to, from, next) {
        const isValidId = Number.isInteger(Number(to.params.id));
        next(isValidId);
      },
    },
  ],
});
