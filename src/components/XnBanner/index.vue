<template>
 <div class="carousel-wrap" id="carousel"  v-if="RouterType" @mouseenter="stop" @mouseleave="go" >

    <transition-group tag="ul" class='slide-ul' name="list" v-bind:css="false">>
      <li v-for="(list,index) in slideList" :key="index" v-show="index===currentIndex" >
        <a >
          <img :src="list.image" >
        </a>
      </li>
    </transition-group>

    <div class="carousel-items">
      <span v-for="(item,index) in slideList.length" :key="index" :class="{'active':index===currentIndex}" @click="change(index)"></span>
    </div>
</div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
