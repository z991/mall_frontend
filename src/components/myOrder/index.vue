<template>
    <div class="myOrder">
        <ul>
            <li v-for='ite in order' :key='ite.id' class='orli'>
         <p class='listp'>
                    <span class='list_le'>订单编号:{{ite.order_sn}}</span>
                    <a href="javascript:void(0)" class='blue list_right' @click="detail1(ite.id)">订单详情</a>
                    <span class='yellow list_right'>{{ite.order_status}}</span>
                    <span class="definite">下单时间：{{ite.add_time}}</span>
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
                        <li v-for='item in ite.order_cp' :key='item.id' class='lie'>
                            <span>{{item.goods_name}}</span>
                            <span class='gray'>{{item.model_name}}</span>
                            <span class='gray'>{{item.goods_num}}</span>
                            <span>{{item.put_price}}</span>
                            <span class='blue'>{{item.put_price*item.goods_num}}</span>
                        </li>
                    </ul>
                    <div class='order_gou'>
                        <span>购买年限:{{ite.order_year}}</span>
                        <span>折扣:{{ite.order_discount}}</span>
                        <p ><span>共{{ite.goods_num}}件商品</span>
                            <span>合计金额:{{ite.order_mount}}元</span>
                        </p>
                    </div>
                    <div class='clear'></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
