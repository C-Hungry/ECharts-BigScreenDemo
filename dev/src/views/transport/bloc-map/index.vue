<template>
  <div class="bloc">
    <div class="map">
      <IEcharts ref="map" :option="mapData"></IEcharts>
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