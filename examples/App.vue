<template>
  <div id="app">
    <div class="pie">
      <fe-pie :dataList="pie.data" chartId="pie" piePos="right" legendPos="left">
        <slot slot="title">资产分布</slot>
      </fe-pie>
    </div>
    <div class="area">
      <fe-area :dataList="area.data" chartId="area" :legenfList="area.legend">
      </fe-area>
    </div>
    <div class="vbar">
      <fe-vbar :dataList="vbar.data" :nameList="vbar.name" chartId="vbar">
      </fe-vbar>
    </div>
    <div class="mix">
      <fe-mix chartId="mix" :dataListA="mix.dataA" chartType="sin" :dataListB="mix.dataB">
      </fe-mix>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      pie: {
        data: [
          {value: 335, name: '权益类', color: 'red'},
          {value: 310, name: '固收类', color: 'green'},
          {value: 234, name: '现金类', color: 'blue'}
        ]
      },
      area: {
        data: [
          {
            date: '2020-04-12',
            value: 12
          },
          {
            date: '2020-04-13',
            value: 14
          },
          {
            date: '2020-04-14',
            value: 1.34
          },
          {
            date: '2020-04-15',
            value: 5
          },
          {
            date: '2020-04-16',
            value: 20
          }
        ],
        legend: [
          // {type:"rect", label:"legend", rate: 2.3},
          {type:"point", label:"legend", rate: -2.3},
          {type:"point", label:"legend", rate: 2.3}
        ],
        // color: ['red']
      },
      vbar: {
        data: [-7,-9,2,3,5,6],
        name: [{name: "沪深300"},{name: "中证500"},{name: "创业板指"},{name: "MSCI"},{name: "证券公司"},{name: "中证银行"}]
      },
      mix: {
        dataA: [
          {
            date: '0412',
            value: 12
          },
          {
            date: '0413',
            value: 14
          },
          {
            date: '0414',
            value: 10
          },
          {
            date: '0415',
            value: 50
          },
          {
            date: '0416',
            value: 20
          }
        ],
        dataB: [
          {
            date: '0412',
            value: 120
          },
          {
            date: '0413',
            value: 140
          },
          {
            date: '0414',
            value: 134
          },
          {
            date: '0415',
            value: 50
          },
          {
            date: '0416',
            value: 200
          }
        ],
      },
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.pie {
  width: 100%;
  height: 200px;
}
.area {
  margin-top: 50px;
  overflow: hidden;
  width: 100%;
  height: 300px;
}
.vbar {
  margin-top: 50px;
  width: 100%;
}
.mix {
  margin-top: 50px;
  width: 100%;
}
</style>
