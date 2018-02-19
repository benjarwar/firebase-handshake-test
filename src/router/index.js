import Vue from 'vue'
import Router from 'vue-router'
import FirebaseHandshakeTest from '@/components/FirebaseHandshakeTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirebaseHandshakeTest',
      component: FirebaseHandshakeTest
    }
  ]
})
