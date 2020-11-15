<template>
  <div class="_fe-wrap-mix _fe-wrap">
    <div class="tip">
      <slot name="tip"></slot>
    </div>
    <div class="_fe-chart-mix _fe-chart" :id="chartId"></div>
  </div>
</template>

<script>
import chartMix from "../../mixins/chart"
import echarts from "echarts"
export default {
  name: "fe-mix",
  mixins: [chartMix],
  props: {
    // 图表配置
    options: {
      type: Object,
      default: () => ({})
    },
    // 图表数据
    dataList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      // 图表对象
      chart: null,
      // 图表默认配置
      defaultOption: {
        grid: {
          top: "15%",
          right: "10%",
          bottom: "10%",
          left: "10%"
        },
         xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisTick:{
              show:false
            },
            axisLine: {
              show: false,
            },
            data: [1,2,3,4,5]
          },
          {
            type: 'category',
            boundaryGap: true,
            show:false,
            data: [1,2,3,4,5]
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick:{
              show:false//不显示坐标轴刻度线
            },
            axisLine: {
              show: false,//不显示坐标轴线
            },
            splitLine:{
              lineStyle: {
                type: 'dashed'
              }
            },
            scale: true,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            axisTick:{
              show:false//不显示坐标轴刻度线
            },
            axisLine: {
              show: false,//不显示坐标轴线
            },
            splitLine:{
              show:false//不显示网格线
            },
            scale: true,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            silent: true,
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [100,200,400,350,600],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: 'rgba(251, 48, 39, 1)'},
                  {offset: 1, color: 'rgba(255, 133, 128, 1)'}
                ])
              }
            }
          },
          {
            type: 'line',
            symbol: 'none',
            data: [1,2,5,4,6],
            itemStyle: {
              normal: {
                color: ['rgba(255, 187, 0, 1)']
              }
            }
          },
        ]
      },
    };
  },
  computed: {
    // mix图数据处理
    mixDataList() {
      let data = []  //数据
      this.dataList.forEach(vi => {
        data.push(vi)
      })
      return {
        data,
      }
    },
  },
  watch: {
    // 数据变化实时更新
    mixDataList (val) {
      if (!val || val.length) return
      this.updatemixData(val)
    }
  },
  methods: {
    // 刷新图表数据
    updatemixData (val) {
      console.log("this.mixDataList", val)
      // this.chart.setOption({
      //   series: [{
      //     data: val.data
      //   }],
      // })
    },
    // 格式化日期
    formatDate (date) {
      return String(date).replace(/^(\d{4})[^0-9]*(\d{1,2})[^0-9]*(\d{1,2})$/, "$1-$2-$3")
    },
    // 触发列表点击事件
    trigClickName (item, index) {
      this.$emit("clickItem", item, index)
    }
  },
  mounted() {
    this.updatemixData(this.mixDataList)
  },
  destroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
._fe-wrap-mix {
  position: relative;
  width: 100%;
  height: 100%;
}
._fe-chart {
  &-mix {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.tip {
  position: absolute;
  top: 0;
  height: 2rem;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}
</style>
