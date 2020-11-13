import $ from "jquery"
import echarts from "echarts"
export default {
  data() {
    return {
      chart: null,
    }
  },
  created() {
    $(window).resize(function(){
      this.resizeCanvas()
    })
  },
  mounted() {
    /** 调用图表初始化函数 */
    this.initChart()
    /** 初始化图表尺寸 */
    this.resizeCanvas()
  },
  destroyed() {
    /** 销毁图表对象 */
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    /** 初始化图表 */
    initChart() {
      //eslint-disable-next-line
      this.chart = echarts.init(document.getElementById("chart"));
      this.chartOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
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
      this.chart.setOption(this.chartOption);
    },
    resizeCanvas() {
      $("._fe-chart").css("width", $("._fe-wrap-pie").width())
      $("._fe-chart").css("height", $("._fe-wrap-pie").height())
    },
  }
}