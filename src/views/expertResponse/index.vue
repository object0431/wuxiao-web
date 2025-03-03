<template>
   <div class="expertResponse-page">
        <div class="head-title">咨询回复</div>
        <el-descriptions class="margin-top" :column="2" border>
            <el-descriptions-item label="项目名称" span="2" labelStyle="width:140px">{{ form.programName }}</el-descriptions-item>
            <el-descriptions-item label="申请人" span="2" labelStyle="width:140px">{{ form.applierName }}</el-descriptions-item>
            <el-descriptions-item label="公司" labelStyle="width:140px">{{ form.applierCompanyId }}</el-descriptions-item>
            <el-descriptions-item label="部门" labelStyle="width:140px">{{ form.applierDeptId }}</el-descriptions-item>
            <el-descriptions-item label="预计起始日期" labelStyle="width:140px">{{ `${form.approvalTime[0]}至${form.approvalTime[1]}` }}</el-descriptions-item>
            <el-descriptions-item label="预计效益" labelStyle="width:140px">{{ form.proBudget }}万元</el-descriptions-item>
            <el-descriptions-item label="所属类别" labelStyle="width:140px">{{ form.cateName }}</el-descriptions-item>
            <el-descriptions-item label="所属项目" labelStyle="width:140px" >{{ form.proName }}</el-descriptions-item>
            <el-descriptions-item label="创新性" span="2" labelStyle="width:140px">{{ form.innovativeness }}</el-descriptions-item>
            <el-descriptions-item label="先进性" span="2" labelStyle="width:140px">{{ form.advancement }}</el-descriptions-item>
            <el-descriptions-item label="实用性" span="2" labelStyle="width:140px" v-if="form.practicability">{{ form.practicability }}</el-descriptions-item>
            <el-descriptions-item label="科技含量" span="2" labelStyle="width:140px" v-if="form.technologyContent">{{ form.technologyContent }}</el-descriptions-item>
            <el-descriptions-item label="推广价值" span="2" labelStyle="width:140px" v-if="form.promotionValue">{{ form.promotionValue }}</el-descriptions-item>
            <el-descriptions-item label="经济效益/社会效益" span="2" labelStyle="width:140px" v-if="form.expectedBenefit">{{ form.expectedBenefit }}</el-descriptions-item>
            <el-descriptions-item label="其他" span="2" labelStyle="width:140px" v-if="form.others">{{ form.others }}</el-descriptions-item>
        </el-descriptions>
        <el-divider></el-divider>
        <div class="main-content">
          <el-form ref="apply" :model="apply" label-position="right" label-width="90px" class="form">
            <el-row>
              <el-form-item label="咨询问题描述">
                <div style="font-size: 14px;">{{ apply.question }}</div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="16">
                  <el-form-item label="回复内容" prop="responseValue" :rules="{
                      required: true,
                      message: '请输入回复内容',
                      trigger: 'blur',
                  }">
                      <el-input
                      v-model="apply.responseValue"
                      type="textarea"
                      placeholder="请输入"
                      rows="7"
                      ></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="main-content" v-for="item,index in hisOrderList" :key="index">
          <el-divider></el-divider>
          <el-form label-position="right" label-width="90px" class="form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="问题时间">
                  <div style="font-size: 14px;">{{ item.reqTime }}</div>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="回复时间">
                    <div style="font-size: 14px;">{{ item.respTime }}</div>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="问题描述">
                <div style="font-size: 14px;">{{ item.request }}</div>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="16">
                  <el-form-item label="回复内容">
                    <div style="font-size: 14px;">{{ item.response }}</div>
                  </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <footer>
            <div class="operation">
                <div class="operation-btn">
                    <el-button class="minorGrayButton" @click="goBack">返回</el-button>
                    <el-button class="mainRedButton" style="width: 100px" @click="submitApply('apply')">提交
                    </el-button>
                </div>
            </div>
        </footer>
   </div>
</template>
<script>
import { detailProject } from '@/assets/api/approval/index'
import { queryDetailConsult,replyConsult } from '@/assets/api/common/index'
import { resultSearchDetail } from "@/assets/api/resultManage";
import {mapMutations} from "vuex";
  export default {
    name: 'expertResponse',
    data() {
      return {
        apply:{
          responseValue:"",
          question:""
        },
        historyApply:{},
        form: {
            programName:"",//项目名称
            approvalTime:['',''],//预计起始日期
            proBudget:null,//预计效益
            cateName:"",//所属类别
            proName:"",//所属项目
            innovativeness:"",//创新性
            advancement:"",//先进性
            practicability:"",//实用性
            technologyContent:"",//科技含量
            promotionValue:"",//推广价值
            expectedBenefit:"",//预期效益
            others:"",//其他
        },
        currentProjectId:"",
        currentOrderId:"",
        hisOrderList:[]
      };
    },
    created() {
      let { orderId } = this.$route.query;
        if(orderId){
            this.queryDetail(orderId)
            this.currentOrderId=orderId
        }
    },
    methods:{
      ...mapMutations(['removeResponseTabs']),
      async queryDetail(orderId){
        const res = await queryDetailConsult(orderId);
          
          if (res.rspCode == "0000") {
            this.apply.question=res.rspBody.currOrder.request
            this.currentProjectId=res.rspBody.currOrder.orderId
            this.hisOrderList=res.rspBody.hisOrderList
            if(res.rspBody.currOrder.targetType=="LXSQ"){
              this.queryApprovalDetail(res.rspBody.currOrder.targetId)
            }else{
              //项目成果详情
              this.querySearchDetail(res.rspBody.currOrder.targetId)
            }
          }
      },
      //返回
      goBack() {
        this.$router.go(-1);
      },
      //点击办理
      submitApply(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                  this.replyConsult()
              } else {
                  return false
              }
          });
      },
      async replyConsult(){
        const res = await replyConsult({
            "orderId": this.currentOrderId,
            "replyContent": this.apply.responseValue
        });
        
        if(res.rspCode == "0000"){
          // this.$message.success("回复成功");
          this.closeApprove();
        } else {
          this.$message.error(res.rspDesc);
        }
      },
      //成果申请详情
      async querySearchDetail(id) {
        const res = await resultSearchDetail({ projectId: id});
        if (res.rspCode == "0000") {
          let list= res.rspBody;
          let array=list.itemList;
          
          this.form={
            programName:list.projectName,//项目名称
            approvalTime:[list.applyDate.slice(0,10),list.endDate.slice(0,10)],//预计起始日期
            proBudget:list.benefit,//预计效益
            cateName:list.innovationType,//所属类别
            proName:list.projectType,//所属项目
            applierName:list.applierName,
            applierCompanyId:list.applierCompanyId,
            applierDeptId:list.applierDeptId,
            innovativeness:array.find(item => item.itemCode == 'CXX')?.itemValue || '',//创新性
            advancement:array.find(item => item.itemCode == 'XJX')?.itemValue || '',//先进性
            practicability:array.find(item => item.itemCode == 'SYX')?.itemValue || '',//实用性
            technologyContent:array.find(item => item.itemCode == 'KJHL')?.itemValue || '',//科技含量
            promotionValue:array.find(item => item.itemCode === 'TGJZ')?.itemValue || '',//推广价值
            expectedBenefit:array.find(item => item.itemCode === 'YJXY')?.itemValue || '',//预期效益
            others:array.find(item => item.itemCode === 'QT')?.itemValue || '',//其他
          }
        } else {
          this.$message.error(res.rspDesc);
        }
      },
      closeApprove() {
        const currentTab = JSON.parse(sessionStorage.getItem('currentTab')) || {}
        this.removeResponseTabs(currentTab.name)
      },
      //立项申请详情
      async queryApprovalDetail(id) {
          const res = await detailProject({projectId:id});
          
          if (res.rspCode == "0000") {
              //赋值
              let list= res.rspBody;
              let time=[]
              time.push(list.startTime.slice(0,10))
              time.push(list.endTime.slice(0,10))
              let array=list.projectAttrList;
              this.form={
                  programName:list.projectName,//项目名称
                  approvalTime:time,//预计起始日期
                  proBudget:list.economicBenefit,//预计效益
                  cateName:list.typeAttrName,//所属类别
                  proName:list.projectAttrName,//所属项目
                  applierName:list.applierName,
                  applierCompanyId:list.applyCompanyName,
                  applierDeptId:list.applyDeptName,
                  innovativeness:array.find(item => item.attrCode === 'CXX') && array.find(item => item.attrCode === 'CXX').attrValue,//创新性
                  advancement:array.find(item => item.attrCode === 'XJX') && array.find(item => item.attrCode === 'XJX').attrValue,//先进性
              }
          } else {
              this.$message.error(res.rspDesc);
          }
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .expertResponse-page {
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 80px;
  }
  footer {
    .operation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding-right: 20px;
        height: 100%;
        align-items: center;
        justify-content: right;

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
  </style>