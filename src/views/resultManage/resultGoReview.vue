<template>
  <div class="talentReviewDetail-page">
    <div class="head-title">评审</div>
    <div class="main-content">
      <el-form
          ref="form"
          :rules="rule"
          :model="form"
          label-position="right"
          label-width="110px"
          class="form"
      >
        <!-- 基础信息 -->
        <div class="container" style="padding-top: 0px;padding-bottom: 80px;">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="item.taskItemName +'  ' +item.score +'分'"
                              :name="item.taskItemId"
                              v-for="(item,index) in criterionList"
                              :key="'criterionList_' + index">

              <el-table v-loading="tableLoading[item.taskItemId] || false"
                        @sort-change="sortChange(item.taskItemId,$event)"
                        :data="tableData[item.taskItemId] || []"
                        style="width: 100%">
                <el-table-column prop="staffName" label="姓名"></el-table-column>
                <el-table-column prop="companyName" label="单位"></el-table-column>
                <el-table-column prop="deptName" label="部门"></el-table-column>
                <el-table-column prop="talentLevelName" label="人才级别"></el-table-column>
                <el-table-column prop="fileName" label="举证材料">
                  <template slot-scope="scope">
                    <a style="color: red;text-decoration: underline;"
                       @click="downloadFileView(scope.row.attachName,scope.row.fileName,scope.row.staffName)">
                      {{ scope.row.fileName }}
                    </a>
                  </template>
                </el-table-column>
                <el-table-column prop="score"
                                 label="评分"
                                 sortable="custom"
                                 width="180">
                  <template slot-scope="scope">
                    <el-input type="text" v-model="scope.row.score"
                              oninput="if(!/^[0-9]+$/.test(value)) value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');if(value>100)value=100;if(value<0)value=null;if(value<0)value=null;if((value[0] == 0 && value[1] > 0) || value == '00')value=value.slice(1);"/>
                  </template>
                </el-table-column>
              </el-table>

<!--              <el-pagination background @current-change="handleCurrentChange(item.taskItemId)"-->
<!--                             @size-change="handleSizeChange(item.taskItemId)"-->
<!--                             :current-page="pageParam[item.taskItemId].pageNum"-->
<!--                             :page-size="pageParam[item.taskItemId].pageSize"-->
<!--                             layout="prev, pager, next, sizes, total"-->
<!--                             :total="pageParam[item.taskItemId].total" style="text-align: right; margin-top: 10px">-->
<!--              </el-pagination>-->
            </el-collapse-item>
          </el-collapse>
        </div>

        <footer>
          <div class="operation">
            <div class="operation-text">年审评审</div>
            <div class="operation-btn">
              <el-button class="minorGrayButton" @click="goBack" style="margin-right: 20px;">返回</el-button>
              <el-button
                  class="mainRedButton"
                  style="margin-right: 30px;"
                  @click="goSave"
              >暂存</el-button>
              <el-button
                  class="mainRedButton"
                  style="margin-right: 30px;"
                  @click="goReview"
              >提交</el-button>

              <!-- <el-button
                  class="mainRedButton"
                  style="margin-right: 30px;"
                  @click="downFile"
              >附件下载</el-button> -->
            </div>
          </div>
        </footer>

      </el-form>
    </div>
  </div>
</template>

<script>
import {
  queryReviewRecommen,
  queryRecommendItem,
  goExamineScore,
  downloadRecommendAttach,
  downloadFileView
} from "@/assets/api/resultManage";
import flowTips from "@/components/flowTips/flowTips.vue";
import {exportBlobFile} from "@/utils/common";

export default {
  name: "detail",
  components:{flowTips},
  created(){
    this.talentLevel=this.$route.query.talentLevel
    this.majorLine=this.$route.query.majorLine
    if(this.talentLevel && this.majorLine){
      this.queryItem()
    }
  },
  mounted() {
  },
  data(){
    return{
      form:{},
      reviewId:'',
      type:'add',
      qualifyRet0:'',
      content0:'',
      qualifyRet1:'',
      content1:'',
      rule:{},
      empName:'',
      companyName:'',
      talentLevel:'',
      criterionList:[],
      currentLink:'',
      lastYearEvalRet:'',
      handleVisable:false,
      flowList:[],
      majorLine:"",
      test:[],
      isAllScore:false,
      isDisabled:false,
      tableLoading:{},
      tableData:{},
      activeNames:[],
      pageParam: {
      },
    }
  },
  methods:{
    async queryItem() {
      const res = await queryRecommendItem(this.majorLine, new Date().getFullYear().toString(), {})
      this.criterionList = res.rspBody
      res.rspBody.forEach(item=>{
        this.activeNames.push(item.taskItemId)
        this.pageParam[item.taskItemId] = {
          pageNum: 1,
          pageSize: 200,
          total:0,
        }
        this.$forceUpdate();
        this.qurryDeatil(item.taskItemId)
      })
    },
    async qurryDeatil(taskItemId){
      let params = {
        ...this.pageParam[taskItemId],
        reqParam: {
          taskItemId: taskItemId,
          talentLevel:this.talentLevel,
        }
      }
      const res=await queryReviewRecommen(params)
      if (res.rspCode=="0000"){
        this.tableData[taskItemId] = res.rspBody.list
        this.pageParam[taskItemId].total = res.rspBody.total
        this.tableLoading[taskItemId] = false;
        this.$forceUpdate();
      }
    },
    // 输入值变化
    changeOrg(item,index,ind,e){
        this.$forceUpdate()
        const reg =/^([0-9]*)(\.\d)?$/
        if(!e){
          return
        }
        let value=Number(e)
        let tempScor=parseInt(item.score)
        if(tempScor<value){
          this.$message.info("评审评分不能高于评价分值"+ item.score)
          this.test[index].recommendList[ind].score=""
          return
        }
        if(!reg.test(value)) {
          this.$message.info("请输入最多1位小数的数字")
          this.test[index].recommendList[ind].score=""
          return
        }
        setTimeout(()=>{
          let list=JSON.parse(JSON.stringify(this.test[index].recommendList))
          let res=list.sort(function (a,b){
            return b['score']-a['score']
          })
          this.test[index].recommendList=res
        },1000)
    },
    async downloadFileView(fileName,attachName,staffName){
      this.$message.success('正在下载，请稍后')
      
      const res = await downloadFileView(fileName)
      exportBlobFile(res,staffName+'_'+attachName)
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.queryData();
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.queryData();
    },
    sortChange(taskItemId, {prop, order}){
      this.tableData[taskItemId].sort(this.compare(prop, order));
    },
    handleChange(val) {
      
    },
    /**
     * 排序比较
     * @param {string} propertyName 排序的属性名
     * @param {string} sort ascending(升序)/descending(降序)
     * @return {function}
     */
    compare(propertyName, sort) {
      // 判断是否为数字
      function isNumberV(val) {
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if (regPos.test(val) || regNeg.test(val)) {
          return true;
        } else {
          return false;
        }
      }

      return function (obj1, obj2) {
        let value1 = obj1[propertyName];
        let value2 = obj2[propertyName];
        // 数字类型的比较
        if(isNumberV(value1) || isNumberV(value2)){
          if (sort === "ascending") {
            return value1 - value2;
          } else {
            return value2 - value1;
          }
        }
        // 布尔值的比较：利用减法-转化true 和 false
        // true => 1   false ⇒ 0
        // true-false => 1  false-true => -1
        // 下面方法是按照先false后true的顺序排序，如果想先true后false，调整value1-value2 和  value2 - value1的顺序即可
        else if(_.isBoolean(value1) && _.isBoolean(value2)){
          if (sort === "ascending") {
            return value1 - value2;
          } else {
            return value2 - value1;
          }
        }
        // 字符比较使用localeCompare()
        else {
          const res = value1.localeCompare(value2, "zh");
          return sort === "ascending" ? res : -res;
        }
      };
    },
    goBack(){
     this.$router.back()
    },
    async goSave(){
      let gradeItemList=[]
      if(this.criterionList && this.criterionList.length){
        this.criterionList.some((item,index)=>{
          let recommendList=this.tableData[item.taskItemId]
          if(recommendList && recommendList.length){
            recommendList.map((it,index)=>{
              let tempObj={}
              tempObj.evaluateType=item.taskItemId
              tempObj.reviewId=it.reviewId
              if(it.score!=""){
                tempObj.score=it.score
              }
              gradeItemList.push(tempObj)
            })
          }
        })
        let obj={gradeItemList,"operType": "zc"}
        const res=await goExamineScore(obj)
        if(res.rspCode == "0000") {
          this.$message.success("暂存成功!")
          this.$router.push('/talentAudit/examineList')
        }
      }
    },
    async goReview(){
      let gradeItemList=[],isRead=true
      if(this.criterionList && this.criterionList.length){
        this.criterionList.some((item,index)=>{
          let flag=true
          let recommendList=this.tableData[item.taskItemId]
          if(recommendList && recommendList.length){
            recommendList.some((it,index)=>{
              let tempObj={}
              if(it.score=="" || !it.score){
                this.$message.info(it.staffName +"评分不完整，请继续评分")
                gradeItemList=[]
                flag=false
                isRead=false
                return true
              }
              tempObj.evaluateType=item.taskItemId
              tempObj.score=it.score
              tempObj.reviewId=it.reviewId
              gradeItemList.push(tempObj)
            })
          }
          if(!flag){
            isRead=false
            return true
          }
        })
        if(isRead){
          this.$confirm(
            `确认要提交吗`,
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }
          ).then(async () => {
            let obj={gradeItemList,"operType": "bl"}
            const res=await goExamineScore(obj)
              if(res.rspCode == "0000") {
                this.$message.success("评审成功!")
                this.$router.push('/talentAudit/examineList')
              } else {
                this.$message.error(res.rspDesc);
              }
          })
        }
      }
    },
    async downFile(){
      this.$message.success('正在下载，请稍后')
      
      //let reviewId=this.reviewId
      //let fileName=this.form.reviewTitle
       // await downloadAttach(reviewId,'人才评审附件')
      this.isDisabled = true
      setTimeout(() => {
        this.isDisabled = false
      }, 5 * 60 * 1000)
      const res=await downloadRecommendAttach(
        this.talentLevel,
        this.majorLine
      )

     // exportBlobFile(res,'人才评审附件')
    },

  },

}
</script>

<style lang="scss" scoped>
.talentReviewDetail-page{
  box-sizing: border-box;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  .container {
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    padding: 20px 0;

    .text {
      font-family: PingFang-SC-Heavy;
      font-size: 14px;
      color: #040404;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 800;
      padding-bottom: 10px;
    }
    p{
      text-decoration:underline;
      color: #0000EE;
      &:hover{
        cursor: pointer;
      }
    }
  }

  footer {
    .operation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .operation-text{
        color: #333;
        font-size: 14px;
        margin-left: 20px;
        font-weight: 800;
      }

      .operation-btn {
        margin-top: 12px;
        margin-right: 12px;
      }
    }
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
    height: 80px;
    line-height: 80px;
    position: fixed;
    bottom: 0;
    left: 0;
    left: 300px;
    width: calc(100vw - 300px);
  }
}

</style>
