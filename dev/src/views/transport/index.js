
// import receiverTodayPercent from './receiver-today-percent/index.vue';
// import receiverUnloadEfficiency from './receiver-unload-efficiency/index.vue';
// import transportException from './transport-exception/index.vue';
// import consignerTodayPercent from './consigner-today-percent/index.vue';
import consignerTodayTotal from './consigner-today-total/index.vue';
// import contractState from './contract-state/index.vue';
import contractProgress from './contract-progress/index.vue';
import transportDynamic from './transport-dynamic/index.vue';
import blocMap from './bloc-map-new/index.vue';
import coalQualityStatistics from './coal-quality-statistics/index.vue';
import transportExceptionTable from './transport-exception-table/index.vue';

export default {
  components: {
    // receiverTodayPercent,
    // receiverUnloadEfficiency,
    // transportException,
    // consignerTodayPercent,
    consignerTodayTotal,
    // contractState,
    contractProgress,
    transportDynamic,
    blocMap,
    coalQualityStatistics,
    transportExceptionTable
  },
  data() {
    return {
      //华能北方公司燃料运输指挥中心
      title: "",
    };
  },
  methods: {
    back(){
    },
    consignerTodayTotalLoaded(data) {
      if (data) this.title = data.CompanyText;
    },
  }
};