import axioIn from '../../store/axioIn'
import Router from '../../router/index'
import Login from '../Login/index'
import {
 	mapState,
	mapMutations,
	mapGetters,
} from 'vuex';
axioIn.defaults.withCredenials=true;
export default {
  name: 'industry',
  components:{Login,axioIn},
  data () {
    return {
      product_list: [],
      shopNum: 1,
      HinChange: this.$store.state.LoginStatus,
      panelShow: false,
    }
  },
  created () {
    axioIn.get('/api/goods/list_solution/').then(res=>{
      this.product_list = res.data
      this.product_list.map(n=>{
        //if(n.m_up_goods.m_in_goods[0].image){
         // n.image = n.m_up_goods.m_in_goods[0].image
        //}
        this.$set(n,'isActive',false)
      })
    })
  },
  computed:{
    ...mapGetters(['userToken'])
  },
  methods: {
    ...mapMutations(['setShopdetailId']),
    ShopCount(){
    axioIn.get('/api/trades/number',{

         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    addTrolley (item) {

       if(this.userToken===undefined){
         this.panelShow=true;
       }else{

      axioIn.post('/api/trades/shopping_cat/',{
        good_id: '',
        goods_number: this.shopNum,
        m_good_id: item.id
      }).then(res=>{
          this.panelShow=false;
          this.ShopCount();
          alert('加入购物车成功！')
      })
       }

    },
    solve_case (item) {
      this.product_list.map(n=>{
        this.$set(n,'isActive',false)
      })
      this.$set(item,'isActive',true)
    },
    solve_leave (item) {
      this.product_list.map(n=>{
        this.$set(n,'isActive',false)
      })
    },
    clickT (index) {

      window.localStorage.ShopdetailId=index;
      this.setShopdetailId(index);
      Router.push({path:'/detailGoods'})
    },
    hidePanel(data){
       this.panelShow = false;
    },
  }
}
