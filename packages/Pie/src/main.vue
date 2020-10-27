<template>
  <div class="_fe-pie-wrap">
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
  name: "fe-pie",
  props: {
    xData: {
      type:Array
    },
    max: {
      type: Number,
      default: 200
    },
    min: {
      type: Number,
      default: 10
    },
    dataList: {
      type: Array
    },
    seriesType: {
      type: String
    }
  },
  data() {
    return {
      chart: null,
      option: {}
    };
  },
  methods: {
    /** 初始化图表 */
    initChart() {
      //eslint-disable-next-line
      this.chart = echarts.init(document.getElementById("chart"));
      this.option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      };
      this.chart.setOption(this.option);
    }
  },
  mounted() {
    /** 调用图表初始化函数 */
    this.initChart();
  },
  /** 销毁图表对象 */
  destroy() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fe-pie-wrap {
  width: 400px;
  height: 400px;
}
</style>
