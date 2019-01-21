<template>
    <div class="my_detail">
        <p>您的位置:<span>我的订单</span>><span>订单详情页面</span></p>
        <div style='height:150px;'>
            <span class='defl'>
                <span class='dei' :class='{dep3:order_zt[0]!==undefined,dep2:order_zt[0]===undefined}'><i class='yan'>1</i></span>
                <span :class='{ded:order_zt[0]!==undefined,ded2:order_zt[0]===undefined}' class='desp'>提交订单</span>
                <!-- <span class='desp ded1' v-if='order_zt[0]!==undefined'>经办人：{{order_zt[0].responsible_person}}</span> -->
                <span class='desp ded1' v-if='order_zt[0]!==undefined'>{{order_zt[0].order_date}}</span>
            </span>
            <span class='defl'>
                <span class='dei' :class='{dep3:order_zt[0]!==undefined,dep2:order_zt[0]===undefined,dep1:order_zt[0]!==undefined,dep:order_zt[0]===undefined,de2:order_zt[0]!==undefined,de2y:order_zt[0]===undefined}'>
                    <i class='yan'>2</i></span>
                <span class='desp' :class='{ded:order_zt[0]!==undefined,ded2:order_zt[0]===undefined}'>财务审核</span>
                <!-- <span class='desp ded1' v-if='order_zt[0]!==undefined'>经办人：{{order_zt[0].responsible_person}}</span> -->
                <span class='desp ded1' v-if='order_zt[0]!==undefined'>{{order_zt[0].order_date}}</span>
            </span>
            <span class='defl'>
                <span class='dei' :class='{dep3:order_zt[1]!==undefined,dep2:order_zt[1]===undefined,dep1:order_zt[1]!==undefined,dep:order_zt[1]===undefined,de2:order_zt[1]!==undefined,de2y:order_zt[1]===undefined}'>
                    <i class='yan'>3</i></span>
                <span class='desp' :class='{ded:order_zt[1]!==undefined,ded2:order_zt[1]===undefined}'>开站中</span>
                <!-- <span class='desp ded1' v-if='order_zt[1]!==undefined'>经办人：{{order_zt[1].responsible_person}}</span> -->
                <span class='desp ded1' v-if='order_zt[1]!==undefined'>{{order_zt[1].order_date}}</span>
            </span>
            <span class='defl'>
                <span class='dei' :class='{dep3:order_zt[2]!==undefined,dep2:order_zt[2]===undefined,dep1:order_zt[2]!==undefined,dep:order_zt[2]===undefined,de2:order_zt[2]!==undefined,de2y:order_zt[2]===undefined}'>
                    <i class='yan'>4</i></span>
                <span class='desp' :class='{ded:order_zt[2]!==undefined,ded2:order_zt[2]===undefined}'>实施中</span>
                <!-- <span class='desp ded1' v-if='order_zt[2]!==undefined'>经办人：{{order_zt[2].responsible_person}}</span> -->
                <span class='desp ded1' v-if='order_zt[2]!==undefined'>{{order_zt[2].order_date}}</span>
            </span>
            <!-- <span class='defl'>
                <span class='dei' :class='{dep3:order_zt[4]!==undefined,dep2:order_zt[4]===undefined,dep1:order_zt[4]!==undefined,dep:order_zt[4]===undefined,de2:order_zt[4]!==undefined,de2y:order_zt[4]===undefined}'>
                    <i class='yan'>5</i></span>
                <span class='desp' :class='{ded:order_zt[4]!==undefined,ded2:order_zt[4]===undefined}'>运维中</span>
                <span class='desp ded1' v-if='order_zt[4]!==undefined'>经办人：{{order_zt[4].order_operator}}</span>
                <span class='desp ded1' v-if='order_zt[4]!==undefined'>{{order_zt[4].order_date}}</span>
            </span> -->
            <span class='defl'>
                <span class='dei de3' :class='{dep1:order_zt[3]!==undefined,dep:order_zt[3]===undefined,de3:order_zt[3]!==undefined,de3y:order_zt[3]===undefined}'>
                    <i class='yan'>6</i></span>
                <span class='desp' :class='{ded:order_zt[3]!==undefined,ded2:order_zt[3]===undefined}'>交易成功</span>
                <!-- <span class='desp ded1' v-if='order_zt[3]!==undefined'>经办人：{{order_zt[3].responsible_person}}</span> -->
                <span class='desp ded1' v-if='order_zt[3]!==undefined'>{{order_zt[3].order_date}}</span>
            </span>
        </div>

        <ul>
            <li >
                <p class='listp'>
                    <span class='list_le'>订单编号:{{order.order_sn}}</span>
                    <!--a href="javascript:void(0)" class='blue list_right' @click="detail1(order.id)">订单详情</a>
                    <span class='yellow list_right'>{{order.state}}</span-->
                </p>
                <div style='border:1px solid #eee;'>
                    <ul class='order_li'>
                        <li >
                            <p class='lie'>
                                <span class='gray'>产品名称</span>
                                <span class='gray'>类别</span>
                                <span class='gray'>数量</span>
                                <span class='gray'>单价</span>
                                <span class='gray'>金额</span>
                            </p>
                        </li>
                        <li v-for='item in order.order_cp' :key='item.id' class='lie'>
                            <span>{{item.goods_name}}</span>
                            <span class='gray'>{{item.model_name}}</span>
                            <span class='gray'>{{item.goods_num}}</span>
                            <span>{{item.put_price}}</span>
                            <span class='blue'>{{item.put_price*item.goods_num}}</span>
                        </li>
                    </ul>
                    <div class='order_gou'>
                        <span>购买年限:{{order.order_year}}</span>
                        <span>折扣:{{order.order_discount}}</span>
                        <p ><span>共{{order.order_number}}件商品</span>
                           <span>合计金额:{{order.order_mount}}元</span></p>
                    </div>
                    <div class='clear'></div>
                </div>
            </li>
        </ul>
        <div>
            <p class='pd'>订单状况</p>
            <ul class='detail_li'>
                <p class='pdi'>客户信息</p>
                <li><label>客户性质</label><span>{{detail.company_info.customer_type}}</span></li>
                <li><label>站点类型</label><span>{{detail.company_info.station_type}}</span></li>
                <li><label>公司名称</label><span>{{detail.company_info.company_name}}</span></li>
                <li><label>公司简称</label><span>{{detail.company_info.abbreviation}}</span></li>
                <li><label>公司地址</label><span>{{detail.company_info.company_address}}</span></li>
                <li><label>公司网址</label><span>{{detail.company_info.company_url[0].company_url}}</span></li>
                <li><label>公司邮箱</label><span>{{detail.company_info.company_email}}</span></li>
                <li><label>所属行业</label><span>{{detail.company_info.industry}}</span></li>
                <li><label>营业执照名称</label><span>{{detail.company_info.GSZZ}}</span></li>
                <li><label>客服服务区域</label><span>{{detail.company_info.service_area}}</span></li>
            </ul>
            <ul  class='detail_li'>
                <p class='pdi'>站点信息</p>
                <li><label>部署方式</label><span>{{detail.station_info.deploy_way}}</span></li><li><label>有效日期</label><span>{{detail.station_info.ale}}天</span></li>
                <li><label>客户版本</label><span>{{detail.station_info.cli_version}}</span></li><li><label>折扣</label><span>{{order.order_discount}}</span></li>
            </ul>
            <ul  class='detail_li'>
                <p class='pdi'>支持人员</p>
                <li><label>销售人员</label><span>{{detail.station_info.sales}}</span></li>
                <li><label>售前人员</label><span>{{detail.station_info.pre_sales}}</span></li>
                <li><label>运营顾问</label><span>{{detail.station_info.oper_cslt}}</span>
                <li><label>运营支持</label><span>{{detail.station_info.oper_supt}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
