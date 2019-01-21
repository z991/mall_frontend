import Vue from 'vue'
import Router from 'vue-router'
import PublicHead from '@/page/public_head'
import DetailGoods from '@/components/detail_goods/index'
import Industry from '@/components/industry/index'
import ProductShop from '@/components/productShop/index'
import DetailProduct from '@/components/detail_product/index'
import MyOrder from '@/components/myOrder/index'
import My_detail from '@/components/my_detail/index'
import ShopCar from '@/components/shopCar/index'
import Login from '@/components/Login/index'

import ShopMessage from '@/components/shopMessage/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: { scrollToTop: false }
    },
    

    {
      path: '/',
      name: 'public_head',
      component: resolve => require(['@/page/public_head'], resolve),

      children: [
        {
          path: '/detailGoods',
          name: 'detail_goods',
          component: DetailGoods,

        },
        {
          path: '/industry',
          name: 'industry',
          component: resolve => require(['@/components/industry/index'], resolve),

        },
        {
          path: '/productShop',
          name: 'productShop',
          component: ProductShop
        },
        {
          path: '/detailProduct',
          name: 'detail_product',
          component: DetailProduct,

        },
        {
          path: '/myOrder',
          name: 'myOrder',
          component: MyOrder,

        },
        {
          path: '/my_detail',
          name: 'my_detail',
          component: My_detail,

        },{
          path: '/shopCar',
          name: 'shopCar',
          component: ShopCar,
        },
        {
          path: '/shopMessage',
          name: 'shopMessage',
          component: ShopMessage,
        }
      ]
    }
  ]
})
