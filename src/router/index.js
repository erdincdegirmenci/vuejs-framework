import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import constant from '@/library/constants/constants'

import Home from '@/views/pages/home/Home'

import DefaultLayout from '@/views/layouts/default-layout'

Vue.use(VueRouter)

function lazyLoad(view){
  return() => import(`@/views/pages/${view}/${view}.vue`)
}
function lazyLoadByModuleAndPage(moduleName, pageName){
  return() => import(`@/views/pages/${moduleName}/${pageName}.vue`)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: lazyLoadByModuleAndPage('account/login', 'login')
  },
  {
    path: '/register',
    name: 'Register',
    component: lazyLoadByModuleAndPage('account/register', 'register')
  },
  {
    path: '/forgetpassword',
    name: 'ForgetPassword',
    component: lazyLoadByModuleAndPage('account/forgetpassword', 'forgetpassword')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: lazyLoadByModuleAndPage('account/logout', 'logout')
    
  },
  {
    path: '/mailactivation',
    name: 'MailActivation',
    component: lazyLoadByModuleAndPage('account/activation', 'mailactivation')
    
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          authorize: []
        }
      },
      // otherwise redirect to home
      { path: '*', redirect: '/' }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta
  const currentUser = store.getters.currentUser

  if (authorize) {
    if (!currentUser) {
      return next({ path: '/login', query: { returnUrl: to.path } })
    }

    // check role
    if (authorize.length && !currentUser.Roles.includes(authorize[0])) {
      return next({ path: '/' })
    }
  }

  next()
})

export default router
