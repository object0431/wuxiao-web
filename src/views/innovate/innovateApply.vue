<template>
    <div class="innovateApply-page">
        <div class="head-title">{{type=='add' ? '创新议题发布' : '创新议题编辑'}}</div>
        <div class="main-content">
            <el-form ref="form" :model="form" label-position="right" label-width="120px" class="form">
                <!-- 基础信息 -->
                <div class="container" style="padding-top: 0px">
                    <el-row>                   
                        <el-col :span="16">
                            <el-form-item label="标题" prop="title" :rules="{
                                required: true,
                                message: '请输入标题',
                                trigger: 'blur',
                            }">
                                <el-input placeholder="请输入" v-model="form.title" :disabled="type == 'view'"></el-input>
                            </el-form-item>
                        </el-col>      
                    </el-row>
                   
                    <el-row>
                        <el-col :span="16" style="margin-bottom: 5px;">
                            <el-form-item label="创新内容" prop="content" :rules="{
                                required: true,
                                message: '请输入创新内容',
                                trigger: 'blur',
                            }">
                                <el-input
                                v-model="form.content"
                                type="textarea"
                                placeholder="请输入(最多输入4000字)"
                                :disabled="type == 'view'"
                                rows="4"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="是否召集合伙人" prop="canJoin">
                                <el-radio-group v-model="form.canJoin">
                                    <el-radio :label="'0'">否</el-radio>
                                    <el-radio :label="'1'">是</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4" v-if="form.canJoin=='1'">
                            <el-form-item label="合伙人数量" prop="partnerNum" :rules="{
                                required: true,
                                message: '请输入合伙人数量',
                                trigger: 'blur',
                            }">
                                <el-input v-model="form.partnerNum"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="议题发布范围" prop="scopeValue">
                                <el-radio-group v-model="form.scopeValue" @change="handleChange">
                                    <el-radio :label="'01'">部门</el-radio>
                                    <el-radio :label="'02'">人员</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16" style="margin-bottom: 15px;">
                            <el-form-item label="选择部门" prop="innovativeness" v-if="form.scopeValue=='01'">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div v-for="item,index in roleList"  :value="item.code" :label="item.name" :key="item.code">
                                        <div class="nameBox">
                                            <div class="name">{{ item.name }}</div>
                                            <div class="delete" @click="updateList(index)"></div>
                                        </div>
                                    </div>
                                    
                                    <el-button type="primary" style="height: 40px;" @click="changeAddDept">新增部门</el-button>
                                </div>
                            </el-form-item>
                            <el-form-item label="选择人员" v-if="form.scopeValue=='02'">
                                <div style="display: flex;flex-wrap: wrap;">
                                    <div v-for="item,index in roleList"  :value="item.code" :label="item.name" :key="item.code">
                                        <div class="nameBox">
                                            <div class="name">{{ item.name }}</div>
                                            <div class="delete" @click="updateList(index)"></div>
                                        </div>
                                    </div>
                                    
                                    <el-button type="primary" style="height: 40px;" @click="changeAddRole">新增人员</el-button>
                                </div>
                            </el-form-item>
                        </el-col> 
                    </el-row>
                </div>
            </el-form>
        </div>


        <footer :style="isWorkBench?'left:20px;width: calc(100vw - 20px);':''">
            <div class="operation">
                <div class="operation-text"></div>
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('form')">{{type=='edit'?'修改':'发布'}}</el-button>
                </div>
            </div>
        </footer>

        <addRole :visible="addStaffVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addStaffVisible=false" @closeAddModel="closeAddModel"></addRole>
        <addDept :visible="addDeptVisible" :orgCode="userInfo.companyId" :deptCode="userInfo.deptId"   @close="addDeptVisible=false" @closeAddModelDept="closeAddModelDept"></addDept>
    </div>
</template>
  
<script>
import {
    innovationIssuesPublish,detailQuery,updateIssues
} from '@/assets/api/innovate/index'
import addRole from "@/components/approval/addRole.vue";
import addDept from "@/components/approval/addDept.vue";
export default {
    name: "approvalApplication",
    components:{addRole,addDept},
    data() {
        return {
            type: "add",
            currentIssuesId: "",
            userInfo: {
                companyName: "",
                deptName: "",
                emailAddress: "",
                mobileTel: "",
                empName: "",
            },
            form: {
                title:"",
                content:"",
                canJoin:'0',
                partnerNum:"",
                scopeValue:'01'
            },
            addStaffVisible:false,
            addDeptVisible:false,
            cateList:[],
            programList:[],
            roleList:[],
            //办理浮层
            handleVisable: false,
            tableLoading: false,
            errorValue:"",
            isWorkBench:false,
        };
    },
    created() {
        let {companyId,companyName,deptId, deptName, emailAddress, empName, mobileTel } =
            JSON.parse(sessionStorage.getItem("userInfo"));
        this.userInfo = { companyName, deptName, emailAddress, empName, mobileTel,companyId,deptId}
        if (this.$route.query) {
          let {type,issuesId} = this.$route.query;
          if(type && issuesId){
            this.type = type;
            this.currentIssuesId = issuesId;
            this.detailQuery(issuesId);
          }
            
        }
    },
    methods: {
        //返回
        goBack() {
            this.$router.go(-1);
        },
        //点击办理
        submitApply(formName) {
          let msg=(this.type=='edit') ? "确认要修改该议题吗" : "确认要新增该议题吗"
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  
                  let reg= /^[0-9]*$/;
                    if((this.form.partnerNum && !reg.test(this.form.partnerNum)) || (this.form.partnerNum && parseInt(this.form.partnerNum)>100) || (this.form.partnerNum && parseInt(this.form.partnerNum)==0)){
                        this.$message.error('请检查合伙人数量，仅可输入数字(最大值100,最小值1)');
                        return
                    }
                  if(this.roleList.length==0){
                      this.$notify({
                          title:'警告',
                          message:'请至少选择一个部门或人员',
                          type:'warning'
                      })
                      return
                  }
                  this.$confirm(
                    msg,
                    "确认信息",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
                    }
                  ).then(() => {
                    if(this.type=='edit'){
                      this.goUpdate()
                    }else{
                        this.goPublish()
                    }
                  })
                } else {
                    return false
                }
            });
        },
        async detailQuery(id) {
            const res = await detailQuery({issuesId:id});
            
            if (res.rspCode == "0000") {
                this.form={
                    title:res.rspBody.title,
                    content:res.rspBody.content,
                    canJoin:res.rspBody.canJoin,
                    partnerNum:res.rspBody.partnerNum,
                    scopeValue:res.rspBody.scope && res.rspBody.scope.type
                }
                if(res.rspBody.scope && res.rspBody.scope.values){
                  this.roleList=res.rspBody.scope.values
                }
                
            } else {
                this.$message.error(res.rspDesc);
            }
        },
        async goPublish(){
            let param={
                "title": this.form.title,
                "content": this.form.content,
                "canJoin": this.form.canJoin,
                "scope": {
                    "type":this.form.scopeValue,
                    "values": this.roleList
                },
            }
            if(this.form.canJoin=='1'){
                param.partnerNum=parseInt(this.form.partnerNum)
            }
            const res=await innovationIssuesPublish(param);
            
            if(res.rspCode=='0000'){
                this.$message.success("新增成功");
                this.goBack()
            }else{
                this.$message.error(res.rspDesc)
            }
        },
        async goUpdate(){
            let param={
                "issuesId":this.currentIssuesId,
                "title": this.form.title,
                "content": this.form.content,
                "canJoin": this.form.canJoin,
                "scope": {
                    "type":this.form.scopeValue,
                    "values": this.roleList
                },
            }
            if(this.form.canJoin=='1'){
                param.partnerNum=parseInt(this.form.partnerNum)
            }
            const res=await updateIssues(param);
            if(res.rspCode=='0000'){
                this.$message.success("修改成功");
                this.goBack()
            }else{
              this.$message.error(res.rspDesc)
            }
        },
        changeAddDept(){
            this.addDeptVisible=true
        },
        changeAddRole(){
            this.addStaffVisible=true
        },
        closeAddModel(data){
            
            this.addStaffVisible=false
            data.map((item)=>{
                this.roleList.push({name:item.staffName,code:item.mainUserId})
            })
           this.roleList=this.merge(this.roleList)
        },
        merge(arr) {
            let obj = {};
            arr = arr.reduce((newArr, next) => {
            obj[next.code] ? "" : (obj[next.code] = true && newArr.push(next));
            return newArr;
            }, []);
            return arr;
        },
        updateList(index){
            this.roleList.splice(index,1)
        },
        closeAddModelDept(data){
            
            this.addDeptVisible=false
            data.map((item)=>{
                this.roleList.push({name:item.name,code:item.code})
            })
            this.roleList=this.merge(this.roleList)
            
        },
        handleChange(){
            this.roleList=[]
        }
        

    },
};
</script>
  
<style lang="scss" scoped>
.innovateApply-page {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 80px;

    .nameBox{
        position: relative;
        margin-bottom: 10px;
    }
    .name{
        border: 1px solid #5991FF;
        padding: 0 30px;
        margin-right: 20px;
        color: #5991FF;
        border-radius: 5px;
        // margin-bottom: 10px;
    }
    .delete{
        top: -10px;
        right: 8px;
        position: absolute;
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-size: auto 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 20px;
        width: 20px;
        background-image: url("../../assets/image/delete.png");
    }
    // height: 100%;
    ::v-deep(.el-form-item__content .el-input-group) {
        vertical-align: baseline;
    }

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

        .trainingCourse-container-item {
            background-color: #fafafa;
            padding: 10px 0;
            margin-bottom: 10px;
            position: relative;

            .form-btn {
                position: absolute;
                right: 5px;
                bottom: 5px;
            }
        }

        .trainingCourse-container-add {
            margin-top: 10px;
            background: #ffffff;
            border: 1px dashed rgba(174, 0, 3, 1);
            border-radius: 2px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #5991FF;
            letter-spacing: 0;
            font-weight: 400;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .linkPoint {
        margin-top: 20px;
    }

    footer {
        .operation {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            box-sizing: border-box;
            padding-right: 20px;
            height: 80px;

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
}

::v-deep .el-form-item {
    margin-bottom: 10px;
}

::v-deep .el-range-editor.el-input__inner {
    margin-top: 5px;
}

::v-deep.el-date-editor .el-range__icon {
    margin-bottom: 8px;
}

::v-deep.el-date-editor .el-range-separator {
    margin-bottom: 10px;
    color: #606266;
}
// ::v-deep .el-select-dropdown .el-select-dropdown__item {
//   padding-right: 0;
//   padding-left: 0;
// }
// .el-select-dropdown__item {
//   height: 100%;
// }

::v-deep .el-input .el-input__inner{
    min-width: 80px;
}
</style>
