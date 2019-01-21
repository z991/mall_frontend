<template>
  <div class="public_head" @Axios-Status="GotFnt">
         <Login    v-show="panelShow" :panelShow="LoginType" @LoginDia=hidePanel ></Login>
    <div class="headFile clear">
      <div class="headLogo fl"><img src="../assets/logo.png" alt=""></div>
      <div class="headMenu fl">
        <ul class="head_title fl" v-if="!this.LoginOutTypes">
          <li v-for="(item,index) in menuBar"  :key="index" class="fl"   @click='switch_menu(item)'>
            <router-link :to="item.link" exact v-if="index<=2">{{item.name}}</router-link>
          </li>
        </ul>
        <ul class="head_title fl" v-if="this.LoginOutTypes">
          <li v-for="(item,index) in menuBar"  :key="index" class="fl"   @click='switch_menu(item)'>
            <router-link :to="item.link" exact >{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <div class="headRight fr">
        <div class="headSearch fl"><input type="text"/><img src="../assets/cha1.png" alt=""></div>
        <div class="headMessage fl" @click="LoginType">
          <p class="head_pro"><img  :src="LoginOut_UrlT" ref="LoginImg" alt=""></p>
          <p>{{UserName}}</p>
        </div>
        <div class="head_shop fl" @click="shopShow">
          <img src="../assets/shop.png" alt=""  />
          <span>{{this.$store.state.Count}}</span>

        </div>
         <div style="width:57px;" class="LoginOut fl" v-if="LoginOutTypes">
            <a href="javascript:void(0)" :class={LoginOut_box_t:LoginOutText} class="LoginOut_box" @click="LoginOut" @mousemove="LoginOutFN" @mouseout="LoginOutFD">
            <span class="loginOut_tittle" v-show="LoginOutText">退出</span>
             <img src="../assets/LoginOut_Img.png"  style="border:none;" class="loginOut_img">
        </a>
        </div>
      </div>

    </div>
    <XnBanner></XnBanner>
    <XnMain></XnMain>
    <XnFooter></XnFooter>
    <router-view ></router-view>

  </div>

</template>
<script>
import Login from '../components/Login/index'
import Router from '../router/index'
import axioIn from '../store/axioIn.js'
import XnBanner from '../components/XnBanner/index'
import XnMain from '../components/XnMain/index'
import XnFooter from '../components/XnFooter/index'
import {
 	mapState,
	mapMutations,
	mapGetters,
} from 'vuex';
export default {
  name: 'public_head',
  components:{axioIn,Login,XnBanner,XnFooter,XnMain},
  data () {
    return {
      LoginOutTypes:false,
      UserName: '请登录',
       
      LoginOutText:false,
      HinChange: this.$store.state.LoginStatus,
      panelShow: false,
      RouterType:false,
      //登录Img
      LoginOut_Url:require("@/assets/head.png"),
      //登出Img
      LoginOut_UrlT:require("@/assets/LoginOut_Url.png"),
      OUtiMG:require("@/assets/LoginOut_Url.png"),
      menuBar: [{name: '首页', link: '/', isActive: true}, {name: '产品', link: '/productShop', isActive: false}, {name: '行业解决方案', link: '/industry', isActive: false}, {name: '我的订单', link: '/myOrder', isActive: false}]
    }
  },
  created () {
    let that=this;

    if(window.localStorage.userInfo===undefined){
      this.LoginOut_UrlT=this.OUtiMG;
      this.UserName='请登录';
    }else{
      this.LoginOut_UrlT=this.LoginOut_Url;
      this.UserName=window.localStorage.userInfo;
      this.LoginOutTypes=true;
    }

    this.aa = window.localStorage.Count;
    this.ShopNum();
  },
computed: {
   LoginFt(){
        return this.$store.state.LoginStatus;
    },

    ShopCount(){
        return this.$store.state.Count;

    },
    ...mapGetters(['userInfo','userToken']),
},
  methods: {
    GotFnt(data){
        alert(data);
    },
    switch_menu(item) {
        },
    hidePanel(data){
       this.panelShow = false;
    },
  LoginOutFN(){
      this.LoginOutText=true;
    },
  LoginOutFD(){
      this.LoginOutText=false;

  },
   ClearUser(data){
      console.log(data);
   },
           ShopNum(){
    axioIn.get('/api/trades/number',{

         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    LoginType(data){
      console.log(this);
      let _self=this;
      let _Session=window.localStorage.userInfo;
      if(_Session===undefined){

         console.log(_self.$store.state.user);
        _self.panelShow=true;
      }else{
       _self.panelShow=false;
      }
    },
    shopShow () {
    if(window.localStorage.userInfo===undefined){
      alert('请登录')
     
    }else{
      Router.push({path:'/shopCar'})
    }
    },

    //登出方法
    LoginOut(){

      let _self=this;
      axioIn.get('/api/trades/logout/').then(res=>{
        if(res){
        this.$store.state.LoginStatus='Y';
        _self.LoginOutTypes=false;
        //清除掉用户登录信息
       window.localStorage.removeItem("ShopdetailId");
       window.localStorage.removeItem("Stoken");
       window.localStorage.removeItem("userInfo");
       _self.$store.state.Count=0;
        _self.LoginOut_UrlT=require("@/assets/LoginOut_Url.png")
        _self.UserName='请登录';
          if(_self.$router.history.current.path==='/myOrder' || _self.$router.history.current.path==='/shopCar' ){
          _self.$router.push('productShop')
    }
          }

      })
    },
  },
  watch:{
    'panelShow':function(data,res){
     if(data){

     }else{
       if(window.localStorage.userInfo===undefined){

       }else{
         this.LoginOutTypes=true;
         this.LoginOut_UrlT=this.LoginOut_Url;
         this.UserName=window.localStorage.userInfo;
       }
     }
    },
    LoginFt(data){
         if(data==='N'){
         this.LoginOut_UrlT=this.LoginOut_Url;
         this.UserName=window.localStorage.userInfo;
         this.LoginOutTypes=true;
         }
    },
    ShopCount(data){
        this.aa=data;
    },
  },
}
</script>
<style scoped lang='scss' >
@import '../assets/home';
.public_head{
  .headFile{width:100%;height:90px;line-height: 90px;background:url(../assets/bgphoto.png) no-repeat;background-size:cover;font-size:16px;
  .headLogo{margin-left:120px;margin-right:68px;img{vertical-align: middle;}}
  .headRight{margin-right:110px;}}
  .head_title{color:#95cce2;line-height:1;
  // .router-link-active{color:red;}
  .router-link-active{color:#fff;}
  .router-link-active:after{
    content: '';display:block;position:absolute;left:0;right:0;width:30px;height:6px;background: #fff;border-radius:5px;margin:auto;margin-top:5px;}
  span{display: inline-block;width:30px;height:5px;}
  li{margin:0 36px;margin-top:30px;position:relative;a{color:#95cce2;}}}
  .headSearch{position: relative;img{position: absolute;top:38px;right:14px;}input{width:196px;height:30px;border:none;outline:none;background:rgba(77,88,93,0.2);padding:0 36px 0 8px;color:#fff;border-radius:10px;}}
  .headMessage{margin:0 26px;line-height:1;color:#fff;.head_pro{height:44px;border-radius:50%;margin-top:10px;margin-bottom:5px;}}
  .head_shop{position:relative;cursor:pointer;span{display: inline-block;position:absolute;top:13px;right:0px;
  width:20px;height:20px;line-height:20px;background:red;border-radius:50%;text-align:center;color:#fff;}}
  .LoginOut{position: relative;
  top:5px;
  
  left:28px;width:57px;
  .LoginOut_box_t{

    display: block;background: url("../assets/LoginOut_Tittle.png")no-repeat 7px 0px;background-size: 40px 25px;text-align: center;
  .loginOut_tittle{ color:#fff;position: relative;left:15px;top:-35px;font-size: 12px;}
  .loginOut_img{ position: relative; top:4px;left:-15px;} }}
}
</style>
