<template>
  <div class="detailGoods">
    <div class="explain">
      <div class="detail_all clear">
        <div class="detail_photo fl">
          <div class="photo_de" id='box' @mouseover="bigOver" @mouseout="bigOut" @mousemove="bigMove($event)">
            <img :src="imagE" alt="#">
            <div class="move" id='bmove' v-show='bigshow' :style="{left:bigX,top:bigY}"></div>
            <div class="bimg" id='bbimg' v-show='smallshow' >
              <img id="b_bimg" :src="imagE" alt="#" :style="{left:smallX,top:smallY}">
            </div>
          </div>
          <ul class="photo_br">
            <li class="fl" v-for='(item,index) in goods.introduce_img' :key='item.id'><img :src="item.image" alt="#" @click='showImg(index)'></li>
          </ul>
        </div>
        <div class="detail_descri fl">
          <p class="descri_name">{{goods.goods_name}}</p>
          <p class="descri_de">{{goods.goods_brief_introduction}}</p>
          <div class="descri_price">
            <p class="descri_word">价格</p>
            <p class="descri_ye" v-if="goods.put_price!==''">{{goods.put_price}}元/年</p>
          </div>
          <div class="descri_num">数量<input type="number" v-model="shopNum" :disabled="goods.activeNum" />个</div>
          <div class="label">
            <p class="label_explain">标签</p>
            <p class="label_de">
              <span v-for='item in goods.goods_tag' :key='item.id'>{{item.goods_tag}}</span></p>
          </div>
          <div class="addshop">
            <a href="javascript:;" @click="addTrolley">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="introduce">
      <span @click="detail" :class="{active: isActive}" style="margin-right:66px;">产品详情

        
      </span>
      <span @click="success_case" :class="{active: !isActive}">成功案例</span>
    </div>
    <div class="goods_detail">
      <div class="introduce_content" v-show="productSet">
           <div class="allocation">规格和参数</div>
        <div class="alloca_box clear">
       <ul class="product_config">
          <li v-for="item in goods.par_options">{{item.control.file_name}}：{{item.param_options_name}}</li>
        </ul>
        </div>
        <div class="allocation">产品配置</div>
        <div class="alloca_box clear">
          <div class="richtext" style="" id="Wangdior_Img" v-html='goods.goods_text'>

          </div>
          </div>
        <div class="alloca_photo">
          <p v-for="(item,index) in goods.detail_img" :key="index" style="text-align:center;">
            <img  :src="item.image" alt="">
          </p>
          <!-- <img v-for="(item,index) in goods.detail_img" :key="index" :src="item.image" alt=""> -->
          <!-- <img src="../assets/logos.png" alt=""> -->
        </div>
      <div class="introduce_content" v-show="!productSet">
        <div class="allocation">典型成功案例</div>
        <!-- <div class="alloca_box clear">

        </div> -->
        <div class="alloca_photo clear">
          <span class="sucessCase fl" v-for='item in goods.success_img' :key='item.id'>
            <img :src="item.image" alt="#" />
          </span>
        </div>
      </div>
      </div>
      
    </div>
    
 <Login v-show="panelShow" :panelShow="addTrolley" @LoginDia=hidePanel></Login>
  </div>
</template>
<script src="./script.js"></script>
<style src="../../assets/home.scss" lang="scss"> </style>
<style src="./style.scss" lang="scss" scoped></style>
