<template>
  <div class="_fe-wrap-mix _fe-wrap">
    <div class="filter-wrap">
      <div class="filter-container"  v-if="showfilter">
        <div :class="['filter-item',selectIndex==key?'select':'']" v-for="(ci,key) in filterTypeList" :key="key" @click="toggelFilter(key)">
          {{ci.label}}
        </div>
      </div>
      <slot name="filter" v-else></slot>
    </div>
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
    dataListA: {
      type: Array,
      default: () => []
    },
    // 图表数据
    dataListB: {
      type: Array,
      default: () => []
    },
    // 图表类型
    chartType: {
      type: String,
      default: "mix"
    },
    // 显示过滤器
    showfilter: {
      type: Boolean,
      default: true
    },
    // 选择的过滤指针
    filterIndex: {
      type: Number,
      default: 0
    },
    // 过滤类型
    filterTypeList: {
      type: Array,
      default: () => [
        {type: "j1z", label: '近1周'},
        {type: "j1y", label: '近1月'},
        {type: "j3y", label: '近3月'},
        // {type: "j6y", label: '近6月'},
        // {type: "j1n", label: '近1年'},
        // {type: "j2n", label: '近2年'},
        // {type: "j3n", label: '近3年'},
        // {type: "j5n", label: '近5年'},
        // {type: "all", label: '成立以来'},
      ]
    },
  },
  data() {
    return {
      // 图表对象
      chart: null,
      // 图表默认配置
      defaultOptionMix: {
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
            data: []
          },
          {
            type: 'category',
            boundaryGap: true,
            show:false,
            data: []
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
                type: 'dashed',
                width: 0.5
              }
            },
            scale: true,
            // boundaryGap: [0.2, 0.2]
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
            type: 'line',
            symbol: 'none',
            data: [],
            itemStyle: {
              normal: {
                color: ['rgba(255, 187, 0, 1)']
              }
            }
          },
          {
            silent: true,
            type: 'bar',
            barWidth: 20,
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: [],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: 'rgba(251, 48, 39, 1)'},
                  {offset: 1, color: 'rgba(255, 133, 128, 1)'}
                ])
              }
            }
          },
        ]
      },
      defaultOptionDou: {
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
                type: 'dashed',
                width: 0.5
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
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbol: 'none',
            data: [100,200,400,350,600],
            itemStyle: {
              normal: {
                color: ['rgba(255, 29, 14, 1)']
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
      defaultOptionSin: {
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
                type: 'dashed',
                width: 0.5
              }
            },
            scale: true,
            boundaryGap: [0.2, 0.2]
          },
        ],
        series: [
          {
            silent: true,
            type: 'line',
            symbol: 'none',
            data: [100,200,400,350,600],
            itemStyle: {
              normal: {
                color: ['rgba(255, 29, 14, 1)']
              }
            }
          },
        ]
      },
      // 过滤指针
      selectIndex: this.filterIndex
    };
  },
  computed: {
    // 图表默认配置
    defaultOption () {
      if (this.chartType=="dou") {
        return this.defaultOptionDou
      } else if (this.chartType=="sin") {
        return this.defaultOptionSin
      } else {
        return this.defaultOptionMix
      }
    },
    // mix图数据处理
    mixDataList() {
      let rowDataA = [],  //x轴数据
          colDataA = [],  //y轴数据
          rowDataB = [],  //x轴数据
          colDataB = []  //y轴数据
      this.dataListA.forEach(mia => {
        rowDataA.push(mia.date)
        colDataA.push(mia.value)
      })
      this.dataListB.forEach(mib => {
        rowDataB.push(mib.date)
        colDataB.push(mib.value)
      })
      return {
        rowDataA,
        colDataA,
        rowDataB,
        colDataB,
      }
    },
  },
  watch: {
    // 切换图表类型
    chartType () {
      this.chart.setOption(this.defaultOption)
    },
    // 数据变化实时更新
    mixDataList (val) {
      if (!val || val.length) return
      this.updatemixData(val)
    },
    // 过滤指针实时更新
    filterIndex (val) {
      this.selectIndex = val
    }
  },
  methods: {
    // 刷新图表数据
    updatemixData (val) {
      this.chart.setOption({
        xAxis: [{
          data: val.rowDataA
        },{
          data: val.rowDataB
        }],
        series: [{
          data: val.colDataA
        },{
          data: val.colDataB
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
    },
    // 切换过滤器
    toggelFilter (index) {
      this.selectIndex = index
      this.$emit("changeFilter", index)
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
  top: 2.1rem;
  height: 1.5rem;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}
.filter-wrap {
  font-size: 1rem;
  height: 2.69rem;
  width: 100%;
  .filter-container {
    display: flex;
    justify-content: stretch;
    height: 2.19rem;
    width: 90%;
    margin: 0 auto;
  }
  .filter-item {
    flex: 1;
    height: 2.1rem;
    box-sizing: border-box;
    padding: 0 0.2rem;
    line-height: 2.1rem;
    background: linear-gradient(92deg, #C8C8C8, #E0E0E0);
  }
  .filter-item.select {
    background: linear-gradient(268deg, #F6C164, #F6A11C);
  }
}
</style>
