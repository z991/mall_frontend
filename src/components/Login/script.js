import axioIn from '../../store/axioIn'
import Shade from '../shade/index';
import {
 	mapState,
	mapMutations,
	mapGetters,
} from 'vuex';
export default {
  name: 'Login',
  components:{Shade},
  data () {
    return {
      shop_cart: true,
      tag_list: [],
      produce_list: [],
      filterShow: false,
      filter_list: [],
      batch_list: [],
      shop_status: false,
      ccp:[{goods_name:22}],
      topX:0,
      Loginshow:this.$store.state.LoginStatus,
      ci:false,
      shade: false,
      accountLogin: false,
      hintInfo: false,
      cc: '/api/trades/verifycode/',
      caption: 10,
      user:{username: '',password: '',check_code: ''},
    }
  },
  props:{
        panelShow: {
            type: false
        },
        hidePanel :{
            type: false
        },

    },

 computed: {
    ...mapMutations(['setUserInfo','setUserToken']),
  },
  methods:{

    closeDia () {
      this.shade = false;this.accountLogin = false;this.hintInfo = false;
    },
    forgetPass () {
      this.shade = true;this.accountLogin = false;this.hintInfo = true;
    },
    oncc () {
      this.cc='/api/trades/verifycode/?d='+Math.random();
    },
    Updown(keycode){
        if(keycode.key==='Enter'){
            this.login();
        }
    },
    //购物车数量
    ShopNum(){
           
      axioIn.get('/api/trades/number',{

         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    LoginDia(){
      //触发
     this.$emit('LoginDia', false)
     this.user={};
     
    },
    login:function(){
      let _self=this;
      let _Session=window.localStorage;
     if(this.user.username===''||this.user.password===''||this.user.check_code===''){alert('请完善登录信息')}
      else{//,{headers:{'Expect':'100-continue'}}
        axioIn.post('/api/trades/login/',this.user).then((response)=>{
          if(response.status==200){
            //登录成功触发父组件LoginDia方法
            _self.$emit('LoginDia', false)
            _Session.userInfo=_self.user.username;
            _Session.Stoken=response.data.token;
            _self.$store.state.LoginStatus='N'
            console.log(this);
            //vueX存储 用户登录后的状态
            _self.setUserInfo(_Session.userInfo);
            _self.setUserToken(response.data.token)
            _self.shade = false;
            _self.accountLogin = false;
            _self.hintInfo = false;
     
           _self.ShopNum();
         
          }
          }).catch((err)=>{
            if(err.status==417){alert('验证码 输入错误')}
            else if(err.status==401){alert('账号或密码输入错误')}
            _self.oncc()
          });
        }
    },
  },

computed: {
    //计算用户登录状态
  StatusType() {
    
    return this.$store.state.LoginStatus;
  }
},
watch: {
  //监听用户登录状态||获取登录状态
  StatusType(val) {
    if(val==='Y'){
       //退出登录后存储用户信息清除
       this.user={}  
       window.localStorage.removeItem("name");
       window.localStorage.removeItem("userInfo");
       window.localStorage.removeItem("Stoken");
       this.oncc();
    };
    if(val==='N'){
         //登录后存储的商品数量显示
        this.ShopNum();
        this.oncc();
    }}}}