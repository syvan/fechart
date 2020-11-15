<template>
  <div class="_fe-wrap-pie _fe-wrap">
    <div :class="legendSlotClass" v-if="$slots.legend">
      <slot name="legend"></slot>
    </div>
    <div :class="['titleSlot', 'titleSlot-'+piePos, titleSlotClass]" v-if="$slots.title">
      <slot name="title"></slot>
    </div>
    <div :class="'legend-'+legendPos" v-if="legendPos && !$slots.legend">
      <div class="legend-item" v-for="(pd,key) in dataList" :key="key">
        <div class="icon" :style="'background-color: '+pd.color"></div>
        <div class="category">{{pd.name}}</div>
        <div class="per">{{getRatio(pd.value)}}</div>
      </div>
    </div>
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
    // 图表数据
    dataList: {
      type: Array,
      default: () => []
    },
    // 图表位置
    piePos: {
      type: String,
      default: "left"
    },
    // 图例位置
    legendPos: {
      type: String,
      default: "right"
    },
    // 图例slot样式
    legendSlotClass: {
      type: String,
      default: ""
    },
    // 标题slot样式
    titleSlotClass: {
      type: String,
      default: ""
    },
    // 是否开启高亮
    showEmphasis: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 图表对象
      chart: null,
      // 图表默认配置
      defaultOption: {
        series: [
          {
            type: 'pie',
            silent: true,
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            data: [],
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            normal: {
                borderWidth: 100,
                borderColor: '#ffffff',
            },
            itemStyle: { // 此配置
              normal: {
                borderWidth: 1,
                borderColor: '#ffffff',
              }
            },
            
          }
        ]
      },
    };
  },
  computed: {
    // pie图数据处理
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
    },
    // pie图位置
    piePosition() {
      if(!this.piePos)return ["50%", "50%"]
      switch (this.piePos) {
        case "left":
          return ["25%", "50%"]
        case "right":
          return ["75%", "50%"]
        case "top":
          return ["50%", "45%"]
        case "bottom":
          return ["50%", "55%"]
        default:
          return ["50%", "50%"]
      }
    },
    // 判断是否插入legend
    hasLegend() {
      return this.$slots.legend
    }
  },
  watch: {
    // 数据变化实时更新
    pieDataList (val) {
      if (!val || val.length) return
      this.updatePieData(val)
    },
    // 图表位置实时更新
    piePosition (val) {
      if (!val || val.length) return
      this.updatePiePosition(val)
    }
  },
  methods: {
    // 刷新图表数据
    updatePieData (val) {
      this.chart.setOption({
        series: [{
          data: val.seriesData
        }],
        color: val.colorData
      })
    },
    // 刷新图表位置
    updatePiePosition (val) {
      this.chart.setOption({
        series: [{
          center: val
        }]
      })
    },
    // 占比计算
    getRatio(single) {
      let total = 0
      this.dataList.forEach(e=>{
        total += Number(e.value)
      })
      return Number(Number(single)/total).toFixed(2) + '%'
    }
  },
  mounted() {
    this.updatePieData(this.pieDataList)
    this.updatePiePosition(this.piePosition)
  },
  destroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
._fe-wrap-pie {
  position: relative;
  width: 100%;
  height: 100%;
}
._fe-chart {
  &-pie {
    width: 100%;
    height: 100%;
    display: block;
  }
  &-pie-left {
    width: 50%;
    height: 100%;
    display: block;
  }
  &-pie-right {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    display: block;
  }
  &-pie-top {
    width: 100%;
    height: 50%;
    display: block;
  }
  &-pie-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    display: block;
  }
}
.legend-right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  .legend-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222222;
    font-weight: 400;
    font-size: 1rem;
    .icon {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.13rem;
    }
    .category {
      margin-left: 0.5rem;
    }
    .per {
      margin-left: 2rem;
    }
  }
}
.legend-left {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80%;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);

  .legend-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222222;
    font-weight: 400;
    font-size: 1rem;
    .icon {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 0.13rem;
    }
    .category {
      margin-left: 0.5rem;
    }
    .per {
      margin-left: 2rem;
    }
  }
}
.titleSlot {
  color: #212223;
  font-size: 1rem;
  height: 1rem;
  text-align: center;
  font-weight: 400;
  color: #212223;
  position: absolute;

  &-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  &-left {
    top: 50%;
    left: 25%;
    transform: translate(-50%,-50%);
  }
  &-right {
    top: 50%;
    right: 8%;
    transform: translate(-50%,-50%);
  }
  &-top {
    top: 45%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  &-bottom {
    bottom: 38%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}

</style>
