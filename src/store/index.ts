import Vue from 'vue'
import Vuex from 'vuex'
import { UserServices } from '@/services/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: '',
      username: '',
      id: -1,
      info: {},
    },
    activity: {
      listOfActivity: {} as { [x: string]: { id: number; name: string } },
    },
  },
  mutations: {},
  actions: {
    async signin({ state }, params: { username: string; password: string }) {
      const result = await UserServices.signin(params.username, params.password)
      localStorage.setItem('auth', JSON.stringify(result))
      state.user = result
    },
    signout() {
      localStorage.removeItem('auth')
      localStorage.remove('token')
    },
  },
  modules: {},
})
