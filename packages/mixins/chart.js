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
    chartOption() {
      Object.keys(this.options).forEach(opt => {
        this.defaultOption[opt] = this.options[opt]
      })
      return this.defaultOption
    }
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
      this.chart = echarts.init(document.getElementById("chart"));
      this.chart.setOption(this.chartOption);
    },
    updateChart() {
      this.chart.setOption(this.chartOption)
    },
    resizeCanvas() {
      $("._fe-chart").css("width", $("._fe-wrap").width())
      $("._fe-chart").css("height", $("._fe-wrap").height())
    },
  }
}