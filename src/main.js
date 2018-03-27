/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-06-06 03:04:23
 * @modify date 2017-08-11 04:05:28
 * @desc [入口文件]
*/

import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import 'normalize.css/normalize.css' // normalize.css
import 'xp-reset.css' // reset.css
import '@/assets/css/index.less' // less 全局预设样式
import * as filters from '@/utils/filters'
import '@/components' // 引入全局组件
import '@/errLog' // 错误日志
// import '@/permission' // 权限
// import 'screen-flexible/lib/auto'
import { bodyResize } from 'screen-flexible'
let timer
window.addEventListener('resize', () => {
  clearTimeout(timer)
  timer = setTimeout(() => { bodyResize(1920, 1080) }, 300)
})

bodyResize(1920, 1080)

// 注册全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 禁止长按弹出菜单
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('contextmenu', e => { e.preventDefault() })
}

Vue.config.productionTip = false // 取消启动时的提示

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
