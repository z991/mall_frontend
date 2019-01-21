<template>
    <div class="XnMain" v-if="RouterType">
  <div class="industry">
      <div class="clear">
      <div class="title">&nbsp;&nbsp;行业解决方案</div>
      <div class="Fr_Title" @click="HyMore()">&nbsp;&nbsp;查看更多</div>
      </div>
      <div class="program">
        <div class="schemeOne" :class="{oneActive: item.isActive}" v-for="(item,index) in product_list" :key="index" @mouseover='solve_case(item)' @mouseout="solve_leave(item)">
          <div class="introduce fl">
            <img  :src="item.image[0]" alt="#" @click="clickT(item.id)">
            <!-- <img :src="item.image" alt=""> -->
            <!-- <img src="../assets/haier.png" alt=""> -->
          </div>
          <div class="introDetail">
            <p class="introTitle" @click="clickT(item.id)">{{item.name}}</p>
            <p class="introContent" @click="clickT(item.id)">{{item.brief}}</p>
            <p class="introPrice" @click="clickT(item.id)">￥<span>{{item.price}}</span>/年</p>
            <a class="introShop" href="javascript:void(0)" @click="addTrolley(item)">加入购物车</a>
          </div>
        </div>
        </div>
        </div>
         <Login    v-show="panelShow" :panelShow="addTrolley" @LoginDia=hidePanel ></Login>
         <div class="industry">
      <div class="clear">
      <div class="title">&nbsp;&nbsp;&nbsp;产品</div>
      <div class="Fr_Title" @click="CpMore()">&nbsp;&nbsp;查看更多</div>
      </div>
      <div class="program">
        <div class="schemeOne" :class="{oneActive: item.isActive}" v-for="(item,index) in product_Cplist" :key="index" @mouseover='solve_case(item)' @mouseout="solve_leave(item)">
          <div class="introduce fl">
            <img  :src="item.image[0]" alt="#" @click="clickL(item.id)">
            <!-- <img :src="item.image" alt=""> -->
            <!-- <img src="../assets/haier.png" alt=""> -->
          </div>
          <div class="introDetail">
            <p class="introTitle" @click="clickL(item.id)">{{item.name}}</p>
            <p class="introContent" @click="clickL(item.id)">{{item.brief}}</p>
            <p class="introPrice" @click="clickL(item.id)">￥<span>{{item.price}}</span>/年</p>
            <a class="introShop" href="javascript:void(0)" @click="addTrolleyTwo(item)">加入购物车</a>
          </div>
        </div>
        </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
