<template>
  <div class="_fe-wrap-pie">
    <div class="_fe-chart" :id="chartId"></div>
  </div>
</template>

<script>
import chartMix from "../../mixins/chart"
export default {
  name: "fe-pie",
  mixins: [chartMix],
  props: {
    // 图表id
    chartId: {
      type: String,
      default: "chart"
    },
  },
  data() {
    return {
      chart: null,
      chartOption: {}
    };
  },
  methods: {
    
  },
  mounted() {
  },
  destroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
._fe-wrap-pie {
  width: 100%;
  height: 100%;
}
._fe-chart {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
