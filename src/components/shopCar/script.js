import Router from "../../router/index";
import axioIn from '../../store/axioIn';
import {
 	mapState,
	mapMutations,
	mapGetters,
} from 'vuex';
axioIn.defaults.withCredenials=true;
export default {
  name:'shopCar',
  components:{axioIn},
  data () {
    return {
      aa: '',
      countYear:[],
      countadd:0,
      countdel:0,
      ShopAdd:'Y',
      ShopDel:'N',
      orderList: [],
      percentum: {goods_number: 100},
      ageLimit: {goods_number: 1},
      caseNum: 0,
      totalPrice: 0,
      HisTory:false,
    }
  },
   beforeRouteLeave (to, from, next) {
     next();
     if(this.HisTory){
      console.log(from)

      if(to.path === '/shopMessage'){
        next({path:`/productShop`});
      }
    // if(to.path !== '/productShop' ||to.path !== '/industry'){
    //     next({path:`/productShop`});
    // }
    }
  },
  directives: {
       numberOnly: {
            bind: function(el,bindings) {

            },
          　update:function(el,bindings,old){
            var formatVal = /^\+?[1-9][0-9]*$/;
            var val = bindings.value;
            if(!formatVal.test(val)){
              var reg = new RegExp(val,'g');
              old.context.percentum.goods_number= val.replace(reg, '');
            }
            if(bindings.value>100){
            old.context.percentum.goods_number=100;
            }
          },
       },
          numberNum: {
            bind: function(el,bindings) {

            },
          　update:function(el,bindings,old){
            var formatVal = /^\+?[1-9][0-9]*$/;
            var val = bindings.value;
            if(!formatVal.test(val)){
              var reg = new RegExp(val,'g');
              old.context.ageLimit.goods_number= val.replace(reg, '');
            }
            if(bindings.value>100){
            old.context.ageLimit.goods_number=100;
            }
          },
       },
    },
  created () {
  
    
    console.log(this.ShopText)
      if(this.ShopText.year!==''||this.ShopText.discount!==''||this.ShopText.allNum!==''){
      this.ageLimit.goods_number = this.ShopText.year;
      this.percentum.goods_number = this.ShopText.discount;
      this.totalPrice=this.ShopText.allNum
        }
       this.ShopShow();
  },
  computed: {
    StatusType() {
      return this.$store.state.LoginStatus;
    },
    
    ...mapGetters(['ShopText'])
  },
  methods: {
     ...mapMutations(['setShopdetailId','setShopText']),
    ShopShow(){
      axioIn.get('/api/trades/cart_list/').then(res=>{

    
        this.orderList=[];
        this.orderList = this.initialize(res.data);
        this.orderList.map(n=>{
          if(n.goods_price === '1.00'){//当购买限制数量为1时，input为不可输入状态
            this.$set(n,'active',true)
          }else{
            this.$set(n,'active',false)
          }
          let total = Number((n.goods_number * n.price).toString().match(/^\d+(?:\.\d{0,2})?/))
          this.$set(n,'figure',total);
          this.caseNum += parseFloat(n.goods_number);
          this.totalPrice = Number(n.figure.toString().match(/^\d+(?:\.\d{0,2})?/));
          this.totalPrice = parseFloat(this.totalPrice) * parseFloat(this.percentum.goods_number) * 0.01 * parseFloat(this.ageLimit.goods_number)
          this.totalPrice = Number(this.totalPrice.toString().match(/^\d+(?:\.\d{0,2})?/));
       
        })
    
 
    })
    },
    totalSum () {
      //计算折扣后的价格
      this.caseNum = 0;this.totalPrice = 0;
      this.orderList.map(n=>{
        let total = Number((n.goods_number * n.price).toString().match(/^\d+(?:\.\d{0,2})?/))
        this.$set(n,'figure',total);
        this.caseNum += parseFloat(n.goods_number);
        this.totalPrice += Number(n.figure.toString().match(/^\d+(?:\.\d{0,2})?/));
      })
      this.totalPrice = parseFloat(this.totalPrice) * parseFloat(this.percentum.goods_number) * 0.01 * parseFloat(this.ageLimit.goods_number)
      this.totalPrice = Number(this.totalPrice.toString().match(/^\d+(?:\.\d{0,2})?/));
    },
    ShopNum(){
    axioIn.get('/api/trades/number',{
         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    initialize (data) {
      data.map(n=>{
        n.goods = n.goods || n.m_goods;
        n.goods_price = n.goods_price || '1.00';
        n.goods_id = n.goods_id || n.m_goods_id;
        n.goods_number = n.goods_number || 1;
        n.price = n.price || n.m_put_price;
        n.goods_model = n.goods_model || n.m_goods_model;
      })
      return data;
    },
    delete_order (item) {
      if(item.m_goods !== null){
        if(confirm('确定删除该产品吗？')){
          axioIn.get('/api/trades/shopping_cat_del/?m_goods_id='+item.goods_id).then(res=>{
            axioIn.get('/api/trades/cart_list/').then(res=>{
              this.caseNum = 0;this.totalPrice = 0;
              this.orderList = this.initialize(res.data);
              this.ShopNum();
              this.orderList.map(n=>{
                if(n.goods_price === '1.00'){
                  this.$set(n,'active',true)
                }else{
                  this.$set(n,'active',false)
                }
                let total = n.goods_number * n.price
                this.$set(n,'figure',total);
                this.caseNum += parseFloat(n.goods_number);
                this.totalPrice += Number(n.figure.toString().match(/^\d+(?:\.\d{0,2})?/));
                this.totalPrice = parseFloat(this.totalPrice) * parseFloat(this.percentum.goods_number) * 0.01 * parseFloat(this.ageLimit.goods_number)
                this.totalPrice = Number(this.totalPrice.toString().match(/^\d+(?:\.\d{0,2})?/));
                // this.totalPrice.toFixed(2)
              })
              this.aa = this.$store.state.search;// 购物车数量测试
            })
          })
        }
      }else{
        if(confirm('确定删除该产品？')){
          axioIn.get('/api/trades/shopping_cat_del/?goods_id='+item.goods_id).then(res=>{
            axioIn.get('/api/trades/cart_list/').then(res=>{
              this.ShopNum();

              this.caseNum = 0;this.totalPrice = 0;
              this.orderList = this.initialize(res.data);
              this.orderList.map(n=>{
                if(n.goods_price === '1.00'){
                  this.$set(n,'active',true)
                }else{
                  this.$set(n,'active',false)
                }
                let total = n.goods_number * n.price
                this.$set(n,'figure',total);
                this.caseNum += parseFloat(n.goods_number);
                this.totalPrice += Number(n.figure.toString().match(/^\d+(?:\.\d{0,2})?/));
                // this.totalPrice.toFixed(2)
              })
              this.totalPrice = parseFloat(this.totalPrice) * parseFloat(this.percentum.goods_number) * 0.01 * parseFloat(this.ageLimit.goods_number)
              this.totalPrice = Number(this.totalPrice.toString().match(/^\d+(?:\.\d{0,2})?/));
            })
          })
        }
      }
    },
    detail_order (item) {
      if(item.m_goods===null){
        window.localStorage.ShopdetailId=item.goods_id;
        this.setShopdetailId(item.goods_id);
        Router.push({path:'/detailProduct'})
      }else{
        window.localStorage.ShopdetailId=item.goods_id;
        this.setShopdetailId(item.goods_id);
        Router.push({path:'/detailGoods'})
      }
    },
    clearShop () {
      // 清空购物车等数据
      let a=confirm("确定清空购物车？")
      if(a){
      axioIn.get('api/trades/delete_cart').then(res=>{
        this.orderList = [];
        this.ShopNum();
        this.caseNum = 0;
        this.totalPrice = 0;
        this.ageLimit.goods_number = 1
        this.percentum.goods_number = 100; 
      })
      }
   
    },
    subtraction (item,range,type) {
      if(item.active){
        return;
      }
      let that=this;
      let reg = /^\d+$/;
      if(reg.test(item.goods_number)&&parseFloat(item.goods_number)>1){
        item.goods_number = parseFloat(item.goods_number) - range;
        this.totalSum()
        // item.figure = parseFloat(item.goods_number) * parseFloat(item.price)
      }
    },
    addition (item,range,max) {
      if(item.active){
        return;
      }
      if(parseInt(item.goods_number) >= parseInt(item.goods_price)){
        alert('已经到达最大购买数量了！');return
      }
      //对最大数量的限制
      let reg = /^\d+$/;
      if(max !== undefined){
        if(reg.test(item.goods_number)&&item.goods_number>=max){
          alert('限制最大为：'+max);return
        }
      }
      if(reg.test(item.goods_number)&&parseFloat(item.goods_number)>0){


        item.goods_number = parseFloat(item.goods_number) + range;
        this.totalSum()
      }
    },
    settleNum () {
      if(this.orderList.length === 0){
        alert('购物车为空，请先添加商品');return;
      }
      let arr = []
      console.log(this.orderList)
      this.orderList.map(n=>{
        let obj = {};
        if(n.goods_model === '行业解决方案'){
          obj.sku = 1;
        }else{
          obj.sku = 0;
        }
        obj.id = n.goods_id;obj.number = n.goods_number;
        arr.push(obj)
      })
      axioIn.post('/api/trades/update/',{
        goods: arr
      }).then(res=>{
        console.log(res)
      })

      let ShopCar={
        discount:this.percentum.goods_number,
        year:this.ageLimit.goods_number,
        allNum:this.totalPrice
      }
      this.setShopText(ShopCar);
      Router.push({path:'/shopMessage'})

      //判断是新老客户的
      // axioIn.get('/api/trades/choice_user/').then(res=>{
      //   //true为新客户
      //   //跳转到信息确认页面,携带着，新老客户，折扣，全额，年限
      //   Router.push({path:'/shopMessage',query:{user: res.data.user_choice,discount:this.percentum.goods_number,year: this.ageLimit.goods_number,allNum: this.totalPrice}})
      // })
    },
    browse () {
      Router.go(-1);
      this.HisTory=true;
      // console.log(windows.history)
      // Router.push('/productShop')
    }
  },

  watch: {
    StatusType(val) {
      if(val==='Y'){
        console.log('我已经退出登录')
        this.$store.state.Count=0;
        this.ShopShow();
      };
      if(val==='N'){
        console.log('我登录了')
        this.ShopShow();
      }
    }
  }
}