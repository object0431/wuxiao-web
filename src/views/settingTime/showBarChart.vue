<template>
    <div class="showBarChart-page">
        <div class="tipClick">点击下方"闪耀值/立项数/成果总数",可"显示/隐藏"对应的指标图表</div>
        <MainBarChart :reportInfoSelList="reportInfoSelList"></MainBarChart>
    </div>
  </template>
  
  <script>
import MainBarChart from '@/components/workbench/mainBarChart.vue'
import { achievementQuery,teamInfoReportInfoSel } from '@/assets/api/workbench/trainingStaff.js'

  export default {
    components: {
    MainBarChart,
  },
    data() {
      return {
        reportInfoSelList:{},
      }
    },
    created() {
        this.getTeamInfoReportInfoSel()
    },
    methods: {     
        async getTeamInfoReportInfoSel(){
            let this_ = this;
            const res = await teamInfoReportInfoSel()
            if(res.rspCode == '0000' && res.rspBody && res.rspBody.length > 0){
                let  dataAxis=[],achievementCountList=[],achievementBaseCountList=[],shineValueList=[];
                res.rspBody.forEach((item,index) => {
                dataAxis.push(item.teamName?item.teamName:""+index)
                achievementCountList.push(item.achievementCount?item.achievementCount:0)
                achievementBaseCountList.push(item.achievementBaseCount?item.achievementBaseCount:0)
                shineValueList.push(item.shineValue?item.shineValue:0)
                });
                this.reportInfoSelList = {
                dataAxis:dataAxis,
                achievementCountList:achievementCountList,
                achievementBaseCountList:achievementBaseCountList,
                shineValueList:shineValueList,
                }
            }else{
                this.reportInfoSelList = {
                dataAxis:[],
                achievementCountList:[],
                achievementBaseCountList:[],
                shineValueList:[],
                };
            }
        },
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .showBarChart-page {
    background: #ffffff;
    padding: 20px 20px;
    height: calc(100% - 118px);
    width: calc(100% - 40px);
    .tipClick{
      text-align: center;
      margin-bottom: 10px;
      color: red;
      font-size: 12px;
    }
  }

  </style>
