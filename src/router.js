import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/register'
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('./view/register'),
    meta: {
      title: '人员注册'
    }
  }
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next()
});

export default router;
