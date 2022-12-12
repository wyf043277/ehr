const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => {
    return state.user.userInfo
    },
  routes:state=>state.router.routes
}
export default getters
