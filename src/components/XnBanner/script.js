import axioIn from '../../store/axioIn';
axioIn.defaults.withCredenials=true;
export default {
  name: 'XnBanner',
  data () {
    return {
         RouterType:false,
         slideList: [

    ],
    currentIndex: 0,
    timer: ''
    }
  },
  beforeMount(){
     this.getData();

  },
  created() {
    //刚加载时，判断Router
    if(window.location.hash==='#/'){
     this.RouterType=true;

    }
    //在DOM加载完成后，下个tick中开始轮播
     this.$nextTick(() => {
         this.timer = setInterval(() => {
             this.autoPlay()
        }, 2000)
    })
},
methods:{
  //轮播定时器
  getData(){
  axioIn.get("/api/goods/ad_slide_show/").then(res=>{
    this.slideList=res.data;
  })
},
go() {
    this.timer = setInterval(() => {
        this.autoPlay()
    }, 2000)
},
  //停止轮播
stop() {
    clearInterval(this.timer)
    this.timer = null
},
  //图片脚标
change(index) {
    this.currentIndex = index
},
 //判断图片的脚标 超过返回0
autoPlay() {
    this.currentIndex++
    if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0
    }
}
},
computed:{
  //计算属性组件判断 route
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