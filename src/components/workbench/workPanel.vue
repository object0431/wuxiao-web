<template>
  <div class="work-panel">
    <div class="work-bar">
      <div class="work-left">
        <i :class="`iconfont ${workList.icon}`" style="font-size: 20px"></i>
        <span style="margin-top:5px">{{ workList.name }}</span>
      </div>
      <div class="top-right">
        <div class="top-item1">
          <span style="font-size: 24px">{{ workList.doneCount }}</span>
          <span>已完成</span>
        </div>
        <div class="top-item2">
          <span>未完成 <span style="font-size: 16px">{{ workList.undoneCount.total }}</span></span>
          <div class="item2-bottom">
            <div class="bottom-item">选修 {{ workList.undoneCount.xuanxiu }}</div>
            <div class="bottom-item">必修 {{ workList.undoneCount.bixiu }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="notice-panel" v-if="Object.keys(noticeData).length > 0">
      <span class="notice-title">{{ noticeData.title }}</span>
      <ul style="height: 50px;min-height:50px;overflow: auto;" v-if="noticeData.list.length > 0">
        <li v-for="(item, index) in noticeData.list" :key="index">
          <span class="notice-desc">{{ item }}</span>
        </li>
      </ul>
      <div v-else class="notice-desc" style="height:50px;min-height:50px">暂无提醒</div>
    </div>
    <el-divider></el-divider>
    <slot></slot>
  </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  name: 'WorkPanel',
  props: {
    workList: {type: Object, default: {}},
    noticeData: {type: Object, default: {}}
  },
  data() {
    return {
      pathData: {
        PLAN: {
          title: '培训计划',
          path: '/trainingPlan',
          topMenu: '培训计划'
        },
        PROJECT: {
          title: '培训立项',
          path: '/initiationQuery',
          topMenu: '培训项目'
        },
        SETTLE: {
          title: '培训结算',
          path: '/trainingSettle',
          topMenu: '培训项目'
        }
      }
    }
  },
  methods: {
    ...mapMutations(['openTargetTab']),
    goPage(item) {
      this.openTargetTab(this.pathData[item.type])
    }
  },
};
</script>

<style lang="scss" scoped>
.work-panel {
  height: 260px;
  background: #F6F5F5;
  border-radius: 6px;
  padding: 0 15px;

  + .work-panel {
    margin-left: 20px;
  }

  .work-bar {
    display: flex;
    box-sizing: border-box;

    .work-left {
      width: 70px;
      height: 70px;
      background-color: #303030;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #fff;
    }

    .top-right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 70px);

      .top-item1 {
        width: calc(100% / 3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #55AE00;
        border-right: 1px solid rgba(236, 232, 232, 1);
      }

      .top-item2 {
        width: calc(100% / 3 * 2);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #5991FF;

        .item2-bottom {
          display: flex;
          width: 100%;
          margin-top: 10px;

          .bottom-item {
            flex: 1;
            color: #C3BABA;
            text-align: center;
            font-weight: 400;

            &:first-child {
              border-right: 1px solid rgba(236, 232, 232, 1);
            }
          }


        }
      }
    }
  }

  .notice-panel {
    margin-top: 30px;
    font-size: 12px;

    .notice-title {
      display: inline-block;
      font-size: 14px;
      color: #333333;
      font-weight: 800;
      margin-right: 20px;
      margin-bottom: 10px;
    }

    .notice-opt {
      float: right;
      cursor: pointer;
    }

    li + li {
      margin-top: 10px;
    }
  }
}
</style>
