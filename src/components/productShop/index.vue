<template>
  <div class="productShop">
    <Login    v-if="panelShow" :panelShow="batchShop" @LoginDia=hidePanel></Login>
    <div class="chooseType">
        <div class="filtrate" v-show="filterShow">
          <p class="fl" style="width:84px;text-align:right;padding-right:36px;">筛选条件</p>
          <ul>
            <li v-for="(item,index) in filter_list" :key="index"><span style="color:#999;">{{item.model}}：</span><span style="color:#2f88ef;">{{item.group_put}}</span><img src="../../assets/X.png" alt="" @click="dele(item.model)"></li>
          </ul>
          <a href="javascript:void(0)" class="chooseSure" @click="filter_sure">确定</a>
        </div>
        <div class="industry clear" v-for="(item,parent) in tag_list" :key="parent" :style="{height: item.show_more}">
          <p class="title fl">{{item.label_category}}</p>
          <div class="detail_ind"><span v-for="(n,index) in item.children" :key="index" @click="hit_tag(n,item,parent)" @dblclick="Close(n,item,parent)" :class="{active: n.correct}">{{n.goods_tag}}</span></div>
          <div class="more"><a href="javascript:void(0)" class="unfold" @click="more_mess(item)">更多<img style="border:none;" src="../../assets/dropDown.png" alt=""></a><a href="javascript:void(0)" class="multiple" v-if="item.choice">+ 多选</a></div>
        </div>
        <!-- <div class="industry clear">
          <p class="title fl">客户案例</p>
          <div class="detail_img"><span><img src="../assets/shangde.png" alt=""></span><span><img src="../assets/miya.png" alt=""></span><span><img src="../assets/haier.png" alt=""></span><span><img src="../assets/dang.png" alt=""></span><span><img src="../assets/siku.png" alt=""></span><span><img src="../assets/tal.png" alt=""></span><span><img src="../assets/duia.png" alt=""></span></div>
          <div class="more"><a href="javascript:void(0)" class="unfold">更多<img src="../assets/dropDown.png" alt=""></a><a href="javascript:void(0)" class="multiple">+ 多选</a></div>
        </div>
        <div class="industry clear">
          <p class="title fl">客服规模</p>
          <div class="detail_ind"><span>1-10</span><span>10-20</span><span>20-50</span><span>50以上</span></div>
        </div> -->
    </div>
    <div class="shop_cart" v-show="shop_cart">
      <a href="javascript:void(0)" class="add_shop" @click="add_shop"><img src="../../assets/add_shop.png" alt="" style="border:none;">批量加入购物车</a>
    </div>
    <div class="shop_full" v-show="!shop_cart">
      <div class="shop_option">
        <p class="fl" style="width:82px;text-align:right;">已选项</p>
        <ul>
          <li v-for="(item,index) in batch_list" :key="index" >
            <span>{{item.goods_name}}</span><img src="../../assets/X.png" alt="" @click="dele_mess(item)"></li>
        </ul>
      </div>
      <div class="shop_operate">
        <a href="javascript:void(0)" class="shop_sure" @click="batchShop"><img src="../../assets/add_shop.png" alt="">确定加入购物车</a>
        <a href="javascript:void(0)" class="shop_close" @click="close_batch">取消批量操作</a>
      </div>
    </div>
    <div class="all_product">
      <div class="among_product" v-for="(item,index) in produce_list" :key="index">

        <div class="among_title"><span class="ddim fl">{{item.model}}</span><span v-if="item.model === '版本'" class="hint fr"><img src="../../assets/remind.png" alt="">新客户必须购买一个基础标准版</span></div>
        <div class="among_all clear">
          <ul class="among_content fl">

            <li v-for="(n,index1) in item.product" :key="index1" class="{enable:n.isActive}" @click="opt_product(n)">{{n.goods_name}}  </li>
            <li class="dropDown" v-for="(item1,index2) in item.child_model"   :key="item1.goods_name"  :class="{second_own: item1.ownactive}" @click='mokuai(index,index2,item,item1)'>{{item1.model}}
              <img src="../../assets/drop.png" alt="" />
            </li>
          </ul>
          <!-- <div class="fl"> -->
          <!-- <ul class="among_level fl">
            <li  v-for="(item1,index2) in item.child_model"  :key="index2" :class="{second_own: item1.ownactive}" @click='mokuai(index,index2,item)'>{{item1.model}}
              <img src="../../assets/drop.png" alt="" />
            </li>
          </ul> -->
          <!-- </div> -->
        </div>
        <div class="second_all Fixd_cc" v-show='item.active_spread'>
          <p class="among_second"  v-if='item.cc' v-for="(item2,index) in ccp" :key="index" :style="{top:topX+'px'}"><span :class="{enable: item2.isActive}" @click="opt_product(item2)">{{item2.goods_name}}</span></p>
        </div>
      </div>
      <!-- <div class="among_product">
        <div class="among_title"><span class="ddim fl">多渠道</span></div>
        <ul class="among_content">
          <li>访客SDK</li><li>微博</li><li>微信</li><li>微信小程序</li><li>QQ</li><li>支付宝</li>
        </ul>
      </div>
      <div class="among_product">
        <div class="among_title"><span class="ddim fl">咨询接待</span></div>
        <ul class="among_content">
          <li>自定义回复</li><li>消息撤回</li><li>音频客服</li><li>远程桌面</li><li>客服直播</li><li>智能取消</li><li>咨询总结</li><li>智能分配</li>
        </ul>
        <ul class="among_level">
          <li>
            智能分配<img src="../assets/drop.png" alt="" />
          </li>
          <li><p>智能关闭<img src="../assets/drop.png" alt="" /></p></li>
        </ul>
        <ul class="among_second">
          <li>用户群定义</li>
          <li>分配策略</li>
        </ul>
      </div>
      <div class="among_product">
        <div class="among_title"><span class="ddim fl">移动客服</span></div>
        <ul class="among_content">
          <li>kf_SDK</li><li>kf_ui_sdk</li>
        </ul>
      </div> -->
    </div>

  </div>
</template>
<script src="./script.js"></script>
<style src="../../assets/home.scss" lang="scss"> </style>
<style src="./style.scss" lang="scss" scoped></style>
