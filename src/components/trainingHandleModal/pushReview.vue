<template>
  <div>
    <!-- <div class="v-modal" style="z-index:66" v-if="visible" @click="close"></div> -->
    <div
      class="approval-handle"
      :class="showScore?'on' : 'close'"
    >
      <i
        class="el-icon-close"
        style="font-size: 22px;"
        @click="close"
      ></i>
      <el-form
        label-position="left"
        label-width="100px"
        class="handle-form"
      >
      <el-form-item
          label="评委委员会"
          required
        >
          <el-col>
      <div v-for="itemList,index in approvalInfoList" :key="index">
        <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
        <!-- <div style="margin: 15px 0;"></div> -->
        <div style="display: flex;">
          <div style="margin-bottom: 10px;margin-right: 10px;width:120px;text-align: right;">{{ itemList.zyxName }}</div>
          <div style="display: flex;">
              <el-checkbox  v-model="chooseObj[index].choose" @change=" (e) => {
                    handleCheckAllChange(e,index)
                  }" style="margin-right: 30px;">全选</el-checkbox>
            <el-checkbox-group v-model="chooseObj[index].list" @change="(e) => {handleCheckedStaffsChange(e,index)}" class="checkBoxList">
              <el-checkbox v-for="staff in itemList.staffList" :label="staff.staffId" :value="staff.staffId" :key="staff.staffId" border>{{ staff.staffName }}</el-checkbox>
              <!-- <el-checkbox v-for="city in itemList.list" :label="city" :key="city">{{city}}</el-checkbox> -->
            </el-checkbox-group> 
          </div>
     
        </div>
      </div>
      </el-col>
      </el-form-item>
        <el-form-item
        label-width="0"
          class="add-btn-item"
        >
          <el-button
            class="mainRedButton"
            @click="onSubmit()"
          >推送</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <addLeader :visible="visibleStaff" @closeModel="closeModel" @addLeader='addLeader'></addLeader> -->
  </div>

</template>
  
  <script>
import addLeader from "@/components/approval/addLeader.vue";
import {
  queryCommitteeList,
  resultZgPush,
} from "@/assets/api/resultManage/index";

export default {
  name: "committeeHandle",
  components: { addLeader },
  props: {
    type:{
      type:String,
      default:''
    },
    showScore: {
      type: Boolean,
      default: false,
    },
    achievementIdList:  { type: Array, default:[]}
  },
  data() {
    return {
      approvalInfoList: [],
      visibleStaff: false,
      pageParam: {
        pageNum: 1,
        pageSize: 50,
        total: 0,
      },
      checkAll: false,
      isIndeterminate: true,
      chooseObj:[{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]}]
    };
  },
  created() {
    this.getApprovalInfo();
    this.checkAll=false
    this.chooseObj=[{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]}]
  },
  methods: {
    addLeader(list) {
      
    },
    // 审批人信息查询
    async getApprovalInfo() {
      try {
        const res = await queryCommitteeList({
          ...this.pageParam,
          reqParam:{achievementType:this.type}
        });
        if (res.rspCode === "0000") {
          // 
          this.approvalInfoList = res.rspBody.zyxList || [];
        } else {
          this.$message.error(res.rspDesc);
        }
      } catch (error) {
        this.$message.error("网络错误");
      }
    },
    //提交
    onSubmit() {
      this.$confirm(`您确定要推送评审委员会吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          //处理审批人数据
          console.log(this.achievementIdList,'111111111111')
          let list = []
          this.achievementIdList.map((item)=>{
            list.push(item.projectId)
          })
          console.log(this.achievementIdList,this.chooseObj,'============')
          let params =[]
          let temp=[]
          this.chooseObj.map((item)=>{
            if(item && item.list && item.list.length>0){
             temp= temp.concat(item.list)
            }
          })
          let allList=[]
          this.approvalInfoList.map((item)=>{
            if(item && item.staffList && item.staffList.length>0 ){
              allList=allList.concat(item.staffList)
            }
          })
          console.log(allList,'===')
          let arr=[]
          for(let i = 0;i<temp.length;i++){
            for(let j=0;j<allList.length;j++){
              if(temp[i] == allList[j].staffId){
                arr.push({staffId:allList[j].staffId,staffName:allList[j].staffName})
              }
            }
          }
          console.log(temp,'已选择',allList,'所有的',arr)
          try {
            const res = await resultZgPush({
              list: arr,achievementType:this.type,achievementIdList:list
            });
            if (res.rspCode === "0000") {
              this.$confirm(`项目成果推送成功,点击确认刷新页面`, "提示", {
                confirmButtonText: "确认",
                type: "success",
              }).then(() => {
                this.checkAll=false
                this.chooseObj=[{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]}]
                window.location.reload();
              });
            } else {
              this.$message.error(res.rspDesc);
            }
          } catch (error) {
            this.$message.error("网络错误");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    close() {
      this.checkAll=false
      this.chooseObj=[{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]},{choose:false,list:[]}]
      this.$emit("closePushReview");
    },
    // findValueByKey(keys, keyValuePairs) {
    //   let list = []
    //   for (let i = 0; i < keys.length; i++) {
    //     // let key = keys[i];
    //     for (let j = 0; j < keyValuePairs.length; j++) {
    //       if (keyValuePairs[j].staffId == keys[i]) {
    //         list.push({
    //           staffId:keyValuePairs[j].staffId,
    //           staffName:keyValuePairs[j].staffName
    //         })
    //         break
    //       }
    //     }
    //   }
    //   // 如果未找到匹配的值，可以返回一个默认值或者空值
    //   return list;
    // },
    showSelectLeader() {
      this.visibleStaff = true;
    },
    handleCheckAllChange(val,index) {
      console.log(val,index)
      this.chooseObj[index].choose = val
      if(val){
        let list = []
        this.approvalInfoList[index].staffList.map((item)=>{
          list.push(item.staffId)
        })
        this.chooseObj[index].list = list

      }else{
        this.chooseObj[index].list =[]
      }
      console.log(this.chooseObj[index])
    },
    handleCheckedStaffsChange(value,index) {
      console.log(value,index)
      if(value.length ==  this.approvalInfoList[index].staffList.length){
        this.chooseObj[index].choose = true
      }else{
        this.chooseObj[index].choose = false
      }
    }
  },
};
</script>
  
  <style lang="scss" scoped>
.approval-handle {
  position: fixed;
  z-index: 99;
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.16);
  padding: 20px 20px 0 20px;
  transition: all 0.5s ease;
  left: 300px;
    width: calc(100vw - 340px);
  overflow: auto;
  .checkBoxList{
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 4px 4px;
    margin-bottom: 15px;
  }
  &.on {
    bottom: 0;
  }

  &.close {
    bottom: -520px;
  }

  p,
    ul,
    // li {
    //   margin: 0;
    //   padding: 0;
    // }
  
    .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  .handle-form {
    margin-top: 10px;

    .handle-icon {
      font-size: 20px;
      color: #28b0e8;
      margin-left: 10px;
      cursor: pointer;
    }

    // .el-select-dropdown.is-multiple .el-select-dropdown__item {
    //   padding-right: 0;
    // }

    .el-select-dropdown__item {
      height: 100%;
    }

    .textarea-item {
      ::v-deep(.el-form-item__content) {
        height: 100%;
      }
    }
  }

  .custom-tree-node {
    .node-check {
      color: #28b0e8;
    }

    .node-check-icon {
      color: #28b0e8;
      margin: 10px;
    }
  }
}

.approval-display {
  display: flex;
  &.isvisible {
    display: none;
  }
  .approvaSpan {
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #28b0e8;
    margin-right: 20px;
    color: #28b0e8;
    &.cancel {
      border: 1px solid #ccc;
      color: #999;
    }
  }
}

.custom-select {
  .custom-drop {
    display: flex;
    align-items: center;
  }

  .el-select-dropdown__item {
    display: flex;
    align-items: center;

    .el-icon-close {
      font-size: 16px;
      margin-left: auto;
    }
  }
}
.add-btn-item{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .el-form-item__content{
    margin-left: 0 !important;
  }
}
::v-deep .el-checkbox.is-bordered + .el-checkbox.is-bordered{
  margin-left: 0px;
  width: 100px;
  margin-right: 10px;
}
::v-deep .el-checkbox.is-bordered{
  margin-left: 0px;
  width: 100px;
  margin-right: 10px;
}
</style>
  