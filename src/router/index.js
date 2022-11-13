import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
//动态路由 需要权限控制
export const asyncRoutes=[
  {
    path: '/approvals',
    component: Layout,
    children:[
      {
        path:'',
        name:'Approvals',
        component:()=>import('@/views/approvals'),
        meta:{title:'审批',icon:'tree-table'}
      }
    ]
  },
  {
    path: '/attendances',
    component: Layout,
    children:[
      {
        path:'',
        name:'Attendances',
        component:()=>import('@/views/attendances'),
        meta:{title:'考勤',icon:'skill'}
      }
    ]
  },
  {
    path: '/departments',
    component: Layout,
    children:[
      {
        path:'',
        name:'Departments',
        component:()=>import('@/views/departments'),
        meta:{title:'组织架构',icon:'tree'}
      }
    ]
  },
  {
    path: '/employees',
    component: Layout,
    children:[
      {
        path:'',
        name:'Employees',
        component:()=>import('@/views/employees'),
        meta:{title:'员工',icon:'people'}
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    children:[
      {
        path:'',
        name:'Permission',
        component:()=>import('@/views/permission'),
        meta:{title:'权限管理',icon:'lock'}
      }
    ]
  },
  {
    path: '/salarys',
    component: Layout,
    children:[
      {
        path:'',
        name:'Salarys',
        component:()=>import('@/views/salarys'),
        meta:{title:'工资',icon:'money'}
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children:[
      {
        path:'',
        name:'setting',
        component:()=>import('@/views/setting'),
        meta:{title:'角色设置',icon:'setting'}
      }
    ]
  },
  {
    path: '/social',
    component: Layout,
    children:[
      {
        path:'',
        name:'Social',
        component:()=>import('@/views/social'),
        meta:{title:'社保',icon:'table'}
      }
    ]
  },
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes,...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
