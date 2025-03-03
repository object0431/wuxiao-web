<template>
  <ul class="nav-bar" v-if="navList.length > 0">
    <li v-for="(item, index) in navList"
        :key="item.functionId"
        :class="['nav-item', { 'active': activeNav == index }]"
        @click="active(index, item)">
      <i :class="`iconfont ${iconData[item.functionName] ? iconData[item.functionName] : 'icon-17'}`"></i>
      <span class="nav-name">{{ item.functionName }}</span>
    </li>
  </ul>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  name: 'NavBar',
  props: {
    navList: {type: Array, default: []},
  },
  data() {
    return {
      activeNav: null,
      iconData: {
        '标识管理': 'icon-biaoshilei_zhaopian',
        '讲师管理': 'icon-laoshiguanli',
        '供应商管理': 'icon-gongyingshang',
        '培训计划': 'icon-wj-jh',
        '权限管理': 'icon-quanxian',
        '培训结算': 'icon--jiesuan',
      }
    }
  },
  methods: {
    ...mapMutations(['openTargetTab']),
    active(index, item) {
      this.activeNav = index
      const {functionName, topMenu, functionUrl = ''} = item
      this.openTargetTab({
        title: functionName,
        path: functionUrl,
        topMenu
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 100px;
  background: #F6F5F5;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .nav-item {
    width: 100px;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 2px;
    margin: 5px 0;

    i {
      display: block;
      font-size: 32px;
      margin-bottom: 15px;
      // color: #C3BABA;
      color: #5991FF;
    }

    .nav-name {
      font-size: 14px;
      // color: #C3BABA;
      color: #5991FF;
    }

    &.active {
      box-shadow: 0px 0px 2px 0px rgba(35, 0, 0, 0.4);
      background: #5991FF;

      i,
      .nav-name {
        color: #FFFFFF;
      }
    }

    &:hover {
      box-shadow: 0px 0px 2px 0px rgba(35, 0, 0, 0.4);
      background: #5991FF;

      i,
      .nav-name {
        color: #FFFFFF;
      }
    }
  }
}
</style>
