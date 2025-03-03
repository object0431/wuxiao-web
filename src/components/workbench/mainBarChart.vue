<template>
    <div id="mainBarChartCont" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
export default {
    name: 'mainBarChart',
    props: {
        reportInfoSelList: {
            type: Object,
            default: {
                dataAxis: [],
                achievementCountList: [],
                achievementBaseCountList: [],
                shineValueList: [],
            },
        }
    },
    data() {
        return {
        }
    },
    watch: {
        "reportInfoSelList.dataAxis"() {
            this.updateEchart();
        }
    },
    mounted() {
    },
    methods: {
        updateEchart() {
            let myChart = echarts.init(document.getElementById('mainBarChartCont'));
            // const labelOption = {
            //     show: true,
            //     position: "insideBottom",
            //     distance: "15",
            //     align: "left",
            //     verticalAlign: "middle",
            //     rotate: "90",
            //     formatter: '{c}  {name|{a}}',
            //     fontSize: 16,
            //     rich: {
            //         name: {}
            //     }
            // };
            // 
            // const option = {
            //     grid: {
            //         left: '3%',
            //         right: '4%',
            //         bottom: '3%',
            //         containLabel: true
            //     },
            //     tooltip: {
            //         trigger: 'axis',
            //         axisPointer: {
            //             type: 'shadow'
            //         }
            //     },
            //     legend: {
            //         data: ['立项数', '成果总数', '闪耀值']
            //     },
            //     xAxis: [
            //         {
            //             type: 'category',
            //             axisTick: { show: false },
            //             data: JSON.parse(JSON.stringify(this.reportInfoSelList.dataAxis)),
            //             axisLabel: {
            //                 interval: 0,
            //                 rotate: 0
            //             }
            //         }
            //     ],
            //     yAxis: [
            //         {
            //             type: 'value'
            //         }
            //     ],
            //     // 
            //     series: [
            //         {
            //             name: '立项数',
            //             type: 'bar',
            //             barGap: 0,
            //             // label: labelOption,
            //             emphasis: {
            //                 focus: 'series'
            //             },
            //             data: JSON.parse(JSON.stringify(this.reportInfoSelList.achievementCountList))
            //         },
            //         {
            //             name: '成果总数',
            //             type: 'bar',
            //             // label: labelOption,
            //             emphasis: {
            //                 focus: 'series'
            //             },
            //             data: JSON.parse(JSON.stringify(this.reportInfoSelList.achievementBaseCountList))
            //         },
            //         {
            //             name: '闪耀值',
            //             type: 'bar',
            //             // label: labelOption,
            //             emphasis: {
            //                 focus: 'series'
            //             },
            //             data: JSON.parse(JSON.stringify(this.reportInfoSelList.shineValueList))
            //         },
            //     ]
            // };
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: JSON.parse(JSON.stringify(this.reportInfoSelList.dataAxis)),
                        axisLabel: {
                            interval: 0,
                            rotate:60
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '闪耀值',
                        type: 'bar',
                        stack: 'Search Engine',
                        emphasis: {
                            focus: 'series'
                        },
                        data: JSON.parse(JSON.stringify(this.reportInfoSelList.shineValueList))
                    },
                    {
                        name: '立项数',
                        type: 'bar',
                        stack: 'Search Engine',
                        barWidth:"50%",
                        emphasis: {
                            focus: 'series'
                        },
                        data: JSON.parse(JSON.stringify(this.reportInfoSelList.achievementCountList))
                    },
                    {
                        name: '成果总数',
                        type: 'bar',
                        stack: 'Search Engine',
                        emphasis: {
                            focus: 'series'
                        },
                        data: JSON.parse(JSON.stringify(this.reportInfoSelList.achievementBaseCountList))
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>

<style lang="scss" scoped></style>