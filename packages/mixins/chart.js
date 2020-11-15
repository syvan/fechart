import echarts from "echarts"
import $ from "jquery"
export default {
  props: {
    // 图表id
    chartId: {
      type: String,
      default: "chart"
    },
    // 图表配置
    options: {
      type: Object,
      default: () => ({})
    },
    // 图表位置 left right top bottom
    chartPos: {
      type: String,
      default: "left"
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  created() {
    let that = this
    $(window).resize(function(){
      that.resizeCanvas()
    })
  },
  mounted() {
    /** 调用图表初始化函数 */
    this.initChart()
    this.updateChart(this.chartOption)
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
  computed: {
    // 图表总配置
    chartOption() {
      Object.keys(this.options).forEach(opt => {
        this.defaultOption[opt] = this.options[opt]
      })
      return this.defaultOption
    },
  },
  watch: {
    chartOption(val) {
      this.updateChart(val)
    }
  },
  methods: {
    /** 初始化图表 */
    initChart() {
      //eslint-disable-next-line
      this.chart = echarts.init(document.getElementById(this.chartId));
      
      this.chart.setOption(this.chartOption);
    },
    updateChart(val) {
      this.chart.setOption(val)
    },
    resizeCanvas() {
      $("._fe-chart").css("width", $("._fe-wrap").width())
      $("._fe-chart").css("height", $("._fe-wrap").height())
    },
  }
}