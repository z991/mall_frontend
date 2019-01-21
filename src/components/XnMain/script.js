import {
  mapState,
 mapMutations,
 mapGetters,
} from 'vuex';
import axioIn from '../../store/axioIn'
import Router from '../../router/index'
import Login from '../Login/index'
axioIn.defaults.withCredenials=true;

export default {
 name:'XnMain',
 components:{Login,axioIn},
 data () {
   return {
        shopNum: 1,
        RouterType:false,
        product_list:[],
        product_Cplist:[],
        HinChange: this.$store.state.LoginStatus,
        panelShow: false,
   }
 },
 created() {
   //刚加载时，判断Router
   this.getData();
   
   if(window.location.hash==='#/'){
    this.RouterType=true;
   }
    
 },
 
 mounted () {
// 读

},
  computed:{
 //计算属性组件判断 route
 RouterStatus(){
   return this.$route
 },
  ...mapGetters(['userToken'])
 
},
 methods: {
   ...mapMutations(['setShopdetailId']),        
     getData(){
      axioIn.get('/api/goods/home_produce/').then(res=>{
     this.product_list = res.data.multiple;
     this.product_Cplist=res.data.single;

   })
     },

     HyMore(){
         this.$router.push('/industry')
     },
     CpMore(){
         this.$router.push('/productShop')
     },
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
     addTrolleyTwo (item) {
     if(this.userToken===undefined){
         this.panelShow=true;
      }else{
     axioIn.post('/api/trades/shopping_cat/',{
       good_id: item.id,
       goods_number: this.shopNum,
       m_good_id:''
     }).then(res=>{
         this.panelShow=false;
         this.ShopCount();
         alert('加入购物车成功！')
     })}
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
   clickL (index) {
     window.localStorage.ShopdetailId=index;
     this.setShopdetailId(index);
     Router.push({path:'/detailProduct'})
   },

   hidePanel(data){
      this.panelShow = false;
   },
 
 },

watch:{
 //监听Router的变化  
   RouterStatus(res){
     if(res.fullPath==="/"){
       this.RouterType=true;
     }else{
       this.RouterType=false;
     }
     

   }
}
}