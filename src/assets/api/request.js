import axios from 'axios'
import {SSOCheck} from "@/assets/api/common";
// 超时时间
axios.defaults.timeout = 300000
//baseurl
let baseURl

if (process.env.NODE_ENV === 'development') {
    //开发
    baseURl = '/api'
    // baseURl = process.env.VUE_APP_BASE_API
} else if (process.env.NODE_ENV === 'devtest') {
    //测试
    console.log('这是测试环境');
    baseURl = process.env.VUE_APP_BASE_API
} else if (process.env.NODE_ENV === 'production') {
    //生产
    console.log('这是生产环境');
    baseURl = process.env.VUE_APP_BASE_API
}

axios.defaults.baseURL = baseURl
//创建cookie
// token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzODg5OWE5NTFiYmI0NzYzOGQ3MTVkNWIxY2FhMTE1MyIsInN1YiI6InpoYW5nengxMjgiLCJpc3MiOiJzZyIsImlhdCI6MTY5MTQ2NDU0MCwiZXhwIjoxNjkxNDcxNzQwfQ.SdOvy920mZxdVAQ-RuOXyijXYwesriWRz_hkY1hvBmM
document.cookie =
// "token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5YjFiNDM3ZjgyZDY0NzU2OTUzOTMzYjMzZDA4YTE4NiIsInN1YiI6InpoYW5nengxMjgiLCJpc3MiOiJzZyIsImlhdCI6MTcxMzI0ODY1MCwiZXhwIjoxNzEzMjU1ODUwfQ.ZLAo7Kfp45onRaW_l-J1H-C_bUeppizxJbFtisNUED0";
    // "token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0YzEyNDA4ZTJkYzY0OTRlYThmN2EwYWU0ZDcwY2YzMSIsInN1YiI6InpoYW5nengxMjgiLCJpc3MiOiJzZyIsImlhdCI6MTY4ODQzMzU2MSwiZXhwIjoxNjg4NDQwNzYxfQ.FICpShfDZZfGUSCes3xg-hOml8-7_JVyrcuOeThvBq0";
// http请求拦截器
axios.interceptors.request.use(config => {
    if(config.method === "get"){
        config.url = encodeURI(config.url)
    }
    //做点什么
    return config
}, error => {
    return Promise.reject(error)
})

// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    return data
}, error => {
    //处理响应500的情况
    if (error.response.status === 500) {
        if (error.response.data.rspCode === '0909') {
            SSOCheck().then((res) => {
                let url
                if (process.env.NODE_ENV == 'development') {
                    url = 'http://10.125.131.21:9030'
                } else {
                    url = document.location.origin
                }
                console.log(res)
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
                    url + "/fsip-project/userCenter/loginCheckSuccess?url=" + encodeURIComponent(window.location.href);
                // 创建
                var input2 = document.createElement("input");
                input2.type = "text";
                input2.name = "error";
                input2.value =
                    url + "/fsip-project/userCenter/loginCheckError";
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
            })
        }
    }
    return Promise.reject(error)
})
