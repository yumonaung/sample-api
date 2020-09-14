import Vue from 'vue'
import Vuex from 'vuex'

import ProductsModule from '../store/modules/products-module'
import CategoriesModule from '../store/modules/categories-module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    ProductsModule,
    CategoriesModule
  }
})
