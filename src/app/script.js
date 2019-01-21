import {
    mapGetters,
    mapMutations
} from 'vuex';
import Router from '../router';
export default {
    name: 'App',
    data(){
      return{
      }
    },
  
   methods:{
  
  
    },
    beforeMount() {
        
     


    },
   computed:{
        ...mapGetters(['userToken']),
      'History':function(){
        return this.$route.fullPath;
      } ,
      
  
    },
    watch:{
      History:function(res){
        if(window.localStorage.Stoken===undefined){
          console.log(res);
          if(res==='/'||res==='/productShop'||res==='/industry'||res==='/detailGoods'||res==='/detailProduct'){
                
          }else{
          alert("请登录")
            return;  
            
            
          }
        }
          
      },
 
    }
    
   
  }


 


