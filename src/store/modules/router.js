import {constantRoutes} from '@/router'
const getDefaultState = () => {
  return {
    routes:[...constantRoutes]
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  ADD_ROUTES: (state, asyncRoutes) => {
    state.routes.push(...asyncRoutes)
  }
}

const actions = {
  // 用户登录
  addRoutes({ commit }, asyncRoutes) {
    commit('ADD_ROUTES',asyncRoutes)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
