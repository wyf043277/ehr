import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import getPageTitle from '@/utils/get-page-title.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/404'] //不需要登录的地址白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if(store.getters.token){
    if(to.path=='/login'){
      next('/')
      NProgress.done()
    }else{
      try{
        if(!store.getters.unserInfo){
          //如果没有用户信息需要去获取一次用户信息
          next()
          const userInfo=await store.dispatch('user/getInfo')
        }
      }catch(e){
        console.log(e)
      }
    }
  }else{
    if(whiteList.includes(to.path)){
      console.log(to.path)
      next()
    }else{
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  // finish progress bar
  document.title=getPageTitle(to.meta.title)
  NProgress.done()
})
