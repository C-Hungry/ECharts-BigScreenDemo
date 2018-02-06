<template>
  <div class="dynamic">
    <transition-group name="list" tag="div">
      <div v-for="(item, index) in currentPageList" v-bind:key="item.id" class="item">
        <div v-if="!item.isEmpty" class="content">
          <div v-on:click="showDetail(item.id,item.name,item.CorpType)" class="area">
            <span class="progress-title">{{item.name}}</span>
            <div class="progress-bar">
              <div class="value" v-bind:style="{ width: item.send/(item.plan?item.plan:1)*100+'%' }"></div>
              <div class="text">{{(item.send/(item.plan?item.plan:1)*100).toFixed(2)+'%'}}</div>
            </div>
          </div>
        </div>
        <div v-else class="content"></div>
      </div>
    </transition-group>
    <transition name="fade">
      <div v-if="dlgDetail.visible" class="dialog">
        <div class="dialog-bg" @click="dlgDetail.visible=false"></div>
        <div class="dialog-form">
          <div class="head">
            <span class="title">{{dlgDetail.title}}详情</span>
            <Button class="close" type="text" shape="circle" @click="dlgDetail.visible=false" icon="android-close"></Button>
          </div>
          <div class="tab">
            <div class="tab-list">
              <div v-bind:class="dlgDetail.tabName=='电厂概况'?'selected':''" v-on:click="dlgDetail.tabName='电厂概况'">电厂概况</div>
              <div v-bind:class="dlgDetail.tabName=='日统计'?'selected':''" v-on:click="dlgDetail.tabName='日统计'">日统计</div>
              <div v-bind:class="dlgDetail.tabName=='月统计'?'selected':''" v-on:click="dlgDetail.tabName='月统计'">月统计</div>
              <div v-bind:class="dlgDetail.tabName=='订单列表'?'selected':''" v-on:click="dlgDetail.tabName='订单列表'">订单列表</div>
            </div>
            <div v-if="dlgDetail.tabName=='电厂概况'" class="tab-view">
              <elecBaseInfo :corpID="dlgDetail.corpID"></elecBaseInfo>
            </div>
            <div v-if="dlgDetail.tabName=='日统计'" class="tab-view">
              <transportDayQuery :corpID="dlgDetail.corpID"></transportDayQuery>
            </div>
            <div v-if="dlgDetail.tabName=='月统计'" class="tab-view">
              <transportMonthQuery :corpID="dlgDetail.corpID"></transportMonthQuery>            
            </div>
            <div v-if="dlgDetail.tabName=='订单列表'" class="tab-view">
              <transportOrderList :corpID="dlgDetail.corpID"></transportOrderList>
            </div>
          </div>
          <div class="foot"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style lang="less">
@import "./index.less";
</style>