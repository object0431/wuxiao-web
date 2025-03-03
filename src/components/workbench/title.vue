<template>
  <div class="workbenchTitle">
    <div class="left">
      <div class="left_unicom"></div>
      <div class="left_center_separation"> </div>
      <div class="left_xiaowu_innovate"></div>
    </div>
    <div class="center">
      <div class="center-gradient"></div>
      <!-- <div class="center-top">中国联合网络通信有限公司陕西省分公司</div>
      <div class="center-bottom">五小创新平台</div> -->
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.workbenchTitle {
  display: flex;
  width: 100%;
  height: 90px;
  // margin-bottom: 20px;
  align-items: center;
  background-color: #fff;
  .left{
    // margin-left: 24px;
    display: flex;
    justify-content: space-between;
    width: 252px;
    margin: 0px 14px;
    // gap: 10px;
    .left_unicom {
      width: 90px;
      height: 90px;
      background-image: url("../../assets/image/unicom.png");
      background-repeat: no-repeat;
      background-position: 100% 100%;
      background-size: auto 100%;
      box-sizing: border-box;
      // padding: 10px 0;
    }
    .left_center_separation{
      width: 1px;
      height: 90px;
      opacity: 0.25;
      border-left: 1px solid #979797;
    }
    .left_xiaowu_innovate{
      width: 76px;
      height: 70px;
      background-image: url("../../assets/image/innovate.png");
      background-repeat: no-repeat;
      background-position: 100% center;
      background-size: auto 100%;
      margin-top: 10px;
    }
  }
  

  .center {
    width: calc(100% - 364px);
    // border-left: 1px solid rgba(241, 241, 241, 1);
    // margin-left: 20px;
    // padding-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    // .center-top {
    //   font-family: PingFangSC-Regular;
    //   font-size: 14px;
    //   color: #333333;
    //   font-weight: 400;
    //   margin: 10px 0;
    // }
    .center-gradient{
      width: 403px;
      height: 27px;
      background-image: url("../../assets/image/center_gradient_title.png");
      background-repeat: no-repeat;
      background-position: 100% 100%;
      background-size: auto 100%;
      box-sizing: border-box;
    }

    // .center-bottom {
    //   font-family: PingFang-SC-Heavy;
    //   font-size: 28px;
    //   color: #333333;
    //   font-weight: 800;
    // }
  }

  .right {
    width: 70px;
    height: 70px;
    background-image: url("../../assets/image/trade_union.png");
    background-repeat: no-repeat;
    background-position: 100% center;
    background-size: auto 80%;
    margin-right: 14px;
  }
}
</style>

