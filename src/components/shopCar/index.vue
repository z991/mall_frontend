<template>
  <div class="shopCar">
    <div class="inforShow clear">
      <div class="checkShop fl">
        <p class="checkStep">1</p>
        <p class="checkDec">查看购物车</p>

      </div>
      <p class="gradual fl"></p>
      <div class="infoShop fl">
        <p class="infoStep">2</p>
        <p >信息确认</p>
      </div>
    </div>
    <a class="clearShop"><img src="../../assets/clear.png" alt="">
    <span @click="clearShop">清空购物车</span>
    </a>
    <div class="shopList">
      <div class="goodList">
        <span>产品名称</span>
        <span>类别</span>
        <span>数量</span>
        <span>单价</span>
        <span>金额</span>
        <span>操作</span>
      </div>
      <ul>
        <li v-for="(item,index) in orderList" :key="index">
          <span>{{item.goods}}</span>
          <span style="color:#999;">{{item.goods_model}}</span>
          <span><span class="addSub"><a href="javascript:void(0)" @click="subtraction(item,1)">-</a><input type="text" readonly="true" v-model="item.goods_number" :disabled="item.active" /><a href="javascript:void(0)" @click="addition(item,1)">+</a></span></span>
          <span>￥{{item.price}}</span>
          <span style="color:#ff9400">￥{{item.figure}}</span>
          <span class="operate"><a href="javascript:void(0)" @click="detail_order(item)">详情</a><a href="javascript:void(0)" @click="delete_order(item)">删除</a></span>
        </li>
        <!-- <li>
          <span>B2C标准版</span>
          <span style="color:#999;">版本</span>
          <span><span class="addSub"><a href="javascript:void(0)">-</a><input type="text" /><a href="javascript:void(0)">+</a></span></span>
          <span>￥100000.00</span>
          <span style="color:#ff9400">￥100000.00</span>
          <span class="operate"><a href="javascript:void(0)">详情</a><a href="javascript:void(0)">删除</a></span>
        </li> -->
      </ul>
    </div>
    <div class="closeAccount">
      <div class="disNum">
        <p><span class="closeTitle">购买年限</span><span><span class="entryNum"><a href="javascript:void(0)" @click="subtraction(ageLimit,1,ShopDel)">-</a><input type="text" v-model="ageLimit.goods_number"    v-number-Num="ageLimit.goods_number" /><a href="javascript:void(0)" @click="addition(ageLimit,1,ShopAdd)">+</a></span> 年 </span></p>
        <p><span class="closeTitle">折扣</span><span><span class="entryNum"><a href="javascript:void(0)" @click="subtraction(percentum,1)">-</a><input type="text"  v-model="percentum.goods_number"  :oldValue="percentum.goods_number" v-number-only="percentum.goods_number"/><a href="javascript:void(0)" @click="addition(percentum,1,100)">+</a></span> %<a href="javascript:void(0)" class="sureBtn" @click="totalSum">确定</a></span></p>
      </div>
      <div class="disFooter">
        <a href="javascript:void(0)" class=" fl shopPage" @click="browse"><img src="../../assets/back.png" style="border:none;" />继续购物</a><span>已选商品： <span class="pitchNum">{{caseNum}}</span> 件</span><span class="totalNum">合计金额：<span style="">{{totalPrice}}</span>元</span><a href="javascript:void(0)" class="onceBtn" @click="settleNum">立即结算</a>
      </div>
    </div>
  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
