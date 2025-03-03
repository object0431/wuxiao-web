<template>
  <div class="mainpage-item-box">
    <div class="title">
      {{ dataArr.title}}
    </div>
    <!-- 是否显示加载中 -->
    <div key="" class="main-bg-box" >
      <div  @click="toRight"  v-show="list && list.length">
        <div style="width:23px;height:45px;background:#e8f0ff;position: absolute;left:12px;top:135px;">
          <i class="el-icon-caret-right" style="margin-top:10.5px;margin-left:2px;color:#5991FF"></i>
        </div>
      </div>
      <div @click="toLeft"  v-show="list && list.length">
        <div style="width:23px;height:45px;background:#e8f0ff;position: absolute;right:13px;top: 145px;">
          <i class="el-icon-caret-left" style="margin-top:10.5px;margin-left:2px;color:#5991FF"></i>
        </div>
      </div>
    
      <div class="top-tab-box">
        <div v-for="(item, index) in yearArr" :key="index" class="tab-item" :class="item == checkYear && 'select'"
          @click="checkItem">{{item}}</div>
      </div>
      <div class="content-box" :id= "`myScorll${typeStr}`" v-show="list && list.length">
        <div class="c-item-box" 
        v-for="(itt, ind) in list" :key="ind"
          @click="goDetail(itt)"
          :style="itt.url && `background-image:url(${itt.url})`"
          
          >
          <div>
            <div class="c-item-smegma"></div>
            <div class="c-item-contentbox">
              <div class="item-type">
                <!-- <img src="../../assets/image/main_slices.png" alt="" style="margin-right:3px;width:13px"> -->
              {{itt.achievementName || ""}}
              </div>
              <div class="item-content">
                <div class="sub-title">创造人</div>
                <div class="sub-name">{{itt.applyName || ""}}</div>
              </div>
              <div class="item-content" v-show="typeStr!=1">
                <div class="sub-title">申请单位</div>
                <div class="sub-name">{{itt.applyCompanyName || ""}}</div>
              </div>
              <div class="item-title">{{itt.projectName || ""}}</div>
              
            </div>
          </div>
        </div>
      </div>
      <div  v-show="!list || !list.length" class="noDataBox">
        <div><img src="../../assets/image/无数据.png"  alt=""></div>
        <div style="margin-top:10px">敬请期待</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    downloadBase64
} from '@/assets/api/common/index'
  export default {
    created() {

    },
    mounted() {
    },
    watch: {
      tdataArr(){
          if(this.tdataArr && this.tdataArr.length){
              // 初始值默认选第一个
              let checkYear=this.tdataArr[0].achievementDate
              this.list=this.tdataArr[0].achievementList
              this.checkYear=checkYear
              
              
          }
            
      },
      async dataArr() {
        if (this.dataArr && this.dataArr.list && this.dataArr.list.length) {
          this.tdataArr=this.dataArr.list
          this.initData()
        }
      }
    },
    props: {
      dataArr: { type: Object },
      title: { type: String, default: "" },
      typeStr: {type: String, default: ""}
    },
    data() {
      return {
        yearArr:[],
        checkYear: "",
        list: [],
        tdataArr: [],
        position: 0,
        itemWidth: 100,
        ImgUrl:"",
        loading:false,
      };
    },

    methods: {
      initData(){
        let newList = this.tdataArr
        let yearArr =[]
        // this.loading = true;
        if(newList && newList.length){
          newList.map((item,index)=>{
             yearArr.push(item.achievementDate)
             if(item.achievementList && item.achievementList.length){
              let tempList=item.achievementList
              tempList.map((titem,tindex)=>{
                if(titem.backImage && titem.backImage.length){
                  this.queryBase64(titem.achievementName,titem.backImage,index,tindex);
                }
              })
             }
          })
        }
        this.yearArr=yearArr
        
   
      },
      LoadPrint(year) {
        let tempArr = []
        if (this.tdataArr&& this.tdataArr.length) {
           this.tdataArr.map((item,index)=>{
            if (year==item.achievementDate) {
              tempArr = item.achievementList || []
            }
          })
          this.list = tempArr
        }
      },
      checkItem(e) {
        
        this.checkYear = e.target.innerText;
        this.LoadPrint(e.target.innerText)
      },
      toRight() {
        var div="",left=""
        if(this.typeStr==1){
          div = document.getElementById("myScorll1")
        }
        if(this.typeStr==2){
          div = document.getElementById("myScorll2")
        }
        if(this.typeStr==3){
          div = document.getElementById("myScorll3")
        }
        this.ifAddScorll(div)
      },
      ifAddScorll(div){
        let myWidth = div.scrollWidth - div.clientWidth
        let needWidth = myWidth - div.scrollLeft
        if (div.scrollLeft >= myWidth || needWidth < 5) {
          this.$message.warning("已经到最右侧了");
          return
        }
        if(div.scrollLeft!=undefined){
          div.scrollLeft=div.scrollLeft + 200;
        }
      },
      ifSubScorll(div){
        if(div.scrollLeft==0 ||  div.scrollLeft==undefined){
          this.$message.warning("已经到最左侧了");
          return
        }
        if(div.scrollLeft && div.scrollLeft!=undefined && div.scrollLeft!=0){
          div.scrollLeft=div.scrollLeft - 200;
        }
      },
      toLeft() {
        var div = ""
        if(this.typeStr==1){
          div = document.getElementById("myScorll1")
        }
        if(this.typeStr==3){
          div = document.getElementById("myScorll3")
        }
        if(this.typeStr==2){
          div = document.getElementById("myScorll2")
        }
        this.ifSubScorll(div)
      },
      goDetail(itt){
        if(this.typeStr=='1'){
          this.$router.push(`/countryManage/countryDetail?projectId=${itt.achievementId}`)
        }else{
          this.$router.push({
            name: "myResultDetail",
            params: {
              applyId: itt.achievementId ,
              type: "view",
              // isWhere:"workbench",
            },
          });
        }
      },
      async queryBase64(achievementName,name,index,ind){
        let imgStr=""
        if(name && name.length){
          const res =  await downloadBase64(name);
          if(res){
            imgStr='data:image/png;base64,'+ res
            this.tdataArr[index].achievementList[ind].url=imgStr
            this.tdataArr[index].achievementList[ind].achievementName=""
            this.$set(this.tdataArr[index].achievementList[ind], 'url', imgStr)
            this.$set( this.tdataArr[index].achievementList[ind], 'achievementName',achievementName)
            // if(flag){
            //   this.loading=false
            // }
          }
          // if(flag){
          //   this.loading=false
          // }
        }

      },
    },
  };
</script>

<style lang="scss" scoped>
  .mainpage-item-box {
    // width: 100%;
    min-height: 350px;
    background: #ffffff;
    border-radius: 8px;
    margin-bottom: 15px;
    padding:0px 35px;
    position: relative;
    .title {
      width: 100%;
      font-size: 21px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin: 15px 0 10px 0;
    }

    .main-bg-box {
      display: flex;
      flex-direction: column;
      min-height: 280px;
      background: #ffffff;
      margin: 0 15px;

      // border: 1px solid #5991FF;
      .top-tab-box {
        height: auto;
        display: flex;
        margin-bottom: -1px;
        z-index: 2;

        .tab-item {
          font-size: 15px;
          font-family: SourceHanSansCN-Regular, SourceHanSansCN;
          font-weight: 400;
          color: #666666;
          // line-height: 27px;
          padding: 10px 20px;
          // border-bottom: 1px solid #5991ff;

          &.select {
            border-radius: 4px;
            font-weight: 500;
            color: #5991ff;
            border: 1px solid #5991ff;
          }
        }
      }

      .content-box {
        height: auto;
        flex: 1;
        display: flex;
        background: #ffffff;
        // border: 1px solid #5991ff;
        padding-top: 15px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        overflow-x: scroll;
        overflow-y: hidden;
        scrollbar-width: none;
        margin-right: '5px';
        padding: 15px 15px 0px 5px;

        .c-item-box {
          width: 300px;
          height: 200px;
          background-image: url("../../assets/image/defaultBackground.jpg");
          background-position: center;
          background-repeat: no-repeat;
          // background-size: cover;
          background-size: 300px 200px;
          border-radius: 8px;
          margin-left: 15px;
          margin-bottom: 15px;
          margin-right: 15px;
          position: relative;
          flex-shrink: 0; // 固定宽度

          .c-item-smegma {
            position: absolute;
            width: 300px;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 3;
            background-image: url("../../assets/image/main_bg_smegma.png");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            border-radius: 10px;
          }

          img {
            z-index: 2;
          }
          .c-item-contentbox {
            width: 100%;
            position: absolute;
            height: 95%;
            display: flex;
            flex-direction: column;
            z-index: 4;

            .item-type {
              font-size: 13px;
              font-family: SourceHanSansCN-Bold, SourceHanSansCN;
              font-weight: bold;
              color: #ffffff;
              background-position: left center;
              background-repeat: no-repeat;
              background-size: 13px;
              text-indent: 16px;
              margin: 15px 10px 16px 12px;
            }
            
            .item-title {
              flex: 1;
              font-size: 13px;
              font-family: SourceHanSansCN-Bold, SourceHanSansCN;
              font-weight: bold;
              color: #ffffff;
              // margin: 5px 10px 0 10px;
              margin: 10px 4px 2px 10px;
              // display: flex;
              // display: -ms-flexbox;
              // align-items: end;
              // -ms-flex-align: end;
              position: absolute;
              bottom: 2px;
            }

            .item-content {
              margin: 5px 10px 0 10px;
              display: flex;
              font-size: 11px;
              font-family: SourceHanSansCN-Regular, SourceHanSansCN;
              margin-top: 4px;
              padding-bottom: 7px;
              .sub-title {
                font-size: 11px;
                color: #cecece;
                margin-right: 5px;
                padding-bottom: 7px;
              }

              .sub-name {
                flex: 1;
                // font-size: 18px;
                // zoom: 50%;
                // -moz-transform: scale(0.5);
                // -moz-transform-origin: top left;
                // font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                color: #fff;
              }

              // &:last-child {
              //   margin-top: 3px;
              //   margin-bottom: 10px;
              // }
            }
          }
        }
      }
    }
    .noDataBox{
      color: #666;
      font-size: 13px;
      /* line-height: 20px; */
      text-align: center;
      margin-top: 52px;

    }
    .noDataBox img{
      width:100px
      
    }
  }
</style>
