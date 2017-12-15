<template>
  <div class="receiver">
    <transition-group name="list" tag="div">
      <div v-for="(item, index) in currentPageList" v-bind:key="index" class="item" v-bind:style="{ flex: index==currentIndex%list.length%pageSize?'2':'1'}">
        <div v-if="!item.isEmpty" class="content">
          <div class="area">
            <span class="progress-title">{{item.name}}</span>
            <span class="progress-bar">
              <span class="text">{{item.send/item.plan*100+'%'}}</span>
              <span class="value" v-bind:style="{ width: item.send/item.plan*100+'%' }"></span>
            </span>
          </div>
        </div>
        <div v-else class="content"></div>
        <div v-if="index==currentIndex%list.length%pageSize" class="detail">
          <div class="arrow"></div>
          <div class="content">
            <div class="row">
              <div class="column">计划量：{{item.plan}}吨</div>
              <div class="column">已发量：{{item.send}}吨</div>
            </div>
            <div class="row">
              <div class="column">实收热值：{{item.kcal}}kcal</div>
              <div class="column">实收硫份：{{item.sulfur}}</div>
            </div>
          </div>
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