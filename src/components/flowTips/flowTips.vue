<template>
  <div>
    <div class="head-title">流转意见 <i :class="`iconfont icon-xiala ${show3 ? '':'unwarp' }`" @click="show3 = !show3"></i>
    </div>
    <div style="margin-bottom: 60px;">
      <el-collapse-transition>
        <div v-show="show3" class="timeline" v-loading=loading>
          <el-timeline v-if="flowList.length > 0">
            <el-timeline-item v-for="(item,index) in flowList" :key="index" :timestamp="item.operateTime"
              :color="item.isComplete == '1' ? '#28B0E8' : ''" placement="top">
              <span class="timeline-title">{{item.operateId}} : {{item.operateName}}</span>
              <!-- <p :class="`timeline-type ${item.type== '0' ? 'reject' : ''}`">
                {{item.type == '0' ? '驳回原因：' : '通过备注：'}}
              </p> -->
              <p class="timeline-type">{{item.nodeName}} : <span style="margin-left: 8px;">{{item.approvalRet}}</span>
              </p>
              <p>{{item.remark}}</p>
            </el-timeline-item>
          </el-timeline>
          <div v-else class="no-flow">暂无流转意见</div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flowTips',
  props: {
    flowList: { type: Array, },
  },
  data() {
    return {
      show3: true,
      loading: false
    }
  },
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
</style>