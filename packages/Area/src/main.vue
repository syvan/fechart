<template>
  <div class="_fe-wrap-area _fe-wrap">
    <div class="legend" v-if="!$slots.legend">
      <div class="legend-wrap" v-for="(li,key) in legenfList" :key="key">
        <div :class="'symbol-'+li.type" :style="'background-color: '+chartOption.color[0]"></div>
        <div class="label">{{li.label}}</div>
        <div :class="['rate', li.rate>=0?'up':'down']">{{(li.rate)}}%</div>
      </div>
    </div>
    <slot name="legend"></slot>
    <div class="_fe-chart-area _fe-chart" :id="chartId"></div>
    <div class="xLbael">
      <div class="pre" v-if="showRowLabel">{{rowLabel.pre}}</div>
      <div class="last" v-if="showRowLabel">{{rowLabel.last}}</div>
      <slot name="xLabel" v-else></slot>
    </div>
  <div class="filter-wrap">
    <div class="filter-container"  v-if="showfilter">
      <div :class="['filter-item',selectIndex===key?'select':'']" v-for="(ci,key) in filterTypeList" :key="key" @click="toggelFilter(key)">
        {{ci.label}}
      </div>
    </div>
    <slot name="filter" v-else></slot>
  </div>
  </div>
</template>

<script>
import chartMix from "../../mixins/chart"
import echarts from "echarts"
export default {
  name: "fe-area",
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
    // 渐变颜色
    areaColor: {
      type: Array,
      default: () => [
        {offset: 0, color: '#000'},
        {offset: 1, color: '#ddd'}
      ]
    },
    // 显示x轴label
    showRowLabel: {
      type: Boolean,
      default: true
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
        {type: "j6y", label: '近6月'},
        {type: "j1n", label: '近1年'},
        // {type: "j2n", label: '近2年'},
        // {type: "j3n", label: '近3年'},
        // {type: "j5n", label: '近5年'},
        {type: "all", label: '成立以来'},
      ]
    },
    // 图例数据
    legenfList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 图表对象
      chart: null,
      // 图表默认配置
      defaultOption: {
        grid: {
          top: "18%",
          right: "5%",
          bottom: "5%",
          left: "18%"
        },
        xAxis: {
          show : false,
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLine:{
            show:false
          },
          axisTick:{
            show:false
          },
        },
        yAxis: {
          type: 'value',
          axisLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLabel: {
            formatter: function(value){
              return Number(value).toFixed(2) + "%"
            }
          }
        },
        color: ["rgba(231, 88, 91, 1)"],
        series: [{
          symbol: 'none',
          label: {
              normal: {
                  position: 'inner'
              }
          },
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {offset: 0, color: 'rgba(255, 236, 235, 1)'},
              {offset: 1, color: 'rgba(255, 255, 255, 1)'}
            ])
          },
        }]
      },
      // 过滤指针
      selectIndex: this.filterIndex
    };
  },
  computed: {
    // area图数据处理
    areaDataList() {
      let rowData = [],  //x轴数据
          colData = [],  //y轴数据
          areaColor = this.areaColor   //面积颜色
      this.dataList.forEach(di => {
        rowData.push(di.date)
        colData.push(di.value)
      })
      return {
        rowData,
        colData,
        areaColor
      }
    },
    // 判断是否插入legend
    hasLegend() {
      return this.$slots.legend
    },
    // x轴label
    rowLabel() {
      if(!this.dataList || !this.dataList.length) return ""
      console.log("rowLabel", this.dataList[0].date)
      return {
        pre: this.formatDate(this.dataList[0].date),
        last: this.formatDate(this.dataList[this.dataList.length-1].date)
      }
    }
  },
  watch: {
    // 数据变化实时更新
    areaDataList (val) {
      if (!val || val.length) return
      this.updateareaData(val)
    },
    // 过滤指针实时更新
    filterIndex (val) {
      this.selectIndex = val
    }
  },
  methods: {
    // 刷新图表数据
    updateareaData (val) {
      console.log("this.areaDataList", val)
      this.chart.setOption({
        xAxis: [{
          data: val.rowData
        }],
        series: [{
          data: val.colData
        }],
      })
    },
    // 格式化日期
    formatDate (date) {
      return String(date).replace(/^(\d{4})[^0-9]*(\d{1,2})[^0-9]*(\d{1,2})$/, "$1-$2-$3")
    },
    // 切换过滤器
    toggelFilter (index) {
      this.selectIndex = index
      this.$emit("changeFilter", index)
    }
  },
  mounted() {
    this.updateareaData(this.areaDataList)
  },
  destroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
._fe-wrap-area {
  position: relative;
  width: 100%;
  height: 100%;
}
._fe-chart {
  &-area {
    width: 100% !important;
    height: 80% !important;
    display: block;
  }
}
.legend {
  position: absolute;
  width: 100%;
  height: 12%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .legend-wrap {
    margin-left: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    .symbol-circle {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .symbol-rect {
      width: 1rem;
      height: 0.5rem;
      border-radius: 5%;
    }
    .symbol-point {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 5%;
    }
    .label {
      margin-left: 0.5rem;
    }
    .rate {
      margin-left: 0.5rem;
    }
    .rate.up{
      color: rgba(222, 44, 44, 1);
      &::before {
        content: "+";
      }
    }
    .rate.down{
      color: green;
    }
  }
}
.xLbael {
  width: 80%;
  margin-left: 15%;
  // position: absolute;
  // bottom: 0;
  // right: 5%;
  // left: 50%;
  // transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: #666666;
}
.filter-wrap {
  font-size: 1rem;
  height: 2.1rem;
  margin-top: 0.5rem;
  .filter-container {
    display: flex;
    justify-content: stretch;
    height: 2.19rem;
    width: 90%;
    margin: 0 auto;
  }
  .filter-item {
    height: 2.1rem;
    box-sizing: border-box;
    padding: 0 0.2rem;
    line-height: 2.1rem;
    border: 1px solid rgba(232, 232, 232, 1);
  }
  .filter-item+.select {
    background-color: rgba(248, 248, 248, 1);
  }
}
</style>
