import {constantRoutes} from '@/router'
const getDefaultState = () => {
  return {
    routes:[...constantRoutes],
    includes:[] ,//缓存的组件
    includeRouter:[]//缓存的路由信息
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
  ADD_INCLUDES(state,router){
    //需要缓存的组件名 和缓存的路由信息   （组件名和路由名相同）
    state.includes.push(router.name)
    state.includeRouter.push(router)
  },
  REMOVE_INCLUDES(state,router){
    //删除缓存组件
    state.includes.splice(state.includes.indexOf(router.name),1)
    state.includeRouter=state.includeRouter.filter(item=>item.name!=router.name)
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
