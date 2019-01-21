import publicHead from '../../page/public_head.vue'
import axioIn from '../../store/axioIn.js'
import Login from '../Login/index'
import {
 	mapState,
	mapMutations,
	mapGetters,} from 'vuex';
axioIn.defaults.withCredenials=true;
export default {
  name: 'detail_goods',
  components: {publicHead,axioIn,Login},
  data () {
    return {
      HinChange: this.$store.state.LoginStatus,
      panelShow: false,
      productSet: true,
      isActive: true,
      bigshow:false,
      smallshow:false,
      bigX:0,
      bigY:0,
      imagE:'',
      smallX:'',
      smallY:'',
      goods:{m_goods_name:'AI分配',m_goods_brief_introduction:'111111',price:'1000',m_goods_tag:[{goods_tag:"行业二"}],put_price:'1000',m_in_goods:[{image:'xx'}],
      m_goods_details_edit:'<p>百度：百度&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>',m_su_goods:[{image:'xx'}],mputaway:{put_price:'33'},m_in_goods:[{image:'x'}]
      },
      shopNum: '1',
      shade: false,
      accountLogin: false,
      hintInfo: false,
      cc: '/api/trades/verifycode/',
      user:{username: '',password: '',check_code: ''}
    }
  },
  computed:{
    ...mapGetters(['ShopdetailId','userToken'])
  },
  mounted:function(){

    axioIn.get('/api/goods/detail_solution/'+this.ShopdetailId+'/')
        .then((res)=>{
          this.goods=res.data
          this.imagE=this.goods.m_in_goods[0].image
        })
  },
  methods: {
    hidePanel(data){
       this.panelShow = false;
    },
    ShopCount(){
    axioIn.get('/api/trades/number',{

         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    addTrolley () {     
   if(this.userToken===undefined){
          this.panelShow=true;
       }else{
      axioIn.post('/api/trades/shopping_cat/',{
        good_id: '',
        goods_number: this.shopNum,
        m_good_id: this.goods.id
      }).then(res=>{     
            this.panelShow=false;
            this.ShopCount();
            alert('加入购物车成功！')
      })
      }

    },
    forgetPass () {
      this.shade = true;this.accountLogin = false;this.hintInfo = true;
    },
 
   
    closeDia () {
      this.shade = false;this.accountLogin = false;this.hintInfo = false;
    },
    detail:function(){
      this.productSet = true;this.isActive = true;
    },
    success_case:function() {
      this.productSet = false;this.isActive = false;
    },
    bigOver:function(){this.bigshow=true;this.smallshow=true},
    bigOut:function(){this.bigshow=false;this.smallshow=false},
    bigMove:function(e){
      var bbox=document.getElementById('box')
      var bmove=document.getElementById('bmove')
      var b_bimg=document.getElementById('b_bimg')
      var bbimg=document.getElementById('bbimg')
      var x = e.clientX;//鼠标相对于视口的位置
      var y = e.clientY;
      var t = bbox.offsetTop;//box相对于视口的位置
      var l = bbox.offsetLeft;
      var _left = x - l - bmove.offsetWidth/2;//计算move的位置
      var _top = y - t -bmove.offsetHeight/2;
      if(_top<=0)//滑到box的最顶部
        _top = 0;
      else if(_top>=bbox.offsetHeight-bmove.offsetHeight)//滑到box的最底部
        _top = bbox.offsetHeight-bmove.offsetHeight ;
      if(_left<=0)//滑到box的最左边
        _left=0;
      else if(_left>=bbox.offsetWidth-bmove.offsetWidth)//滑到box的最右边
        _left=bbox.offsetWidth-bmove.offsetWidth ;
      this.bigY = _top +"px";//设置move的位置
      this.bigX = _left + "px";
      var w = _left/(bbox.offsetWidth-bmove.offsetWidth);//计算移动的比例
      var h = _top/(bbox.offsetHeight-bmove.offsetHeight);
      var b_bimg_top = (b_bimg.offsetHeight-bbimg.offsetHeight)*h;//计算大图的位置
      var b_bimg_left = (b_bimg.offsetWidth-bbimg.offsetWidth)*w;
      this.smallY = -b_bimg_top + "px";//设置大图的位置信息
      this.smallX = -b_bimg_left + "px";
       },
    showImg:function(index){
      this.imagE=this.goods.m_in_goods[index].image
    }
}
}