export default {
  name:'XnFooter',
  data(){
      return{
         RouterType:false,

      }
  },
   created() {
    //刚加载时，判断Router
    if(window.location.hash==='#/'){
     this.RouterType=true;

    }
    },

  computed:{
  //计算属性组件判断
  RouterStatus(){
    return this.$route
  }
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