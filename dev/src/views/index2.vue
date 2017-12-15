<template>
  <div class="index2">
    <div class="title">
      <span>XXX智能运输数据平台</span>
    </div>
    <div class="content">
      <div class="other">
        <div class="left-top">
          <div class="title">
            分公司今日执行情况
          </div>
          <div class="content-list">
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
            <div class="item">
              <div class="area">
                <span class="progress-title">北方公司</span>
                <span class="progress-bar">
                  <span class="text">50%</span>
                  <span class="value"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="title">
            今日计划
          </div>
          <div class="content">
            <IEcharts :option="pieData"></IEcharts>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-top">
          <div class="middle-top-item">
            <div class="title">
              今日计划：256323
            </div>
            <div class="progress-bar">
              <span class="text">3235</span>
              <span class="value" style="background-color: #146FBC;"></span>
            </div>
          </div>
          <div class="middle-top-item">
            <div class="title">
              本月计划：256323
            </div>
            <div class="progress-bar">
              <span class="text">32135</span>
              <span class="value" style="background-color: #D3A72A;"></span>
            </div>
          </div>
          <div class="middle-top-item">
            <div class="title">
              今年计划：256323
            </div>
            <div class="progress-bar">
              <span class="text">321235</span>
              <span class="value" style="background-color: #1C8F2E;"></span>
            </div>
          </div>
        </div>
        <div class="middle-bottom" style="padding: 5px;">
            <IEcharts :option="mapData"></IEcharts>
        </div>
      </div>
      <div class="other">
        <div class="right-top">
          <div class="title">
            热值（单位：kcal）
          </div>
          <div class="content">
            <div class="row">
              <div class="column">
                <span class="area"></span>
              </div>
              <div class="column">
                <span class="area">今日</span>
              </div>
              <div class="column">
                <span class="area">本月</span>
              </div>
              <div class="column">
                <span class="area">今年</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <span class="area">计划</span>
              </div>
              <div class="column">
                <span class="area">1000</span>
              </div>
              <div class="column">
                <span class="area">2000</span>
              </div>
              <div class="column">
                <span class="area">1500</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <span class="area">已收</span>
              </div>
              <div class="column">
                <span class="area">100</span>
              </div>
              <div class="column">
                <span class="area">650</span>
              </div>
              <div class="column">
                <span class="area">1200</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right-middle">
          <div class="title">
            价格
          </div>
          <div class="content">
            <!-- <IEcharts :option="lineData"></IEcharts> -->
          </div>
        </div>
        <div class="right-bottom">
          <div class="title">
            异常
          </div>
          <div class="content">
            <div class="row">
              <div class="column">
                <span class="area">陕A12345</span>
              </div>
              <div class="column">
                <span class="area">分公司名称</span>
              </div>
              <div class="column">
                <span class="area" style="color: #E87D1F;">报警异常</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <span class="area">陕A12345</span>
              </div>
              <div class="column">
                <span class="area">分公司名称</span>
              </div>
              <div class="column">
                <span class="area" style="color: #E87D1F;">报警异常</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <span class="area">陕A12345</span>
              </div>
              <div class="column">
                <span class="area">分公司名称</span>
              </div>
              <div class="column">
                <span class="area" style="color: #E87D1F;">报警异常</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <span class="area">陕A12345</span>
              </div>
              <div class="column">
                <span class="area">分公司名称</span>
              </div>
              <div class="column">
                <span class="area" style="color: #E87D1F;">报警异常</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <span class="area">陕A12345</span>
              </div>
              <div class="column">
                <span class="area">分公司名称</span>
              </div>
              <div class="column">
                <span class="area" style="color: #E87D1F;">报警异常</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vm from "./index2";
export default vm;
</script>
<style scoped lang="less">
@import "./index2.less";
</style>