<template>
  <div class="consigner">
    <div class="row">
      <div class="column">
        <div class="progress-bar">
          <div class="value" style="background-color: #0D71BD; width: 0%;"
          v-bind:style="{ width: ((Data.ToadyFinishWeight && Data.TodayPlanWeight?Data.ToadyFinishWeight/Data.TodayPlanWeight:0)*100).toFixed(2) + '%'}"></div>
          <div class="background">
            <span class="title">今日完成/计划</span>
            <span class="text">{{Data.ToadyFinishWeight}}/{{Data.TodayPlanWeight}}</span>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="progress-bar">
          <div class="value" style="background-color: #BA2A2F; width: 0%;" 
          v-bind:style="{ width: '100%'}"></div>
          <div class="background">
            <span class="title">已收煤质</span>
            <span class="text">
              <img src="../../../images/calorific.png" style="height: 1vw;">&nbsp;{{Data.CompleteCalorific?Data.CompleteCalorific+'kcal':'--'}}
              <img src="../../../images/sulfur.png" style="height: 1vw; margin-left: 1.5vw;">&nbsp;{{Data.CompleteSulphur?Data.CompleteSulphur+'%':'--'}}
            </span>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="progress-bar">
          <div class="value" style="background-color: #1D8F2F; width: 0%;"
          v-bind:style="{ width: ((Data.TodayFinishRate?Data.TodayFinishRate:0)*100).toFixed(2) + '%'}"></div>
          <div class="background">
            <span class="title">合同完成率</span>
            <span class="text">{{((Data.TodayFinishRate?Data.TodayFinishRate:0)*100).toFixed(2) + '%'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="transport-type">
          <img src="../../../images/truck.png">&nbsp;&nbsp;在途汽运：{{Data.TransportInExecution?Data.TransportInExecution:0}}车
        </div>
      </div>
      <div class="column">
        <div class="transport-type">
          <img src="../../../images/rail.png">&nbsp;&nbsp;在途铁运：{{Data.LronInExecution?Data.LronInExecution:0}}节
        </div>
      </div>
      <div class="column">
        <div class="transport-type">
          <img src="../../../images/ship.png">&nbsp;&nbsp;在途船运：{{Data.ShipInExecution?Data.ShipInExecution:0}}艘
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