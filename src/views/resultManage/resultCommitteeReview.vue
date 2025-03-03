<template>
  <div class="approval-applyQuery-page">
    <div class="head-title">项目成果评分<span style="color: #ff0000;">（单项总分100分，70-79 三档，80-89 二档，90-100 一档）</span></div>
    <el-table
      v-loading="tableLoading"
      :row-key="getRowKey"
      :data="tableData"
      :expand-row-keys="expandRowKeys"
      style="width: 100%"
      ref="tableref"
      :tree-props="{children: 'children'}"
      @expand-change="expandChangeHandler"
    >
      <el-table-column
        prop="projectName"
        show-overflow-tooltip
        label="项目名称"
        width="300"
      ><template slot-scope="scope"><a @click="clickLeft(scope.row)" :class="scope.row.score || scope.row.score===0 || (scope.row.children && scope.row.scoreCount == scope.row.children.length) ?'projectName':'complete'">{{scope.row.projectName}}</a></template></el-table-column>
      <el-table-column
        prop="innovationType"
        label="所属类别"
      ></el-table-column>
      <el-table-column
        prop="projectType"
        label="所属项目"
      ></el-table-column>
      <el-table-column
        prop="applierName"
        label="申请人"
      > </el-table-column>
      <el-table-column
        prop="projectDetail"
        label="详情"
        width="400"
      >
        <template
          slot-scope="scope"
        >
          <div v-if="scope.row.type !== 0 && scope.row.projectDetail">{{scope.row.projectDetail}}</div>
          <div v-if="scope.row.type == 0 && scope.row.appendixList && scope.row.appendixList.length>0" >
            <span style="color: #ff0000;font-weight: bold;">附件：</span>
            <span v-for="file in scope.row.appendixList" :key="file.fileName">
              <span style="color:#5991ff;text-decoration: underline;cursor: pointer;margin-right: 10px;" @click="downFile(file.fileName)">{{ file.originalFilename }}</span>
            </span>
          </div>
        </template> 
      </el-table-column>


      <el-table-column
        prop="avgScore"
        label="总分"
        width="220"
      > 
        <template
          slot-scope="scope"
        >
        <div v-if="scope.row.avgScore">{{scope.row.avgScore + ' （已评分项'+scope.row.scoreCount +'/总评分项7）' }}</div>
          <el-input
            type="text"
            placeholder="请评分"
            v-if="!scope.row.avgScore && scope.row.projectName !== '附件'"
            v-model="scope.row.score"
            oninput="if(!/^[0-9]+$/.test(value)) value=value.replace(/^0+(\d)|[^\d]+/g,'');if(value>100)value=100;if(value<0)value=null;if(value<0)value=null;"
          />
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pageParam.pageNum"
      :page-size="pageParam.pageSize"
      layout="prev, pager, next, total"
      :total="pageParam.total"
      style="text-align: right; margin-top: 10px;padding-bottom: 80px;"
    >
    </el-pagination>
    <addTalent
      :visible="visible"
      @closeModel="closeModel"
      @addTalent='addTalent'
    ></addTalent>
    <footer>
      <div class="operation-footer">
        <div class="operation-text"></div>
        <div class="operation-btn">
          <!-- <el-button
            class="minorGrayButton"
            @click="goBack"
          >返回</el-button> -->
          <el-button
            class="minorRedButton"
            @click="saveInitiation('form')"
          >暂存</el-button>
          <el-button
            class="mainRedButton"
            style="width: 100px"
            @click="submitApply('form')"
          >提交
          </el-button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {
  resultZgSearch,
  resultAchievementReview,
  resultSearchDetail,
  downloadFileView,
} from "@/assets/api/resultManage";
import { downloadFile } from "@/assets/api/common";
import addTalent from "@/components/approval/addTalent.vue";
import { queryPublicParams } from "@/assets/api/common";
import resultDetailHandle from "@/components/trainingHandleModal/resultDetailHandle.vue";
import acievementScore from "@/components/trainingHandleModal/acievementScore.vue";
import { mapMutations } from "vuex";
export default {
  name: "applyQuery",
  components: { addTalent, resultDetailHandle,acievementScore },
  data() {
    return {
      type: "add",
      visible: false,
      //表单查询
      form: {},
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 100,
        total: 0,
      },
      handleVisable: false,
      //列表数据
      tableLoading: false,
      tableData: [],
      selectList: [],
      scoreList: [],
      // 所属项目：（系统类、流程类、成本与管理类、服务支撑类）
      programList: [],
      pendingCode: "",
      projectId: "",
      detailForm: {},
      form: {appendixList:[]},
      resultType:"",
      showScore:false,
      achievementItem:{},
      currentOpenId:'',
      expandRowKeys:[],
      getRowKey(row) {
        return row.id;
      },
      expandedNode:null
    };
  },
  created() {
    this.pendingCode = this.$route.query.pendingCode || "";
    this.resultType = this.$route.query.type || '';
    this.queryApprovalApply();
  },
  methods: {
    ...mapMutations(["saveRemoveCheckTabs"]),
    recursive(data) {
      const setId = (list) => {
        list.forEach((item) => {
          item.id = item.projectId;
          if (item.itemList) {
            setId(item.itemList);
          }
        });
      };
      setId(data);
    },
    async downFile(fileName){
      this.$message.info('正在下载，请稍后')
       await downloadFile(fileName)
    },
    //查询
    async queryApprovalApply() {
      this.tableLoading = true;
      let param = {
        pageNum: this.pageParam.pageNum,
        pageSize: this.pageParam.pageSize,
        reqParam: { achievementType:this.resultType||'' }
      };
        param.reqParam = { achievementType:this.resultType };
      if (this.pendingCode && this.pendingCode.length > 1) {
        param.reqParam.pendingCode = this.pendingCode;
      }

      const res = await resultZgSearch(param);
      if (res.rspCode == "0000") {
        
        this.tableLoading = false;
        // res.rspBody.modelPageInfo.list[0].appendixList=[]
        let tempDatas = res.rspBody.modelPageInfo.list || [];
        let index = 0;
        for (let obj of tempDatas) {
          index++;
          obj.type = 0;
          obj.id = obj.projectId;
          let children = obj.itemList.filter((item) => {
            return item.itemCode !== "QT";
          });
          let j = 0;
          for (let item of children) {
            j++;
            item.id = obj.projectId + '_' + j;
            item.projectName = item.itemName;
            item.projectDetail = item.itemValue;
            item.score=item.score ? parseInt(item.score):''
          }
          // 
          obj.children = children;
        }
        
        this.tableData = tempDatas;
        console.log(this.tableData,'==')
        this.form.appendixList = res.rspBody.appendixList || [];
        this.pageParam.total = res.rspBody.modelPageInfo.total;
        // this.$refs.scoreTable.setCheckedKeys([this.tableData[0].id]);
        // if(this.tableData && this.tableData.length>0){
        //   this.currentOpenId=this.tableData[0].id
        //   this.expandRowKeys.push(this.currentOpenId)
        // }
      } else {
        this.tableLoading = false;
        this.$message.error(res.rspDesc);
      }
    },
    // 小数点判断
    changeBenifit(e,it) {
      let reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
      if ((!reg.test(e.score) && e.score !== '0.0' && e.score !== '0.00') && (e.score !== 0 && e.score !== '0')) {
        this.$message.error(it.projectName + '->'+e.itemName+" 评分数值只能输入数字且最多2位小数点");
        return false;
      } else {
        return true;
      }
    },
    cateNameChange(val) {
      this.form.ca = "";
    },
    proNameChange(val) {
      this.form.ca = "";
    },
    //返回
    // goBack() {
    //   this.$router.go(-1);
    // },
    // 暂存
    async saveInitiation() {
      let temp=false
      
      let itemList = [];
      for(let i=0;i<this.tableData.length;i++){
        let tempObj = {};
        tempObj.projectId = this.tableData[i].projectId;
        let itemScoreList = [];
        for (const subItem of this.tableData[i].children) {
          if ((subItem.score && parseInt(subItem.score) > 0) || subItem.score === '0' || subItem.score === 0) {
            console.log(subItem,'===')
            // if (!this.changeBenifit(subItem,this.tableData[i])) {
            //   itemList = [];
            //   temp = true
            //   break;
            // }
            itemScoreList.push({
              itemCode: subItem.itemCode,
              itemName: subItem.itemName,
              // score: subItem.score || "",
              score: subItem.score || subItem.score === 0 ? subItem.score: "",
            });
          }
        }
        if(temp){
          break
        }
        tempObj.itemScoreList = itemScoreList;
        itemList.push(tempObj);
      }
      // this.tableData.map((it, index) => {
      //   let tempObj = {};
      //   tempObj.projectId = it.projectId;
      //   let itemScoreList = [];
      //   for (const subItem of it.children) {
      //     if (subItem.score && subItem.score.length > 0) {
      //       console.log(subItem,'===')
      //       if (!this.changeBenifit(subItem,it)) {
      //         itemList = [];
      //         temp = true
      //         break;
      //       }
      //       itemScoreList.push({
      //         itemCode: subItem.itemCode,
      //         itemName: subItem.itemName,
      //         score: subItem.score || "",
      //       });
      //     }
      //   }
      //   if(temp){
      //     return
      //   }
      //   tempObj.itemScoreList = itemScoreList;
      //   itemList.push(tempObj);
      // });
      if (itemList && itemList.length > 0) {

        let param = {
          pendingCode: this.pendingCode,
          status: "ZC",
          scoreNodeList: itemList,
          appendixList:this.form.appendixList,
          achievementType:this.resultType
        };
        const res = await resultAchievementReview(param);
        if (res.rspCode == "0000") {
          this.$message.success("提交成功");
          // this.goBack();
          // window.location.reload()
          this.$confirm(`暂存成功,点击确认刷新页面`, "提示", {
            confirmButtonText: "确定",
            showCancelButton:false,
            type: "success",
          }).then(() => {
            window.location.reload();
          });
        } else {
          this.$message.error(res.rspDesc);
        }
      }
    },
    // 提交
    async submitApply() {
      let temp=false
      let itemList = [];
      for(let i=0;i<this.tableData.length;i++){
        let tempObj = {};
        let itemScoreList = [];
        for (const subItem of this.tableData[i].children) {
          if ((!subItem.score || subItem.score == "") && subItem.score!==0) {
          this.$confirm(`下方还有未评分成果[ ${this.tableData[i].projectName}]=>[${subItem.projectName}],你确定要暂存吗 ？`, "提示", {
            confirmButtonText: "确定",
            type: "success",
          }).then(() => {
            this.saveInitiation()
          });
            itemList = [];
            temp = true
            break;
          }
          if (!this.changeBenifit(subItem,this.tableData[i])) {
            itemList = [];
            temp = true
            break;
          }
          itemScoreList.push({
            itemCode: subItem.itemCode,
            itemName: subItem.itemName,
            score: subItem.score  || subItem.score === 0 ? subItem.score: "",
          });
        }
        if(temp){
          break
        }
        tempObj.itemScoreList = itemScoreList;
        tempObj.score = this.tableData[i].score;
        tempObj.projectId = this.tableData[i].projectId;
        itemList.push(tempObj);
      }
      if (itemList && itemList.length > 0) {
        let param = {
          pendingCode: this.pendingCode,
          status: "00",
          scoreNodeList: itemList,
          appendixList:this.form.appendixList,
          achievementType:this.resultType
        };
        const res = await resultAchievementReview(param);
        if (res.rspCode == "0000") {
          // this.$confirm(`提交成功,点击确认关闭页面`, "提示", {
          //   confirmButtonText: "确定",
          //   type: "success",
          // }).then(() => {
            // window.location.reload();
            this.closeApprove()
          // });
        } else {
          this.$message.error(res.rspDesc);
        }
      }
    },
    //多选
    handleSelectionChange(val) {
      this.selectList = val;
    },
    //查看
    goView(id) {
      
      this.querySearchDetail(id);
      // this.$router.push({
      //   name: "myResultDetail",
      //   params: {
      //     applyId: id,
      //     type: "view",
      //   },
      // });
      // this.$router.push('/approval/application')
    },
    closeApprove() {
      const currentTab = JSON.parse(sessionStorage.getItem('currentTab')) || {}
      this.saveRemoveCheckTabs(currentTab.name);
    },
    //详情
    async querySearchDetail(id) {
      const res = await resultSearchDetail({ projectId: id });
      if (res.rspCode == "0000") {
        this.handleVisable = true;
        let list = res.rspBody;
        let time = [];
        time.push(list.startDate);
        time.push(list.endDate);
        // list.approvalTime = time;
        this.detailForm = {
          startDate: list.startDate,
          endDate: list.endDate,
          projectName: list.projectName,
          projectId: list.projectId,
          applierName: list.applierName,
          applierCompanyId: list.applierCompanyId,
          approvalTime: time, //起始日期
          proBudget: list.benefit, //效益
          cateName: list.innovationType, //所属类别
          proName: list.projectType, //所属项目
          applierId: list.applierId,
          applierDeptId: list.applierDeptId,
          applyDate: list.applyDate,
          status: list.status,
          statusName: list.statusName,
          itemList: list.itemList,
          // fileList: this.form.fileList || [],
        };
      } else {
        this.$message.error(res.rspDesc);
      }
    },
    //建议评分
    pushCommittee() {
      // resultZgPush
      this.$confirm(`确认推送委员会吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await resultZgPush({achievementType:this.resultType});
        if (res.rspCode == "0000") {
          this.$message.success("项目成果推送成功!");
        } else {
          this.$message.error(res.rspDesc);
        }
      });
    },
    //分页
    handleCurrentChange(val) {
      this.pageParam.pageNum = val;
      this.queryApprovalApply();
    },
    handleSizeChange(val) {
      this.pageParam.pageSize = val;
      this.queryApprovalApply();
    },
    //关闭弹窗
    closeModel() {
      this.visible = false;
    },
    addTalent(data) {
      this.visible = false;
      data.map((item) => {
        if (item.name) {
          
        }
      });
    },
    /** 文件上传 */
    handlePreview(file) {
      
      const link = document.createElement("a");
      // download属性
      link.setAttribute("download", file.name);
      // href链接
      link.setAttribute("href", file.url);
      link.setAttribute("target", "_blank");
      // 自执行点击事件
      link.click();
    },
    //上传附件
    handleSuccess(res, file, fileList) {
      
      
      
      let fileName = res.rspBody?res.rspBody.fileName : '';
      this.form.appendixList.push(fileName);
    },
    handleRemove(file, fileList) {
      this.form.appendixList.map((item, index) => {
        if (item === file.name) {
          this.form.appendixList.splice(index, 1);
        }
      });

    },
    handleExceed(files, fileList) {
      this.$message.error(
        `当前限制选择 5 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeUpload(file, isAnnex) {
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (isLt1M) {
        return true;
      }
      
      return false;
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    showDialog(item){
      this.showScore = true
      this.achievementItem = item
    },
    closeModelScore(){
      console.log('123')
      this.showScore = false
      this.achievementItem = {}
    },
    submitScore(data){
      console.log(data,'111')
      //调接口
      
      //重新查询页面展示评分
    },
    async expandChangeHandler(row, expandedRows) {
      this.closeExpandRow(this.tableData,false)//关闭所有展开行
      if (expandedRows) {
        this.expandRowKeys = [];
        if (row) {
          this.expandRowKeys.push(row.projectId);
          console.log('expandRowKeys1',this.expandRowKeys)
        }
      } else {
        let expandRowKeys = this.expandRowKeys;
        this.expandRowKeys = [];
        // if(expandRowKeys && expandRowKeys.length>0){
        //   console.log(this.tableData)
        //   let temp=false
        //   let itemList = [];
        //   let itemScoreList=[];
        //   let tempObj={}
        //   for(let i=0;i<this.tableData.length;i++){
        //     if(expandRowKeys.includes(this.tableData[i].id)){
        //       tempObj.score = this.tableData[i].score;
        //       tempObj.projectId = this.tableData[i].projectId;
        //       console.log(this.tableData[i].children)
        //       for (const subItem of this.tableData[i].children) {
        //         if ((subItem.score && parseInt(subItem.score) > 0) || subItem.score === '0' || subItem.score === 0) {
        //           console.log(subItem,'===')
        //           itemScoreList.push({
        //             itemCode: subItem.itemCode,
        //             itemName: subItem.itemName,
        //             score: subItem.score || subItem.score === 0 ? subItem.score: "",
        //           });
        //         }
        //       }
        //       console.log(itemScoreList,'itemScoreList')
        //     }
        //   }
        //   if(itemScoreList && itemScoreList.length > 0){
        //     tempObj.itemScoreList=itemScoreList
        //     itemList.push(tempObj);
        //     if (itemList && itemList.length>0) {
        //       let param = {
        //         pendingCode: this.pendingCode,
        //         status: "ZC",
        //         scoreNodeList: itemList,
        //         appendixList:this.form.appendixList,
        //         achievementType:this.resultType
        //       };
        //       console.log(param)
        //       const res = await resultAchievementReview(param);
        //       if (res.rspCode == "0000") {
        //         this.$message.success("暂存成功");
        //         // this.goBack();
        //         // window.location.reload()
        //         // this.$confirm(`暂存成功,点击确认刷新页面`, "提示", {
        //         //   confirmButtonText: "确定",
        //         //   showCancelButton:false,
        //         //   type: "success",
        //         // }).then(() => {
        //         //   window.location.reload();
        //         // });
        //       } else {
        //         this.$message.error(res.rspDesc);
        //       }
        //   }
          
        //   }
        //   console.log('做暂存',this.expandRowKeys,itemList)
        //   //做暂存
        // }
        //展示总数和已评啥的
        console.log(this.tableData,'====')
        for(let i=0;i<this.tableData.length;i++){
          let list = []
          if(this.tableData[i].children.length>0){
            list =this.tableData[i].children.filter((item)=>{
              return item.score || item.score ===0
            })
            console.log(list,i)
          }
          let num = 0
          list.map((item)=>{
            num=num+parseInt(item.score)
          })
          this.tableData[i].avgScore=(num/7).toFixed(1)
          this.tableData[i].scoreCount = list.length
        }
        
      }
     
    },
    async clickLeft(row){
       this.$refs.tableref.toggleRowExpansion(row) 
    },
      // 关闭所有展开行
    closeExpandRow(data,isExpansion){
      data.forEach((item) => {
        if(this.expandRowKeys && this.expandRowKeys.length>0){
          if(this.expandRowKeys.includes(item.id)){
            this.$refs.tableref.toggleRowExpansion(item, isExpansion);
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.approval-applyQuery-page {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;

  .query {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(217, 217, 217, 1);
  }

  footer {
    .operation-footer {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-right: 20px;

      .operation-text {
        color: #333;
        font-size: 14px;
        margin-left: 20px;
        font-weight: 800;
      }
    }

    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.16);
    height: 80px;
    line-height: 80px;
    position: fixed;
    bottom: 0;
    left: 300px;
    width: calc(100vw - 300px);
  }

  .rowClassName {
    height: 35px;
  }
  .uploadBtn {
    border: 1px solid #5991ff;
    padding: 8px 10px;
    color: #fff;
    background: #5991ff;
    font-size: 13px;
    border-radius: 40px;
    font-weight: 400;
  }
  .container {
    border-bottom: 1px solid rgba(217, 217, 217, 1);
    padding: 20px 0;
    margin-bottom: 80px;

    .text {
      font-family: PingFang-SC-Heavy;
      font-size: 14px;
      color: #040404;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 800;
      padding-bottom: 10px;
    }
  }
  .downloadBox {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    .downloadItem {
      display: flex;
      margin: 10px;
      .downTitle {
        color: #909399;
        text-indent: 20px;
      }
      .downBtn {
        color: #5991ff;
        margin: 0 20px;
      }
    }
  }
  ::v-deep(.el-table [class*=el-table__row--level] .el-table__expand-icon .el-icon-arrow-right){
    // color: #ff0000;
    font-weight: bold;
    font-size: 14px;
  }
  ::v-deep .el-table__row--level-0 td.el-table_1_column_1 .cell.el-tooltip{
    // color: #ff0000;
    font-weight: bold;
    // cursor:point;
    // font-size: 15px;
  }
   ::v-deep .el-table [class*=el-table__row--level] .el-table__expand-icon  {
      width: 50px;
  }
  .projectName{
    color: #3377FF;
    cursor: pointer;
  }
  .complete{
    color: #ff0000;
    cursor: pointer;
  }
}
</style>
