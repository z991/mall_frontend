import Router from '../../router/index'
import axioIn from '../../store/axioIn'
import {
   mapState,
   mapMutations,
   mapGetters,
} from 'vuex';
export default {
    name:'my_detail',
    components:{axioIn,Router},
    data:function(){
        return {
            order:{order_sn:'dd',state:'ddddd',order_year:'2',order_discount:'20%',order_mount:'2',price:'233',
            order_cp:[{goods_name:'33',model_name:'wee',goods_num:'3',put_price:'12'}]},
            detail:{order_discount:'',
                company_info:{
                    station_type:'2',company_name:'2',company_url:[{company_url: 'www.baidu.com'}],company_address:'2',
                    industry:'2',service_area:'2',abbreviation:'2',company_email:'2',GSZZ:'2',customer_type:'2',
                },
                station_info:{deploy_way:'1',cli_version:'2',ale:'3',oper_supt:'4'}
            },
            order_zt:[{order_status:'3'},{order_status:'3'},{order_status:'3'},{order_status:'3'}],
        }
    },
    computed: {    
        ...mapGetters(['ShopdetailId'])
      },
    mounted:function(){
        axioIn.get('/api/order/detail_order/'+this.ShopdetailId+'/')///api/order/detail_order/
            .then((res)=>{
                // console.log(res.data);

                // console.log(res.order_year)
            //   console.log(parseInt(res.give_day) + parseInt(res.order_year)*365);
              this.order=res.data;
              this.detail=res.data.open_order;
              this.detail.company_info.company_address=this.detail.company_info.company_address.province+
              this.detail.company_info.company_address.city+this.detail.company_info.company_address.detail
            //   this.detail.station_info.ale=(new Date(this.detail.station_info.close_station_time)-new Date(this.detail.station_info.open_station_time))/1000/60/60/24
              this.detail.station_info.ale=res.data.give_day +res.data.order_year*365
              this.order_zt=res.data.order_zt;
                let num = 0;
                this.order.order_cp.map(m=>{
                  num += parseInt(m.goods_num)
                })
                this.$set(this.order,'order_number',num)
                // this.order=res.data;
                // this.detail=res.data.open_order;
                // this.detail.company_info.company_address=this.detail.company_info.company_address.province+
                // this.detail.company_info.company_address.city+this.detail.company_info.company_address.detail
                // this.detail.station_info.ale=new Date(this.detail.station_info.open_station_time)-new Date(this.detail.station_info.close_station_time)+1
                // this.order_zt=res.data.order_zt;
            })
    },
}