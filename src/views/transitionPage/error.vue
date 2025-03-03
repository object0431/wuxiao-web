<template>
  <div class="errorPage">
    <div class="errorMain">
      <img src="../../assets/image/error-01.svg" alt="error" />
      <div class="tipbar">
        <h2>您好！</h2>
        <span>您的界面已暂时离开地球</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var form1 = document.createElement("form");
    form1.id = "form1";
    form1.name = "form1";
    // 添加到 body 中
    document.body.appendChild(form1);
    // 创建
    var input1 = document.createElement("input");
    input1.type = "text";
    input1.name = "success";
    input1.value =
      document.location.origin + "/fsip-project/userCenter/success";
    // 创建
    var input2 = document.createElement("input");
    input2.type = "text";
    input2.name = "error";
    input2.value = document.location.origin + "/fsip-project/userCenter/error";
    // 创建
    var input3 = document.createElement("input");
    input3.type = "text";
    input3.name = "appid";
    input3.value = "HN202209091404211568118088131977217";
    // 将输入框插入到 form 中
    form1.appendChild(input1);
    form1.appendChild(input2);
    form1.appendChild(input3);
    // form 的提交方式
    form1.method = "POST";
    // form 提交路径
    form1.action = process.env.NODE_ENV == 'production' ? 'https://uac.sso.chinaunicom.cn/uac-sso/pro_login' : "https://10.124.131.213:8101/uac-sso/pro_login";
    // 对该 form 执行提交
    form1.submit();
    // 删除该 form
    document.body.removeChild(form1);
  },
};
</script>

<style scope lang="scss">
.errorPage {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 140px;
  box-sizing: border-box;
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;

  .errorMain {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-content: center;

    .tipbar {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-content: center;
      text-align: center;
    }
  }
}
</style>
