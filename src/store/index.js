import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import parameter from './modules/parameter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    parameter
  }
})
