import Router from "../../router/index";
import axioIn from '../../store/axioIn';
import {
 	mapState,
	mapMutations,
	mapGetters,
} from 'vuex';
export default {
  name: 'shopMessage',
  data () {
    return {
      id_show: false,
      giveShow: false,
      industry_list: [],
      company_id: '',
      user_info: {customer_type: '',GSZZ: '',station_type: '',company_name: '',abbreviation: '',company_url: [{company_url: '',addShow: true,deleShow: false}],company_email: '',industry: '',service_area: '',cli_version: '1',},
      supportStaff: {sales: '',pre_sales: '',impl_cslt: '',oper_cslt: '',oper_supt: ''},
      order_info: {give_day: 0,order_year: '',order_mount: '',order_discount: ''},
      user: '',
      forbidden: false
    }
  },
    computed:{
    ...mapGetters(['ShopText'])
  },
  created () {
    axioIn.get('/api/trades/choice_user/').then(res=>{
      if(res){
        this.user = res.data.user_choice.toLowerCase()
        console.log(this.user)
        if(this.user === 'false'){//老用户
          this.user_info.customer_type = 1;this.id_show = true;
        }else{
          this.user_info.customer_type = 0;this.id_show = false;
        }
      }
    })
    // 所属行业
    axioIn.get('/api/trades/industry/').then(res=>{
      this.industry_list = res.data
    })
    // this.user = this.ShopText.user.toLocaleLowerCase()
    // if(this.user === 'true'){//新用户
    //   this.user_info.customer_type = 0;this.id_show = false;
    // }else{//老客户
    //   this.user_info.customer_type = 1;this.id_show = true;
    // }
    console.log(this.ShopText);
    this.order_info.order_year = this.ShopText.year;
    this.order_info.order_mount = this.ShopText.allNum;
    this.order_info.order_discount = this.ShopText.discount;
  },

  methods: {

    cutUser () {//切换新老客户的change事件
      if(this.user_info.customer_type == 0&&this.user === 'false'){
        alert('新用户需要购买标准版产品！');
        this.user_info.customer_type = 1;
        this.id_show = true;
        console.log(this.user_info.customer_type)
      }else if(this.user_info.customer_type == 0&&this.user === 'true'){
        this.id_show = false;
        console.log('可以修改为新客户')
      }else if(this.user_info.customer_type == 1){
        this.id_show = true;
      }
    },
    donateNum (ev) {//显示赠送天数输入框
      if(ev.altKey && ev.keyCode==81){
        console.log('组合键触发');
        this.giveShow = true;
			}
    },
    ShopNum(){
    axioIn.get('/api/trades/number',{
         }).then((res)=>{
           this.$store.state.Count=res.data;
           window.localStorage.Count=this.$store.state.Count;
         })
    },
    detection () {//,addShow: true,deleShow: false
      axioIn.get('/api/trades/user_info/?company_id='+this.company_id).then(res=>{
        // this.user_info = res.data[0];
        if(res.data.length>0){
          this.user_info = this.initialize(res.data[0]);
          this.forbidden = true;
          this.supportStaff = res.data[0].station_info;
          if(this.user_info.company_url.length!==0){
            this.user_info.company_url.map(n=>{n.addShow=false;n.deleShow=true;})
            this.user_info.company_url[0].addShow=true;this.user_info.company_url[0].deleShow=false;
          }else{this.user_info.company_url=[{company_url:'',addShow:true,deleShow:false}]}
          // if(this.user === 'true'){
          //   //新用户
          //   this.user_info.customer_type = 0;}
          // else{this.user_info.customer_type = 1;}
          this.user_info.customer_type = 1;
          this.order_info.order_year = this.ShopText.year;
          this.order_info.order_mount = this.ShopText.allNum;
          this.order_info.order_discount = this.ShopText.discount;
        }else if(res.data.length === 0){
          alert('输入的企业ID不存在');
        }
      })
    },
    add_url () {
      this.user_info.company_url.push({company_url: '',addShow: false,deleShow: true})
    },
    dele_url (index) {
      if(confirm('确定要删除吗？'))this.user_info.company_url.splice(index,1);
    },
    sub_info () {
      let a=/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
      if(a.test(this.user_info.company_email)){

      }else{
          alert('输入的邮箱格式有误')
          return;
      }
      for(var i=0;i<this.user_info.company_url.length;i++){
        if(this.user_info.company_url[i].company_url.length >50){
          alert('输入的网址长度不能大于50个字符');return
        }
      }

      let flag = false;
      for(var attr in this.user_info){
        if(this.user_info[attr] === ''||this.user_info[attr] === undefined){
          flag = true;
        }
      }
      if(flag){alert('必填项没有填写完整');return;}
      if(this.user === 'true'){
        this.user_info.order_info = this.order_info;
        this.user_info.supportStaff = this.supportStaff;
        this.user_info.company_id = null;
      }else{
        this.user_info.order_info = this.order_info;
        this.user_info.supportStaff = this.supportStaff;
        this.user_info.company_id = this.company_id;
      }
      axioIn.post('/api/order/create_order/',this.user_info).then(res=>{///api/order/create_order/
        this.ShopNum();
        Router.push({path:'/myOrder'})
      })
    },
    subtraction () {//赠送天数减号
      let reg = /^\d+$/;
      if(reg.test(this.order_info.give_day)&&parseFloat(this.order_info.give_day)>1){
        --this.order_info.give_day;
      }else{
        alert('天数有误');
      }
    },
    addition () {//赠送天数加号
      let reg = /^\d+$/;
      if(reg.test(this.order_info.give_day)&&parseFloat(this.order_info.give_day)>=0){
        ++this.order_info.give_day;
      }else{
        alert('天数有误');
      }
    },
    cancel_info () {
      Router.push({path:'/shopCar'})
      // Router.go(-1);
    },
    initialize (data) {
      // data.map(n=>{
        // data.company_id = data.station_info.company_id
        let obj = {};
        obj.GSZZ = data.company_info.GSZZ;
        obj.station_type = data.company_info.station_type;
        obj.company_name = data.company_info.company_name;
        obj.abbreviation = data.company_info.abbreviation;
        obj.company_url = data.company_info.company_url;
        obj.company_email = data.company_info.company_email;
        obj.service_area = data.company_info.service_area;
        obj.industry = data.company_info.industry;
        obj.cli_version = data.station_info.cli_version;
      // })
      return obj;
    }
  },

  watch:{

  }
}