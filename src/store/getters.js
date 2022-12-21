const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => {
    return state.user.userInfo
    },
  routes:state=>state.router.routes,
  includes:state=>state.router.includes,
  includeRouter:state=>state.router.includeRouter
}
export default getters
