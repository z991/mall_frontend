import Router from '../../router/index'
import axioIn from '../../store/axioIn'
import {
    mapState,
   mapMutations,
   mapGetters,
} from 'vuex';
export default {
    name:'myOrder',
    data:function(){
        return {
            order:[{order_sn:'',state:'',order_year:'',order_discount:'',order_mount:'',price:'',
            order_cp:[{goods_name:'',model_name:'',goods_num:'',put_price:''}]} ]
        }
    },
    mounted:function(){
        axioIn.get('/api/order/order_list/')
            .then((res)=>{
              if(res.data.data === 1){
                alert('请先登录');return;
              }
              // this.order = res.data/api/order/order_list/
                this.order=res.data.results;
                this.order.map(n=>{
                  let num = 0;
                  n.order_cp.map(m=>{
                    num += parseInt(m.goods_num)
                  })
                  this.$set(n,'goods_num',num)
                })

            })
    },
    methods:{
        ...mapMutations(['setShopdetailId']),
        detail1:function(ind){
          this.setShopdetailId(ind)
          Router.push({path:'./my_detail'})
        }
    }
}