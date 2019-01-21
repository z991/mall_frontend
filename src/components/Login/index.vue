<template>
<div  class="shade"  v-if="panelShow" >
    <div class="newTrade"   @keydown="Updown($event)" >
      <p class="closeBtn"><img src="../../assets/close.png" @click="LoginDia" alt=""></p>
      <p class="title">账号登录</p>
      <p class="accout"><label for="">账号</label><input v-model="user.username" type="text" /></p>
      <p class="accout"><label for="">密码</label><input v-model="user.password" type="password" /></p>
      <p class="accout"><label for="">验证码</label><input v-model="user.check_code" type="text" class="verInp" /><span class="verCode fr"><img :src="cc" alt="" @click="oncc()" ></span></p>
      <p class="operate"><a class="login" href="javascript:void(0)" @click="login">登录</a><a href="javascript:void(0)" class="forget" @click="forgetPass">忘记密码</a></p>
     <div class="forgetPass" v-show="hintInfo">
      <p class="closeBtn"><img src="../../assets/close.png" @click="closeDia" alt=""></p>
      <p class="title">忘记密码</p>
      <p class="relation">请联系管理员：12345678666</p>
      <p class="passLogo"><img src="../../assets/rocket.png" alt=""></p>
    </div>
   <shade v-show='shade'></shade>
    </div>
    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
