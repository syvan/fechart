<template>
  <div id="app">
    <div class="pie">
      <fe-pie :dataList="pie.data" chartId="pie">
        <slot slot="title">这是标题</slot>
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
      <fe-mix chartId="mix">
        <slot slot="tip">
          <div class="left">亿元</div>
          <div class="right">百万</div>
        </slot>
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
          {value: 335, name: '直接访问', color: 'black'},
          {value: 310, name: '邮件营销', color: 'green'},
          {value: 234, name: '联盟广告', color: 'blue'},
          {value: 234, name: '联盟广告', color: 'blue'},
          {value: 234, name: '联盟广告', color: 'blue'}
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
          {type:"rect", label:"legend", rate: 2.3},
          {type:"circle", label:"legend", rate: -2.3}
        ]
        // color: ['red']
      },
      vbar: {
        data: [-7,-9,2,3,5,6],
        name: [{name: "沪深300"},{name: "中证500"},{name: "创业板指"},{name: "MSCI"},{name: "证券公司"},{name: "中证银行"}]
      }
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
