<template>
  <div class="workbench-staffLeft">
    <div class="title">
      {{ data.title }}
    </div>
    <div class="main">
      <div class="main-item" v-for="(item, index) in data.list" :key="index">
        <div class="num" :style="{ color: item.primaryColor }">
          {{ item.label == '年完成度' ? item.number + '%' : item.number }}
        </div>
        <div class="label">{{ item.label }}</div>
        <div class="icon" :style="{ backgroundColor: item.secondColor }">
          <i :class="`iconfont ${item.icon}`" :style="{ color: item.primaryColor }"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
};
</script>

<style lang="scss" scoped>
.workbench-staffLeft {
  width: 400px;
  height: 130px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 16%);
  border-radius: 8px;
  margin-right: 10px;

  .title {
    font-family: PingFang-SC-Heavy;
    font-size: 14px;
    color: #333333;
    font-weight: 800;
    margin-bottom: 10px;
  }

  .main {
    display: flex;
    justify-content: space-between;

    .main-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid rgba(236, 232, 232, 1);

      &:first-child {
        border: none;
      }

      .num {
        font-family: PingFang-SC-Heavy;
        font-size: 24px;
        text-align: center;
        font-weight: 800;
      }

      .label {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        text-align: center;
        font-weight: 400;
      }

      .icon {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      }
    }

  }
}
</style>

