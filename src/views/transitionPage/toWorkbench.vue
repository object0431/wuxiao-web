<template>
  <div class="toWorkbench">
    <img src="../../assets/image/error-01.svg" alt="error" />
    <div class="tipbar">
      <span>正在获取用户信息，请稍后...</span>
    </div>
  </div>
</template>

<script>
import { SSOCheck } from "@/assets/api/common/index";
export default {
  mounted() {
    SSOCheck().then((res) => {
      
      // 创建一个 form
      
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
        document.location.origin + "/fsip-project/userCenter/loginCheckSuccess";
      // 创建
      var input2 = document.createElement("input");
      input2.type = "text";
      input2.name = "error";
      input2.value =
        document.location.origin + "/fsip-project/userCenter/loginCheckError";
      // 创建
      var input3 = document.createElement("input");
      input3.type = "text";
      input3.name = "appid";
      input3.value = "HN202209091404211568118088131977217";
      // 将输入框插入到 form 中
      form1.appendChild(input1);
      form1.appendChild(input2);
      form1.appendChild(input3);
      form1.method = "GET";
      form1.action = process.env.NODE_ENV == 'production' ? 'https://uac.sso.chinaunicom.cn/uac-sso/check_login' : "https://10.124.131.213:8101/uac-sso/check_login";
      form1.submit();
      document.body.removeChild(form1);
    });
  },
};
</script>

<style lang="scss" scope>
.toWorkbench {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 48px 0;
  background-color: #fff;
  padding: 20px;
  height: 100%;
}
</style>
