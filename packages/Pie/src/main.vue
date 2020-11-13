<template>
  <div class="_fe-wrap-pie _fe-wrap">
    <slot name="tag"></slot>
    <div class="_fe-chart-pie _fe-chart" :id="chartId"></div>
  </div>
</template>

<script>
import chartMix from "../../mixins/chart"
export default {
  name: "fe-pie",
  mixins: [chartMix],
  props: {
    // 图表配置
    options: {
      type: Object,
      default: () => ({})
    },
    dataList: {
      type: Array,
      default: () => [
        {value: 335, name: '直接访问', color: 'red'},
        {value: 310, name: '邮件营销', color: 'green'},
        {value: 234, name: '联盟广告', color: 'blue'}
      ]
    }
  },
  data() {
    return {
      chart: null,
      defaultOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
          }
        ]
      }
    };
  },
  computed: {
    pieDataList() {
      let legendData = [],  //图例数据
          seriesData = [],  //图表数据
          colorData = []   //图例及图表颜色
      this.dataList.forEach(di => {
        legendData.push(di.name)
        seriesData.push({
          value: di.value,
          name: di.name
        })
        di.color ? colorData.push(di.color) : ''
      })
      return {
        legendData,
        seriesData,
        colorData
      }
    }
  },
  watch: {
    pieDataList (val) {
      if (!val) return
      this.updatePieData(val)
    }
  },
  methods: {
    updatePieData (val) {
      this.chart.setOption({
        series: [{
          data: val.seriesData
        }],
        color: val.colorData
      })
    }
  },
  mounted() {
    this.updatePieData(this.pieDataList)
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
._fe-chart-pie {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
