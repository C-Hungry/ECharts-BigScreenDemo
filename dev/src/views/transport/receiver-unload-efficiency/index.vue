<template>
  <div class="receiver">
      <transition-group name="list" tag="div">
        <div v-for="(item, index) in currentPageList" :key="index" class="item">
          <div class="column">
            <span class="circle" v-bind:style="{ backgroundColor: pageIndex>0?'#5571A3' : index==0?'#FD0002':index==1?'#FF9D08': index==2? '#25D50E': '#5571A3' }">{{pageIndex*pageSize+index+1}}</span>
          </div>
          <div class="column">{{item.name}}</div>
          <div class="column" style="color:#00F0F8;">{{item.value}}</div>
        </div>
      </transition-group>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style scoped lang="less">
@import "./index.less";
</style>