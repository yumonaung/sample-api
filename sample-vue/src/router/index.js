import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Product',
    component: () => import('../components/DisplayList'),
    meta: { title:'try'}
  },
  {
    path: '/productid/:id',
    name: 'ProductId',
    component: () => import('../components/DetailComponent'),
    meta: { title:  'list'  }
  },
  {
    path: '/addproduct',
    name: 'AddProduct',
    component: () => import('../components/AddProduct'),
    meta: { title:'add' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router