<template>
  <div class="receiver">
      <transition-group name="list" tag="div">
        <div v-for="(item, index) in currentPageList" :key="index" class="item">
          <div class="column">
            {{item.carNum}}
          </div>
          <div class="column">
            {{item.name}}
          </div>
          <div class="column" v-if="item.excepitonType==1" style="color: #D9224C;">
            异常
          </div>
          <div class="column" v-else-if="item.excepitonType==2" style="color: #DB853C;">
            运输异常
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