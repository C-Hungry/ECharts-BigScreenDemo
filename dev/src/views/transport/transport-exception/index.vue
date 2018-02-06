<template>
  <div class="receiver">
      <transition-group name="list" tag="div">
        <div v-for="item in currentPageList" :key="item.id" class="item">
          <div class="column">
            {{item.carNum}}
          </div>
          <div class="column">
            {{item.name}}
          </div>
          <div class="column" v-if="item.excepitonType==1" style="color: #DB853C;">
            掉线超时
          </div>
          <div class="column" v-else-if="item.excepitonType==2" style="color: #DB853C;">
            进入违规区域
          </div>
          <div class="column" v-else-if="item.excepitonType==3" style="color: #DB853C;">
            超速提示
          </div>
          <div class="column" v-else-if="item.excepitonType==4" style="color: #DB853C;">
            停车超时
          </div>
          <div class="column" v-else-if="item.excepitonType==5" style="color: #DB853C;">
            设备异常
          </div>
          <div class="column" v-else-if="item.excepitonType==6" style="color: #DB853C;">
            进区域
          </div>
          <div class="column" v-else-if="item.excepitonType==7" style="color: #DB853C;">
            出区域
          </div>
          <div class="column" v-else-if="item.excepitonType==8" style="color: #DB853C;">
            进区域
          </div>
          <div class="column" v-else-if="item.excepitonType==9" style="color: #DB853C;">
            出区域
          </div>
          <div class="column" v-else-if="item.excepitonType==10" style="color: #DB853C;">
            线路偏移
          </div>
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