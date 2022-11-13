import { loginApi,getUserProfileAPI } from '@/api'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  REMOVE_TOKEN(state, token){
    state.token = token=''
    removeToken()
  }

}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { mobile, password } = userInfo
    return new Promise(async (resolve, reject) => {
      console.log(userInfo)
      try{
         const res=await loginApi(mobile ,password)
         commit('SET_TOKEN',res.data)
         resolve(res)
      }catch (err) {
        reject(err)
      }
    })
  },

  // 获取用户信息
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserProfileAPI(state).then(response => {
        console.log(response)
        const {data}=response
        commit('SET_USERINFO', data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout(store) {
    return new Promise((resolve, reject) => {
      store.dispatch('resetToken')
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
