import {constantRoutes} from '@/router'
const getDefaultState = () => {
  return {
    routes:[...constantRoutes],
    includes:[] //快速导航条包含的路由
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  ADD_ROUTES: (state, asyncRoutes) => {
    state.routes.push(...asyncRoutes)
  },
  ADD_INCLUDES(state,name){
    //需要缓存的组件名
    state.includes.push(name)
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
