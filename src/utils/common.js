const exportBlobFile = (data, filename) => {
  if (!data) {
    return
  }
  const blob = new Blob([data], { type: 'application/x-www-form-urlencoded' })
  if (window.navigator.msSaveBlob) { //判断了有该方法即为IE浏览器
    window.navigator.msSaveBlob(blob, filename)
  } else {
    const blobUrl = window.URL.createObjectURL(blob)
    // 谷歌浏览器 创建a标签 添加download属性下载
    const aElement = document.createElement('a') //动态创建a标签
    document.body.appendChild(aElement) //将创建的a标签追加到body内
    aElement.style.display = 'none' //可以设置a标签并不可见
    aElement.href = blobUrl //a标签的href为处理过的blob
    aElement.download = filename
    aElement.click()
    document.body.removeChild(aElement)
    window.URL.revokeObjectURL(blobUrl) //释放掉blob对象
  }
}

const filterYear = () => {
  let date = new Date()
  let currentYear = date.getFullYear()
  let arr = []
  for (let i = 0; i < 10; i++) {
    arr.push({
      id: currentYear - i,
      name: currentYear - i
    })
  }
  return arr
}


/**
 * base64编码
 * @param {Object} str
 */
const base64encode = (str) => {
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var out, i, len;
  var c1, c2, c3;
  len = str.length;
  i = 0;
  out = "";
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}
const getActuralPosition=(element)=>{
  let acturalLeft = element.offsetLeft;
  let acturalTop = element.offsetTop;
  let curElement =  element.offsetParent;
  while(curElement){
    acturalLeft += curElement.offsetLeft;
    acturalTop += curElement.offsetTop;
    curElement = curElement.offsetParent;
  }
  return {
    left: acturalLeft,
    top: acturalTop,
  }
}
const getpastDay=()=>{
  let date=new Date();
  let year=date.getFullYear();
  let month=date.getMonth()+1;
  let day=date.getDate()
  month = (month > 9) ? month : ("0" + month);
  day = (day < 10) ? ("0" + day) : day;
  let mothcopy;
  let yearcopy;
  let daycopy;
  // let mothArr=[1,3,5,7,8,10,12]
  // if(month==1){
  //   mothcopy=12;
  //   yearcopy=year-1;
  //   daycopy=day
  // }else{
  //   yearcopy=year;
  //   mothcopy=month-1;
  //   if(mothArr.includes(mothcopy)){
  //     daycopy=day;
  //   }else{
  //     if(mothcopy==2&&day>=29){
  //       daycopy=28;
  //     }else{
  //       if(day==31){
  //         daycopy=30;
  //       }else{
  //         daycopy=day
  //       }
  //     }
  //   }
  // }
  let now=new Date();
  let time = now.getTime() + 1000 * 60 * 60 * 24 * 30;
  now.setTime(time)
  yearcopy=now.getFullYear();
  mothcopy=now.getMonth()+1;
  daycopy=now.getDate();
  mothcopy = (mothcopy > 9) ? mothcopy : ('0' + mothcopy);
  daycopy = (daycopy < 10) ? ("0" + daycopy) : daycopy;
  let today = year + "-" + month + "-" + day;
  let pastDay=yearcopy + "-" + mothcopy + "-" + daycopy;
  return [today,pastDay]
}
export {
  exportBlobFile,
  filterYear,
  base64encode,
  getActuralPosition,
  getpastDay
}