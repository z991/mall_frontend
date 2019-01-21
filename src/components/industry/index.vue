<template>
  <div class="industry">
      <div class="title">全部行业解决方案</div>
      <div class="program">
        <div class="schemeOne" :class="{oneActive: item.isActive}" v-for="(item,index) in product_list" :key="index" @mouseover='solve_case(item)' @mouseout="solve_leave(item)">
          <div class="introduce fl">
            <img  :src="item.m_in_goods[0].image" alt="#" @click="clickT(item.id)">
            <!-- <img :src="item.image" alt=""> -->
            <!-- <img src="../assets/haier.png" alt=""> -->
          </div>
          <div class="introDetail">
            <p class="introTitle" @click="clickT(item.id)">{{item.m_goods_name}}</p>
            <p class="introContent" @click="clickT(item.id)">{{item.m_goods_brief_introduction}}</p>
            <p class="introPrice" @click="clickT(item.id)">￥<span>{{item.put_price}}</span>/年</p>
            <a class="introShop" href="javascript:void(0)" @click="addTrolley(item)">加入购物车</a>
          </div>
        </div>
        <!-- <div class="schemeOne oneActive">
          <div class="introduce fl">
            <img src="../assets/haier.png" alt="">
          </div>
          <div class="introDetail">
            <p class="introTitle">智能识别</p>
            <p class="introContent">根据来源渠道，停留时长，搜索关键词等大数据，对用户进行深度分析，识别出重要用户及用户的真实意图。</p>
            <p class="introPrice">￥1000/年</p>
            <a class="introShop" href="javascript:void(0)">加入购物车</a>
          </div>
        </div>-->
      </div>
    <Login    v-show="panelShow" :panelShow="addTrolley" @LoginDia=hidePanel ></Login>

  </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
