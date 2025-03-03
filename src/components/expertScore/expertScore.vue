<template>
    <div>
      <div class="head-title">专家咨询 <i :class="`iconfont icon-xiala ${show2 ? '':'unwarp' }`" @click="show2 = !show2"></i>
      </div>
      <div style="margin-bottom: 60px;font-size: 14px;">
        <el-collapse-transition>
          <div v-show="show2" class="timeline" v-loading=loading>
            <div v-if="expertList.length > 0" class="exportBox">
                <div v-for="item in expertList" :key="item.orderId" class="exportRow">
                    <div class="topRow">
                        <i class="el-icon-user" style="font-size: 18px;color: #28B0E8"></i>
                        <div style="margin-left:10px;margin-right:10px;color: #666;">{{ item.expertName }}</div>
                        <div style="flex:1"></div>
                        <div v-if="item.score">
                            <i class="el-icon-star-on" style="font-size: 24px;color: #fbe623" v-if="item.score && parseInt(item.score)>=1"></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #eee" v-else></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #fbe623" v-if="item.score && parseInt(item.score)>=2"></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #eee" v-else></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #fbe623" v-if="item.score && parseInt(item.score)>=3"></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #eee" v-else></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #fbe623" v-if="item.score && parseInt(item.score)>=4"></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #eee" v-else></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #fbe623" v-if="item.score && parseInt(item.score)>=5"></i>
                            <i class="el-icon-star-on" style="font-size: 24px;color: #eee" v-else></i>
                        </div>
                        
                        <el-button type="primary" round v-if="!item.score && item.response" class="giveScore" @click="getScoring(item.orderId)">评分</el-button>
                        <!-- <div v-else class="noGiveScore"></div> -->
                    </div>
                    <div class="request">{{ item.request }}</div>
                    <div class="bottomRow" v-if="item.response">{{ item.response }}</div>
                    <div v-else class="noResponse">暂无回复</div>
                </div>
            </div>
            <!-- <el-timeline v-if="expertList.length > 0">
              <el-timeline-item v-for="(item,index) in expertList" :key="index" :timestamp="item.operateTime"
                :color="item.isComplete == '1' ? '#28B0E8' : ''" placement="top">
                <span class="timeline-title">{{item.operateId}} : {{item.operateName}}</span>
                <p class="timeline-type">{{item.nodeName}} : <span style="margin-left: 8px;">{{item.approvalRet}}</span>
                </p>
                <p>{{item.remark}}</p>
              </el-timeline-item>
            </el-timeline> -->
            <div v-else class="no-flow">暂未发起专家咨询</div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'expertScore',
    props: {
       expertList: { type: Array, },
    },
    data() {
      return {
        show2: true,
        loading: false
      }
    },
    mounted(){
        
    },
    methods:{
      getScoring(code){
        this.$emit("getScoring",code);
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .timeline {
    font-family: PingFangSC-Regular;
  
    ::v-deep(.el-timeline) {
      padding-left: 150px;
  
      .el-timeline-item__timestamp.is-top {
        position: absolute;
        left: -128px;
        color: #333333;
        font-size: 12px;
        color: #040404;
        letter-spacing: 0;
        font-weight: 400;
      }
    }
  
    .timeline-title {
      display: inline-block;
      padding: 4px 10px;
      margin-bottom: 10px;
      min-width: 40px;
      text-align: center;
      font-size: 12px;
      color: #28B0E8;
      letter-spacing: 0;
      font-weight: 400;
      background: #D6F0FB;
      border-radius: 2px;
    }
  
    .timeline-type {
      font-size: 12px;
      color: #333333;
      letter-spacing: 0;
      line-height: 17px;
      font-weight: 800;
      margin-bottom: 6px;
  
      &.reject {
        color: #5991FF;
      }
    }
  
    .no-flow {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #C6C6C6;
      letter-spacing: 0;
      font-weight: 400;
      padding-left: 15px;
    }
  }
  
  .icon-xiala {
    margin-left: 15px;
    font-size: 20px;
    font-weight: normal;
    cursor: pointer;
  
    &.unwarp {
      transform: rotate(180deg);
    }
  }
  .exportBox{
    padding: 10px;
    .exportRow{
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        border-bottom: 1px solid #eee;
        .topRow{
            display: flex;
            align-items: center;
            justify-content: left;
            margin-bottom: 5px;
            padding-right: 20px;
        }
        .bottomRow{
            margin: 0 30px;
            padding: 10px;
            background: #fafafa;
            color: #666;
        }
        .request{
          margin: 10px 30px;
        }
        .noResponse{
          text-align: center;
          color: #999;
        }
    }
    .giveScore{
        border-radius: 0;
        width: 70px;
        text-align: center;
        padding: 10px 0;
        text-align: center;
        margin-left: 10px;
    }
    .noGiveScore{
        width: 70px;
        margin-left: 10px;
    }
    
  }
  </style>