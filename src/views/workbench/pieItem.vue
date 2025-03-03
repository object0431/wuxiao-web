<template>
  <div :id="id" :style="{width:'100%',height:height}"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { ToolboxComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

export default {
  name: 'PieItem',
  props: {
    height: { type: String },
    id: { type: String },
    data: { type: Array, default: [] },
    color: { type: Array, default: [] }
  },
  data() {
    return {
      myChart: null
    }
  },
  watch: {
    data: {
      handler(val) {
        if (val.length > 0) {
          if (this.myChart != null && this.myChart != '' && this.myChart != undefined) {
            this.myChart.dispose() //销毁
          }
          if (document.getElementById(this.id)) {
            this.myChart = echarts.init(document.getElementById(this.id));
            let option = {
              color: this.color,
              toolbox: {
                show: true
              },
              legend: {
                itemWidth: 14,
                itemHeight: 14,
                orient: 'vertical',
                icon: 'circle',
                left: '65%',
                align: 'left',
                top: 'middle',
                textStyle: {
                  fontSize: 12,
                  fontFamily: 'PingFang SC',
                  fontWeight: 'bold',
                  color: '#333333',
                  lineHeight: 20
                },
                formatter: function (name) {
                  let value = '';
                  let str = '';
                  for (let i = 0, l = val.length; i < l; i++) {
                    if (val[i].name == name) {
                      str += `${name} : ${val[i].amountUse || val[i].amountNotUse
                        }万元 \n (占比 : ${val[i].value + '%'} )`;
                    }
                  }
                  return str;
                }
              },
              series: [
                {
                  name: '',
                  zlevel: 11,
                  type: 'pie',
                  radius: [20, 40],
                  label: { show: false },
                  emphasis: {
                    scale: true,
                    scaleSize: 10
                  },
                  data: val
                }
              ]
            }
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