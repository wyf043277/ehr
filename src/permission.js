import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/404'] //不需要登录的地址白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if(store.getters.token){
    if(to.path=='/login'){
      next('/')
      NProgress.done()
    }else{
      next()
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

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
