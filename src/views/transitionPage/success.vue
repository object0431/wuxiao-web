<template>
  <div class="errorPage">
    <div class="errorMain">
      <img src="../../assets/image/error-01.svg" alt="error" />
      <div class="tipbar">
        <h2>您好！</h2>
        <span>欢迎进入陕西五小创新平台</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getStaffInfo, getMenuInfo } from "@/assets/api/common/index";
export default {
  created() {
    const query = this.$route.query;
    if (query.token) {
      
      document.cookie = `token=${query.token}`;
      getStaffInfo().then((response) => {
        if (response.rspCode === "0000") {
          sessionStorage.setItem("userInfo", JSON.stringify(response.rspBody));
          // this.$router.push("/");
        } else {
          // this.$router.push("/error");
        }
      });
      getMenuInfo().then((res) => {
        if (res.rspCode == "0000") {
          let arr = res.rspBody
          arr.forEach(item => {
            item.name = item.label
            delete item.lable
          });
          
          arr.unshift({
            "menuId": "LXGL",
            "parentMenuId": "-1",
            "label": "首页",
            "name": "首页",
            "sort": "1",
            "children": [],
            "path": "/workbench"
          })
          console.log(arr,'===========')
          sessionStorage.setItem("menuInfo", JSON.stringify(arr));
          if (query.forwordUrl){
            let url=query.forwordUrl;
            let urlName=url.split('?')[0]
            let obj = {};
            if (url.split('?').length>1){
              let urlStr = url.split('?')[1];
              let paramsArr = urlStr.split('&');
              for(let i = 0,len = paramsArr.length;i < len;i++){
                let arr = paramsArr[i].split('=');
                obj[arr[0]] = arr[1];
              }
            }
            let url2=urlName.split('//')[1].split('/')
            let url3='';
            for(let i=1;i<url2.length;i++){
              url3+='/';
              url3=url3+url2[i]
            }
            this.$router.push({
              path:url3,
              query:{
                ...obj
              }
            })

          }else {
            this.$router.push("/");
          }

        }else{
          this.$router.push("/error");
        }
      });
    } else {
      this.$router.push("/error");
    }
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
