<template>
  <div class="work-panel-copy">
    <ul class="work-bar">
      <li v-for="item in workList"
          :key=item.name class="work-item"
          :style="{ background: item.background ? item.background : '', color: item.color }">
        <i v-if="item.icon" :class="`iconfont ${item.icon}`" style="font-size: 20px;"></i>
        <span v-else style="font-size: 20px;height: 20px;line-height: 20px;">{{ item.nums }}</span>
        <span class="work-name">{{ item.name }}</span>
      </li>
    </ul>
    <div class="notice-panel" v-if="Object.keys(noticeData).length > 0">
      <span class="notice-title">{{ noticeData.title }}</span>
      <ul style="height: 100px;overflow: auto;">
        <li v-for="(item, index) in noticeData.list" :key="index">
          <span class="notice-desc">{{ item.text }}</span>
          <span class="notice-opt"
                :style="{ color: item.optTitleColor }"
                @click="goPage(item)">{{item.optTitle }}
          </span>
        </li>
      </ul>
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
    workList: {type: Array, default: []},
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
.work-panel-copy {
  height: 260px;
  background: #F6F5F5;
  border-radius: 6px;
  padding: 0 15px;

  + .work-panel-copy {
    margin-left: 20px;
  }

  .work-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .work-item {
      width: 70px;
      height: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 2px;

      .work-name {
        font-size: 12px;
        margin-top: 5px;
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
