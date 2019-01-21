import axioIn from '../../store/axioIn'
import Router from '../../router/index'
import Shade from '../shade/index';
import Login from '../Login/index'
import {
 	mapState,
	mapMutations,
	mapGetters,
} from 'vuex';

axioIn.defaults.headers['Content-Type'] = 'application/json';
export default {
  name: 'productShop',
  components:{Shade,Login},
  data () {
    return {
      panelShow: false,
      shop_cart: true,
      tag_list: [],
      produce_list: [],
      filterShow: false,
      filter_list: [],
      batch_list: [],
      shop_status: false,
      ccp:[{goods_name:22}],
      topX:'0',
      ci:false,
      shade: false,
      accountLogin: false,
      hintInfo: false,
      cc: '/api/trades/verifycode/',
      user:{username: '',password: '',check_code: ''},
      caption: 10
    }
  },
  created () {
    axioIn.get('/api/goods/screen_product/').then(res=>{
      this.tag_list = res.data.tag
      this.produce_list = res.data.produce;
      this.produce_list.map(n=>{
        this.$set(n,'active_spread',false);
        if(n.child_model!==undefined){
          n.cc=true;n.ccp='';
          n.child_model.map(m=>{
            m.ownactive = false;
          })
        }
        else{n.cc=false}
      })
    })
  },
  computed: {
       ...mapGetters(['userToken']),
  },
  methods: {
    ...mapMutations(['setShopdetailId']),

      hidePanel(data){
       this.panelShow = false;
    },
    ShopNum(){
    axioIn.get('/api/trades/number',{
         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    batchShop () {

      let arr = [];
      this.batch_list.map(n=>{
        arr.push(n.id)
      })
      if(arr.length===0){
          alert('请选择商品！');
          return;
      }
    if(this.userToken===undefined){
           this.panelShow=true;
      }else{
      axioIn.post('/api/trades/batch_add/',{
        id: arr
        }).then(res=>{
          alert('加入购物车成功！');
          this.close_batch();
          this.ShopNum();
      })
      }
    },
    more_mess (item) {
      if(item.show_more === 'auto'){
        this.$set(item,'show_more','42px');
      }else{
        this.$set(item,'show_more','auto')
      }
    },
    opt_product (n) {console.log('测试')
      //不添加重复的
      var tag = false
      let _this=this;
      if(this.shop_status){
        this.batch_list.map((m,index)=>{
          if(m.goods_name === n.goods_name){
            tag = true
          }
        })
        if(!tag){this.$set(n,'isActive',true);this.batch_list.push(n);}
      }else{
        //进入对应商品的详情页
        console.log(this);
        window.localStorage.ShopdetailId=n.id;
        _this.setShopdetailId(n.id);
        Router.push({path:'/detailProduct'})
      }
    },
    dele_mess (n) {
      n.isActive = false
      this.batch_list.map((m,index)=>{
        if(m.goods_name === n.goods_name){
          this.batch_list.splice(index,1)
        }
      })
    },
    add_shop () {
      this.batch_list = [];
      this.shop_cart = false;
      this.shop_status = true;//记录是否进入加入购物车的状态还是详情
    },
    close_batch () {
      this.batch_list.map(n=>{
        this.$set(n,'isActive',false)
      })
      this.batch_list = [];this.shop_status = false;this.shop_cart = true;
    },
    filter_sure () { //筛选数据
      let tag_str = ''
      this.filter_list.map(n=>{
          n.list.map(m=>{

            if(m.correct) {

          if(tag_str === ''){
            tag_str = '?tag_id='+m.id

          }else{
            tag_str += '&tag_id='+m.id




          }
            }



        })

      })

      if(tag_str===''){
        return;
      }
        axioIn.get('/api/goods/screen_product/'+tag_str).then(res=>{
        this.tag_list = res.data.tag;
        this.produce_list = res.data.produce;
      })

    },

    hit_tag (n,item,par) { // 点击标签时
      this.filterShow = true
      var a_tag = false
      var str = ''
      let  _that=this;
      if(item.choice){// 多选
        this.filter_list.map(i=>{
          if(i.model === item.label_category){
          a_tag = true;
          var b_tag = false;
            i.list.map(t=>{
              if(t.id===n.id){
                this.$set(t,'correct',true)

                b_tag = true
              }
            })

            if(!b_tag){
                this.$set(n,'correct',true)
                 i.list.push(n);
                }else{
                this.$set(n,'correct',false)


                }

            i.list.map(m=>{

             if(m.correct){

              if(str === ''){str = m.goods_tag}else{str += '、'+ m.goods_tag}
              }

            })

            if(str===''){
              this.filter_list.map((n,index)=>{
                if(n.model === i.model){
                  n.list.map(i=>{
                    i.correct = false
                  })
                  this.filter_list.splice(index,1)
                }
              })

            }
            i.group_put = str
          }
        })
        if(!a_tag){
          _that.$set(n,'correct',true);
          var a = {model: item.label_category,list: [n],group_put: n.goods_tag}
          _that.filter_list.push(a)
        }
      }else{ //单选
         this.tag_list[par].children.map(n=>{n.correct = false;})
         this.filter_list.map((i,index)=>{

          if(i.model === item.label_category){
            a_tag = true
            this.filter_list.splice(index,1)
            this.$set(n,'correct',true);
            var a = {model: item.label_category,list: [n],group_put: n.goods_tag}
            this.filter_list.push(a)
          }
        })
        if(!a_tag){
          this.$set(n,'correct',true);
          var a = {model: item.label_category,list: [n],group_put: n.goods_tag}
          this.filter_list.push(a)
        }

      }
    },
dele (model) {//console.log(model)
      this.filter_list.map((n,index)=>{
        if(n.model === model){
          n.list.map(i=>{
            i.correct = false
          })
          this.filter_list.splice(index,1)
        }
      })

      if(this.filter_list.length === 0){
        this.filterShow = false
      }
      this.filter_sure()
    },

    mokuai(index,index1,item,item1){
      this.ccp = item1.product;
      // this.ccp=this.produce_list[index].child_model[index1].product;
      // this.produce_list.map(n=>{n.active_spread = false})
      // item.active_spread = true
      item.child_model.map(m=>{
        m.ownactive = false;
      })
      // item.child_model[index1].ownactive = true;
      //this.ci=true;
      if(item.active_spread===true){this.$set(item,'active_spread',false);item.child_model[index1].ownactive = false;}
      else{
        this.produce_list.map(n=>{
          this.$set(n,'active_spread',false);
          if(n.child_model.length !== 0){
            n.child_model.map(m=>{m.ownactive = false;})
          }
        })
        this.$set(item,'active_spread',true);
        item.child_model[index1].ownactive = true;
      }
      if(this.ci===true){this.ci=false}
      else{this.ci=true;}
      // if(this.produce_list[index].product.length>4){this.topX=52*Math.floor(this.produce_list[index].product.length/5)}
    }

  },
    watch:{
    'panelShow':function(data,res){
     if(data){

     }else{
       if(window.localStorage.userInfo===undefined){

       }else{
          this.$store.state.LoginStatus=true;
       }
     }
    }
  },
}
