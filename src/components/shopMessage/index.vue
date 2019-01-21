<template>
<div class="shopMessage">
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
  <div class="clientInfor">
    <p class="clientTitle"><img src="../../assets/client.png" alt="" />客户信息</p>
    <p>
      <label for="">客户类型</label>
      <select name="" id="" v-model="user_info.customer_type" @change="cutUser"  :disabled="forbidden">
        <option value="0">新客户</option>
        <option value="1">老客户</option>
      </select><em class="ii">*</em>
    </p>
    <p v-show="id_show"><label for="">企业ID</label><input type="text" v-model="company_id" /><em class="ii">*</em><a href="javascript:void(0)" class="sureBtn" @click="detection">确认</a></p>
    <p>
      <label for="">站点类型</label>
      <select name="" id="" v-model="user_info.station_type" :disabled="forbidden">
        <option value="1">试用客户</option>
        <option value="2">正式客户</option>
        <option value="3">市场渠道客户</option>
        <option value="4">商务渠道客户</option>
        <option value="5">自用站点</option>
      </select><em class="ii">*</em>
    </p>
    <p><label for="">公司名称</label><input type="text" v-model="user_info.company_name" :disabled="forbidden" /><em class="ii">*</em></p>
    <p><label for="">公司简称</label><input type="text" v-model="user_info.abbreviation" :disabled="forbidden" /><em class="ii">*</em></p>
    <p v-for="(item,index) in user_info.company_url" :key="index">
      <label for="">公司网址</label>
      <input type="text" v-model="item.company_url" :disabled="forbidden" /><em class="ii">*</em>
      <img src="../../assets/add.png" alt="" v-show="item.addShow" @click="add_url">
      <img src="../../assets/dele.png" alt="" v-show="item.deleShow" @click="dele_url(index)">
    </p>
    <p><label for="">公司邮箱</label><input type="text" v-model="user_info.company_email" :disabled="forbidden" /><em class="ii">*</em></p>
    <p>
      <label for="">所属行业</label>
      <select name="" id="" v-model="user_info.industry" :disabled="forbidden">
        <option v-for="(item,index) in industry_list" :key="index" :value="item.industry">{{item.industry}}</option>
      </select><em class="ii">*</em>
    </p>
    <p><label for="">营业执照名称</label><input type="text" v-model="user_info.GSZZ" :disabled="forbidden" /><em class="ii">*</em></p>
    <p><label for="">客户服务区域</label><input type="text"  v-model="user_info.service_area" :disabled="forbidden" /><em class="ii">*</em></p>
  </div>
  <div class="stationInfo">
    <p class="clientTitle"><img src="../../assets/station.png" alt="">站点信息</p>
    <p><label for="">部署方式</label><span>公有云</span></p>
    <p>
      <label for="">客户版本</label>
      <select name="" id="" v-model="user_info.cli_version" :disabled="forbidden">
        <option value="2">B2C</option>
        <option value="1">B2B</option>
        <option value="4">B2B2C</option>
      </select><em class="ii">*</em>
    </p>
    <p><label for="">有效日期</label><span>{{order_info.order_year}}年</span></p>
    <p v-show="giveShow"><label for="">赠送</label><span><span class="addSub"><a href="javascript:void(0)" @click="subtraction">-</a><input type="text" v-model="order_info.give_day" :disabled="forbidden" /><a href="javascript:void(0)" @click="addition">+</a></span>天</span></p>
  </div>
  <div class="clientInfor">
    <p class="clientTitle"><img src="../../assets/support.png" alt="">支持人员</p>
    <p><label for="">销售人员</label><input @keydown="donateNum" type="text" v-model="supportStaff.sales" :disabled="forbidden" /></p>
    <p><label for="">售前人员</label><input type="text" v-model="supportStaff.pre_sales" :disabled="forbidden" /></p>
    <p><label for="">实施顾问</label><input type="text" v-model="supportStaff.impl_cslt" :disabled="forbidden" /></p>
    <p><label for="">运营顾问</label><input type="text" v-model="supportStaff.oper_cslt" :disabled="forbidden" /></p>
    <p><label for="">运营支持</label><input type="text" v-model="supportStaff.oper_supt" :disabled="forbidden" /></p>
  </div>
  <div class="submitMess">
    <a href="javascript:void(0)" class="closeSub" @click="cancel_info">取消</a>
    <a href="javascript:void(0)" class="sureSub" @click="sub_info">确定</a>
  </div>
</div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
