import Vue from 'vue'
import Router from 'vue-router'
import tableGermplasm from '@/components/table-germplasm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'tableGermplasm',
      component: tableGermplasm
    }
  ]
})
