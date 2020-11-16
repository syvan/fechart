<template>
  <div class="_fe-wrap-vbar _fe-wrap">
    <div class="name-list-wrap">
      <div class="name-item" v-for="(ni,key) in nameList" :key="key">
        <div class="name">{{ni.name}}</div>
        <div class="icon" :style="'background: url('+ni.icon?ni.icon:''+')'" @click="trigClickName(ni,key)">></div>
      </div>
    </div>
    <div class="_fe-chart-vbar _fe-chart" :id="chartId"></div>
  </div>
</template>

<script>
import chartMix from "../../mixins/chart"
export default {
  name: "fe-vbar",
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
    // 颜色列表
    colorList: {
      type: Array,
      default: () => [
        'rgba(246, 85, 91, 1)',
        'rgba(0, 199, 166, 1)'
      ]
    },
    // 基金名数据
    nameList: {
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
          top: "0%",
          right: "5%",
          bottom: "0%",
          left: "40%"
        },
        xAxis: {
          type: 'value',
          position: 'top',
          axisLabel: {show: false},
          axisTick: {show: false},
          splitLine: {show: false},
          axisLine: {show: false},
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(212, 217, 227, 1)'
            }
          },
          axisLabel: {show: false},
          axisTick: {show: false},
          splitLine: {show: false},
        },
        series: [
          {
            type: 'bar',
            label: {
              show: false,
            },
            barCategoryGap: "40%",
            data: [],
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = ['rgba(246, 85, 91, 1)', 'rgba(0, 199, 166, 1)']
                  return colorList[params.data > 0? 0 : 1]
                }
              }
            }
          }
        ]
      },
    };
  },
  computed: {
    // vbar图数据处理
    vbarDataList() {
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
    vbarDataList (val) {
      if (!val || val.length) return
      this.updatevbarData(val)
    }
  },
  methods: {
    // 刷新图表数据
    updatevbarData (val) {
      console.log("this.vbarDataList", val)
      this.chart.setOption({
        series: [{
          data: val.data
        }],
      })
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
    this.updatevbarData(this.vbarDataList)
  },
  destroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
._fe-wrap-vbar {
  position: relative;
  width: 100%;
  height: 100%;
}
._fe-chart {
  &-vbar {
    width: 100% !important;
    height: 80% !important;
    display: block;
  }
}
.name-list-wrap {
  position: absolute;
  left: 5%;
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  text-align: left;
  .name-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
