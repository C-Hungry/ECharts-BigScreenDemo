<template>
  <div class="consigner">
    <div v-if="pieData.series[0].data.length>0" class="column">
      <IEcharts ref="pie" :option="pieData"></IEcharts>
    </div>
    <div v-if="this.pieData.series[0].data.length>0" class="column" style="padding: 20px; line-height: 0.75vw;">
      <div class="row" style=" font-size: 1vw; color: #93D346; justify-content: flex-start;">
        计划：{{currentIndex>=0?pieData.series[0].data[currentIndex].value:""}}
      </div>
      <div class="row">
        <div class="column">
          已发：<br>
          <span style="font-size: 1vw;">{{currentIndex>=0?pieData.series[0].data[currentIndex].HasSendWeight:""}}</span>
        </div>
        <div class="column">
          途中：<br>
          <span style="font-size: 1vw;">{{currentIndex>=0?pieData.series[0].data[currentIndex].TransportWeight:""}}</span>
        </div>
      </div>
      <div class="row">
        <div class="column">
          待收：<br>
          <span style="font-size: 1vw;">{{currentIndex>=0?pieData.series[0].data[currentIndex].ArriveWeight:""}}</span>
        </div>
        <div class="column">
          已收：<br>
          <span style="font-size: 1vw;">{{currentIndex>=0?pieData.series[0].data[currentIndex].CompleteWeight:""}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vm from "./index";
export default vm;
</script>
<style scoped lang="less">
@import "./index.less";
</style>