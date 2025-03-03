<template>
  <div :id="id" :style="{width:'100%',height:height}"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

export default {
  name: 'BarItem',
  props: {
    height: { type: String },
    id: { type: String },
    dataSet: { type: Object, default: {} },
    color: { type: String }
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    dataSet: { //深度监听，可监听到对象、数组的变化
      handler(val) {
        if (val.y && val.y.length > 0) {
          if (this.myChart != null && this.myChart != '' && this.myChart != undefined) {
            this.myChart.dispose() //销毁
          }
          if (document.getElementById(this.id)) {
            this.myChart = echarts.init(document.getElementById(this.id));
            let option = {
              color: this.color,
              animation: false,
              grid: {
                bottom: 20,
                left: 40,
                top: 25,
                right: 20
              },
              tooltip: {
                show: true,
                position: 'top',
                borderWidth: 0,
                textStyle: '#333333',
                extraCssText: 'box-shadow: 0 0 3px rgba(150,150,150, 0.7);',
                formatter: function (params) {
                  return params.value + '万元';
                }
              },
              xAxis: {
                type: 'category',
                data: val.x,
                axisTick: { show: false },
                splitLine: { show: false }
              },
              yAxis: {
                type: 'value',
                show: false
              },
              series: [
                {
                  data: val.y,
                  type: 'bar',
                  barWidth: 20,
                  symbolSize: 6
                }
              ]
            };
            this.myChart.setOption(option);
          }
        }
      },
      deep: true
    }
  },
  mounted() {

  },
};
</script>

<style lang="scss" scoped>

</style>