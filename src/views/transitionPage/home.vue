<template>
  <el-container>
    <!-- <img class="imgBg" src="@/assets/image/main_bg.png"/> -->
    <!-- 头部菜单 -->
    <el-header style="height: 120px; padding: 0;">
      <div class="staffTitle">
        <i
          class="iconfont icon-touxiang"
          style="margin-left: 100px; margin-right: 10px"
        ></i>
        <div class="titleName">{{ staffName + "，您好" }}</div>
        <div class="identity"><span>{{ "当前身份: "+ deptName }}</span>
          &nbsp;&nbsp;&nbsp;
          <i class="el-icon-user-solid"></i> <a href="javascript:void(0)" @click="switchIdentity"><strong>身份切换</strong></a>
        </div>
      </div>
      <divTitle></divTitle>
    </el-header>
    <!-- 主体 -->
    <el-container class="main-container">
      <!-- 侧边导航 -->
      <el-aside width="280px" style="margin-top: 20px; overflow-x: hidden;background: #FFF;">
        <el-menu :default-active="activePath"  class="el-menu-vertical-demo" @select="handleSelect">
          <template v-for="(nav, navIndex) in navList" >
            <template v-if="nav.children && nav.children.length > 0">
              <el-submenu :index="navIndex+''" :key="navIndex">
                <!-- 一级菜单 -->
                <template slot="title">
                  <div style="display: flex; align-items: center;">
                    <div style="display: flex;width: 14px;height: 14px;margin-right: 18px;">
                      <!-- 1 -->
                      <svg v-if="navIndex == 0" width="16px" height="13px" viewBox="0 0 16 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>形状 3</title><g id="五小备份" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="我的创新议题" transform="translate(-31.000000, -123.000000)" fill="#666666" fill-rule="nonzero"><g id="导航栏" transform="translate(0.000000, 106.000000)"><g id="编组" transform="translate(31.000000, 17.000000)"><path d="M9.17769523,12.9799886 L9.17769523,9.18558047 L6.82883688,9.18558047 L6.82883688,12.9901175 C6.75542991,12.9939595 6.69687182,12.99973 6.63829877,12.99973 C5.52925398,12.99973 4.41964095,13.0003375 3.3105214,12.99973 C2.92941529,12.99973 2.6731414,12.7514892 2.67145165,12.3403816 C2.66375057,10.7792298 2.66609827,9.2167871 2.67315635,7.65563524 C2.67315635,7.5733135 2.73473506,7.46803096 2.79686705,7.41184383 C3.80057905,6.5112704 4.80956965,5.61645235 5.81685555,4.72093578 C6.48735766,4.12483586 7.15729153,3.5286904 7.82777868,2.9332131 C7.87987684,2.88724595 7.93318623,2.84259996 7.9988024,2.78571429 C8.39886961,3.14063472 8.79715734,3.49356585 9.19486188,3.84714995 C10.5068562,5.0132759 11.8171458,6.18193788 13.1327141,7.34359924 C13.2741597,7.46801578 13.3345122,7.59437609 13.3333333,7.79541971 C13.3250466,9.27749958 13.3273793,10.7600958 13.330385,12.2414771 C13.3309383,12.5108564 13.2688063,12.745096 13.0480471,12.8938249 C12.9681503,12.9479771 12.8669596,12.9946428 12.7752495,12.9952654 C11.5981512,13.0016434 10.4210528,12.9983937 9.24461234,12.9977863 C9.22744569,12.9978166 9.20960609,12.9895101 9.17769523,12.9799886 L9.17769523,12.9799886 Z M11.1617932,2.24367726 C11.1617932,1.62740297 11.1611678,1.05826995 11.1617932,0.489704907 C11.1623865,0.12662441 11.2499747,0.0399346799 11.6161706,0.0393218666 C12.1848198,0.0393218666 12.7534531,0.0387240101 13.3221023,0.0399346799 C13.6153188,0.0406222178 13.716794,0.142945988 13.7174836,0.450156457 C13.7187985,1.66695144 13.7219095,2.88446384 13.713651,4.10125881 C13.7123681,4.28909154 13.7657036,4.409665 13.9147733,4.52902778 C14.5380729,5.02532648 15.1491853,5.53540586 15.7635208,6.04236142 C16.0649156,6.29116094 16.0725648,6.41233225 15.8187003,6.70827306 C15.6651726,6.88793005 15.5147879,7.07074075 15.359881,7.24979988 C15.1695188,7.47150139 15.0120943,7.48534185 14.7842882,7.29685148 C12.6030523,5.49515493 10.4218003,3.69224771 8.23987486,1.8899533 C8.16436178,1.82777583 8.08695647,1.7667941 7.9986788,1.69515549 C7.50814045,2.09978727 7.02135451,2.49995005 6.53585144,2.9013235 C4.76524696,4.363839 2.99461039,5.82686269 1.22395778,7.28928853 C0.984076679,7.48777811 0.834990862,7.47591059 0.633178985,7.24217715 C0.466181062,7.04806688 0.299984945,6.85267122 0.135616908,6.65676739 C-0.0560602697,6.42808586 -0.0484111437,6.28042933 0.183211478,6.08760448 C1.17131189,5.26904419 2.16202617,4.4536077 3.15203485,3.63696056 C4.47140501,2.54827209 5.79209011,1.46089891 7.11086693,0.370342108 C7.70929485,-0.124073335 8.29191137,-0.124073335 8.89167026,0.374108624 C9.60053747,0.96270199 10.3113931,1.54887403 11.021479,2.13556919 C11.0551865,2.16328001 11.090706,2.18898801 11.1617932,2.24367726 L11.1617932,2.24367726 Z" id="形状"></path></g></g></g></g></svg>
                      <!-- 2 -->
                      <svg v-if="navIndex == 1" width="14.0000054px" height="13px" viewBox="0 0 14.0000054 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>路径</title><g id="五小备份" stroke="none" stroke-width="1" ><g id="首页" transform="translate(-33.000000, -171.000000)"><g id="导航栏" transform="translate(0.000000, 106.000000)"><g id="立项管理" transform="translate(0.000000, 48.000000)"><path d="M46.1267894,25.1255881 L45.2789191,25.1255881 L45.2789191,23.0945832 C45.2789191,22.9267704 45.1319774,22.7903245 44.9512561,22.7903245 L40.3285048,22.7903245 L40.3285048,21.8759802 L41.75063,21.8759802 C42.2336796,21.8759802 42.6255241,21.5121245 42.6255241,21.0635782 L42.6255241,17.812402 C42.6255241,17.3638557 42.2336796,17 41.75063,17 L38.2510536,17 C37.7680039,17 37.3761595,17.3638557 37.3761595,17.812402 L37.3761595,21.0620099 C37.3761595,21.5105562 37.7680039,21.8744119 38.2510536,21.8744119 L39.6731787,21.8744119 L39.6731787,22.7887562 L35.0521165,22.7887562 C34.8713951,22.7887562 34.7244534,22.9252021 34.7244534,23.0930148 L34.7244534,25.1240198 L33.8748941,25.1240198 C33.3918445,25.1240198 33,25.4878755 33,25.9364218 L33,29.1860297 C33,29.6345759 33.3918445,29.9984317 33.8748941,29.9984317 L37.3744705,29.9984317 C37.8575201,29.9984317 38.2493646,29.6345759 38.2493646,29.1860297 L38.2493646,25.9379901 C38.2493646,25.4894438 37.8575201,25.1255881 37.3744705,25.1255881 L35.3797795,25.1255881 L35.3797795,23.3988418 L44.623593,23.3988418 L44.623593,25.1255881 L42.6255241,25.1255881 C42.1424744,25.1255881 41.75063,25.4894438 41.75063,25.9379901 L41.75063,29.187598 C41.75063,29.6361443 42.1424744,30 42.6255241,30 L46.1251005,30 C46.6081501,30 47,29.6361443 47,29.187598 L47,25.9379901 C47.0016835,25.4894438 46.6098391,25.1255881 46.1267894,25.1255881 L46.1267894,25.1255881 Z" id="路径"></path></g></g></g></g></svg>
                      <!-- 3 -->
                      <svg v-if="navIndex == 2" width="15px" height="11.2340426px" viewBox="0 0 15 11.2340426" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>形状</title><g id="五小备份" stroke="none" stroke-width="1"><g id="我的创新议题" transform="translate(-33.000000, -412.382979)"><g id="导航栏" transform="translate(0.000000, 106.000000)"><g id="成果管理" transform="translate(0.000000, 288.000000)"><g id="编组" transform="translate(33.000000, 18.382979)"><path d="M14.2969325,0 L0.703067485,0 C0.314723926,0 0,0.279421277 0,0.624204255 C0,0.968987234 0.314723926,1.24840851 0.703067485,1.24840851 L14.2969325,1.24840851 C14.6852761,1.24840851 15,0.968987234 15,0.624204255 C15,0.279421277 14.6852761,0 14.2969325,0 Z M9.84294479,7.49045106 L7.5,6.54924255 L5.15705521,7.49045106 L5.15705521,1.66345532 L0.469325153,1.66345532 L0.469325153,10.4023149 C0.469325153,10.8614809 0.888957055,11.2340426 1.40613497,11.2340426 L13.593865,11.2340426 C14.1110429,11.2340426 14.5306748,10.8614809 14.5306748,10.4023149 L14.5306748,1.66345532 L9.84294479,1.66345532 L9.84294479,7.49045106 Z M2.69447853,4.16190638 L1.75766871,4.16190638 C1.36932515,4.16190638 1.05460123,3.88248511 1.05460123,3.53770213 C1.05460123,3.19291915 1.36932515,2.91349787 1.75766871,2.91349787 L2.69447853,2.91349787 C3.08282209,2.91349787 3.39754601,3.19291915 3.39754601,3.53770213 C3.39754601,3.88248511 3.08282209,4.16190638 2.69447853,4.16190638 Z" id="形状"></path></g></g></g></g></g></svg>
                      <!-- 4 -->
                      <svg v-if="navIndex == 3" width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>形状 2</title><g id="五小备份" stroke="none" stroke-width="1"><g id="我的创新议题" transform="translate(-34.000000, -555.000000)"><g id="导航栏" transform="translate(0.000000, 106.000000)"><g id="成果管理备份" transform="translate(0.000000, 432.000000)"><g id="编组" transform="translate(33.000000, 17.000000)"><path d="M5.494,1.3747495 C5.746,1.3747495 5.956,1.45891784 6.138,1.63426854 C6.313,1.80961924 6.404,2.02004008 6.404,2.27254509 L6.404,5.87775551 C6.404,6.13026052 6.313,6.34068136 6.138,6.52304609 C5.963,6.69839679 5.746,6.78957916 5.494,6.78957916 L1.896,6.78957916 C1.644,6.78957916 1.434,6.69839679 1.259,6.52304609 C1.084,6.34068136 1,6.12324649 1,5.87775551 L1,2.26553106 C1,2.01302605 1.084,1.80260521 1.259,1.62725451 C1.434,1.45190381 1.644,1.36773547 1.896,1.36773547 L5.494,1.36773547 L5.494,1.3747495 Z M5.494,8.58517034 C5.746,8.58517034 5.956,8.66933868 6.138,8.84468938 C6.313,9.02004008 6.404,9.23046092 6.404,9.48296593 L6.404,13.1022044 C6.404,13.3547094 6.313,13.5651303 6.138,13.740481 C5.963,13.9158317 5.746,14 5.494,14 L1.896,14 C1.644,14 1.434,13.9158317 1.259,13.740481 C1.084,13.5651303 1,13.3547094 1,13.1022044 L1,9.48296593 C1,9.23046092 1.084,9.02004008 1.259,8.84468938 C1.434,8.66933868 1.644,8.58517034 1.896,8.58517034 L5.494,8.58517034 L5.494,8.58517034 Z M12.711,8.58517034 C12.963,8.58517034 13.173,8.66933868 13.348,8.84468938 C13.523,9.02004008 13.607,9.23046092 13.607,9.48296593 L13.607,13.1022044 C13.607,13.3547094 13.523,13.5651303 13.348,13.740481 C13.173,13.9158317 12.963,14 12.711,14 L9.113,14 C8.861,14 8.651,13.9158317 8.469,13.740481 C8.294,13.5651303 8.203,13.3547094 8.203,13.1022044 L8.203,9.48296593 C8.203,9.23046092 8.294,9.02004008 8.469,8.84468938 C8.644,8.66933868 8.861,8.58517034 9.113,8.58517034 L12.711,8.58517034 L12.711,8.58517034 Z M14.713,2.95991984 C14.902,3.1492986 15,3.38076152 15,3.64028056 C15,3.8997996 14.902,4.1242485 14.713,4.30661323 L12.032,6.99298597 C11.843,7.18236473 11.619,7.28056112 11.36,7.28056112 C11.108,7.28056112 10.884,7.18236473 10.688,6.99298597 L8.007,4.30661323 C7.825,4.1242485 7.734,3.8997996 7.734,3.64028056 C7.734,3.38076152 7.825,3.15631263 8.007,2.95991984 L10.688,0.273547094 C10.877,0.0911823647 11.101,0 11.36,0 C11.612,0 11.836,0.0911823647 12.032,0.273547094 L14.713,2.95991984 Z" id="形状"></path></g></g></g></g></g></svg>

                    </div>
                    <span>{{ nav.name }}</span>
                  </div>
                  
                </template>
                <template v-for="(item, index) in nav.children">
                  <template v-if="item.children">
                    <!-- 二级菜单 -->
                    <el-submenu  :index="navIndex+'-'+index " :key="index">
                      <template slot="title">
                        <i class="iconfont icon-17" style="margin-right: 18px; font-weight: 400"></i>
                        <span>{{ item.label }}</span>
                      </template>
                      <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path" @click="siderClick(subItem)" >
                        <!-- <i class="iconfont icon-17" style="margin-right: 18px; font-weight: 400" ></i> -->
                        <span slot="title">{{ subItem.label }}</span>
                      </el-menu-item>
                    </el-submenu>
                  </template>
                  <el-menu-item :index="item.path" v-else  @click="siderClick(item)" :key="index">
                    <!-- <i class="iconfont icon-17" style="margin-right: 18px; font-weight: 400"></i> -->
                    <span slot="title">{{ item.label }}</span>
                  </el-menu-item>
                </template>
              </el-submenu>
            </template>
            <el-menu-item :index="nav.path" v-else  @click="siderClick(nav)" :key="navIndex">
              <!-- <i class="el-icon-location" style="margin-right: 18px; font-weight: 400"></i> -->
              <i class="el-icon-s-home" style="margin-right: 18px; font-weight: 400;font-size: 16px;width: 14px;color: inherit;"></i>
              <span slot="title">{{ nav.name }}</span>
            </el-menu-item>
            
          </template>
          
        </el-menu>
      </el-aside>
      <!-- 页面 -->
      <el-main class="main-content">
        <!-- <el-tabs
          class="new-tabs-header"
          v-model="activeTabName"
          type="card"
          @tab-remove="removeTab"
          @tab-click="tabClick"
        >
          <el-tab-pane
            v-for="item in tabList"
            :closable="item.title !== '首页'"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs> -->
        <el-main class="main-content-1">
          <keep-alive :include="cachedPages">
            <router-view :key="$route.path" />
          </keep-alive>
        </el-main>
      </el-main>
    </el-container>

    <switchIdentity :visible="visible" @closeModel="closeModel"></switchIdentity>
  </el-container>


</template>

<script>
import { getStaffInfo, getMenuInfo } from "@/assets/api/common/index";
import divTitle from "@/components/workbench/title.vue";
import switchIdentity from "@/components/transitionPage/switchIdentity";
import { mapState, mapMutations } from "vuex";
export default {
  components: { divTitle,switchIdentity },
  data() {
    return {
      staffName: null,
      deptName:null,
      activeTabName: "",
      visible:false,
      navList: [],
      getMenuImgNameShow:true,
      approveRouter: [
        "/approval/applyDetail",
        "/expertResponse/index",
        // 成果管理
        "/resultManage/resultApprove",
        "/resultManage/resultCommitteeReview",
        "/resultManage/resultCityToProvApprove",
        "/innovate/partnerExamine",
      ],
    };
  },
  created() {
    // console.log('-------------> start')
    // if (this.approveRouter.includes(this.$route.path)) {
    //   getStaffInfo().then((response) => {
    //     if (response.rspCode === "0000") {
    //       sessionStorage.setItem("userInfo", JSON.stringify(response.rspBody));
    //       this.staffName = JSON.parse(
    //         sessionStorage.getItem("userInfo")
    //       )?.empName;
    //       this.deptName=JSON.parse(
    //           sessionStorage.getItem("userInfo")
    //       )?.identity;
    //       // this.$router.push("/");
    //     } else {
    //       // this.$router.push("/error");
    //     }
    //   });
    //   getMenuInfo().then((res) => {
    //     if (res.rspCode == "0000") {
    //       let arr = res.rspBody;
    //       arr.forEach((item) => {
    //         item.name = item.label;
    //         delete item.lable;
    //       });
    //       sessionStorage.setItem("menuInfo", JSON.stringify(arr));
    //       this.navList = JSON.parse(sessionStorage.getItem("menuInfo"));
    //       this.addNavList(this.navList);
    //       // 初始化
    //       this.initTab();
    //     } else {
    //       this.$router.push("/error");
    //     }
    //   });
    // } else {
    //   this.staffName = JSON.parse(sessionStorage.getItem("userInfo"))?.empName;
    //   this.deptName=JSON.parse(sessionStorage.getItem("userInfo"))?.identity;
    //   this.navList = JSON.parse(sessionStorage.getItem("menuInfo"));
    //   this.addNavList(this.navList);
    //   // 初始化
    //   this.initTab();
    // }
      getStaffInfo().then((response) => {
        if (response.rspCode === "0000") {
          sessionStorage.setItem("userInfo", JSON.stringify(response.rspBody));
          this.staffName = JSON.parse(
            sessionStorage.getItem("userInfo")
          )?.empName;
          this.deptName=JSON.parse(
              sessionStorage.getItem("userInfo")
          )?.identity;
          // this.$router.push("/");
        } else {
          // this.$router.push("/error");
        }
      });
      getMenuInfo().then((res) => {
        if (res.rspCode == "0000") {
          let arr = res.rspBody;
          arr.forEach((item) => {
            item.name = item.label;
            delete item.lable;
          });
          sessionStorage.setItem("menuInfo", JSON.stringify(arr));
          this.navList = JSON.parse(sessionStorage.getItem("menuInfo"));
          this.addNavList(this.navList);
          // 初始化
          this.initTab();
        } else {
          this.$router.push("/error");
        }
      });
  },
  mounted() {
  },
  computed: {
    ...mapState(["siderMenus", "tabList", "currentTab", "cachedPages"]),
    activePath(){
      let activePath = this.$router.path
      let currentTab = sessionStorage.getItem('currentTab')
      // console.log("currentTabactivePath-------",currentTab);
      if(currentTab && currentTab.length == 1){
        activePath = currentTab[0].name
      }      
      return activePath
    },
  },
  watch: {
    currentTab(val) {
      if (Object.keys(val).length > 0) {
        this.activeTabName = val.name;
        this.$router.push(val.name);
      } else {
        this.$router.push("/");
      }
    },
    $route: {
      immediate: true,
      handler(route) {
        const {
          name,
          meta: { keepAlive },
        } = route;
        if (name && keepAlive) {
          this.addCachedPages(route);
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      "changeSiderMenu",
      "addTabs",
      "removeTabs",
      "tabClicks",
      "addNavList",
      "changeTabList",
      "addCachedPages",
    ]),
    initTab() {
      const url = this.$route.path;
      if (url == "/") {
        sessionStorage.removeItem("tabList");
        sessionStorage.removeItem("currentTab");
        sessionStorage.removeItem("siderMenu");
        return this.topMenuClick(this.navList[0]);
      }
      const tabList = JSON.parse(sessionStorage.getItem("tabList")) || [];
      const currentTab = JSON.parse(sessionStorage.getItem("currentTab")) || {};
      const siderMenu = JSON.parse(sessionStorage.getItem("siderMenu")) || {};
      if (currentTab && currentTab.name === url) {
        
        this.changeTabList(tabList);
        this.changeSiderMenu(siderMenu);
        this.addTabs(currentTab);
      } else {
        
        let exist = null;
        if(this.navList && this.navList.length>0){
          this.navList.map((item) => {
          if (item.children) {
            item.children.map((j) => {
              if (j.path === url) {
                return (exist = {
                  routeData: item,
                  menu: j,
                });
              }
            });
          }
        });
        }
        if (exist) {
          this.changeTabList(tabList);
          this.changeSiderMenu(exist.routeData);
          this.addTabs(exist.menu);
        } else {
          const fullPath = this.$route.fullPath;
          if (this.approveRouter.includes(url)) {
            let titleLabel = "审核"
            if (url.includes('expertResponse/index')) {
              titleLabel = "专家回复"
            }
            //"/resultManage/resultApprove",
            if (url.includes('resultManage/resultApprove')) {
              titleLabel = "成果审核"
            }
            if (url.includes('resultManage/resultCityToProvApprove')) {
              titleLabel = "市级转省级成果审核"
            }
            if (url.includes('resultManage/resultCommitteeReview')) {
              titleLabel = "成果评分"
            }
            if (url.includes('talentManger/ownTaskList')) {
              titleLabel = "任务执行"
            }
            if (url.includes('talentAudit/examineFristApprove')) {
              titleLabel = "年审初审审核"
            }
            let tab = {
              label: titleLabel,
              path: fullPath,
              topMenu: "",
            };
            this.addTabs(tab);
            // sessionStorage.removeItem('siderMenu')
          } else {
            
            this.changeTabList(tabList);
            this.changeSiderMenu(siderMenu);
            this.addTabs(currentTab);
          }
        }
      }
    },
    siderClick(item) {
      this.addTabs(item);
    },
    tabClick(targetName) {
      this.tabClicks(targetName);
    },
    removeTab(targetName) {
      this.removeTabs(targetName);
    },
    //切换选项
    topMenuClick(item) {
      
      this.changeSiderMenu(item);
      this.siderClick(
        item.children[0].path ? item.children[0] : item.children[0].children[0]
      );
    },
    switchIdentity(){
      this.visible=true
    },
    closeModel(){
      this.visible=false
      this.staffName = JSON.parse(
          sessionStorage.getItem("userInfo")
      )?.empName;
      this.deptName=JSON.parse(
          sessionStorage.getItem("userInfo")
      )?.identity;
    },
    handleSelect(key, keyPath){
      console.log(key, keyPath,'==========')
      // console.log(key, keyPath,'==========')
      this.$router.push(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.staffTitle {
  background: #f7f7f7;
  width: 100%;
  height: 30px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #333333;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .titleName{
    margin-right: auto;
  }
  .identity{
    margin-right: 31px;
    span{
      color: red;
    }



    a{
      text-decoration: none;
      color: #040404;
      &:hover{
        color: #2248DD;
      }
    }
  }
}

.nav-bar {
  display: flex;
  height: 40px;
  align-items: center;
  background-color: #5991FF;

  .nav-item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: calc(100% / 11);
    height: 100%;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    font-weight: 400;

    &.active {
      background-color: rgb(35,79,166);
    }
  }
}

.el-menu-vertical-demo {
  height: 100%;
  font-size: 16px;
  font-weight: 600;
  border: none;
}

.imgBg{
  position: absolute;
  width: 100vw;
  height: 100vh;
  top:0;
  left: 0;
  object-fit: cover;
}

.main-container {
  height: calc(100vh - 120px);
  padding-right: 0;
  // z-index: 1;
  background-image: url('../../assets/image/main_bg.png');
  background-position: center;
  background-size: 100%;
  background-repeat: no-repeat;
  font-family:"Microsoft YaHei";
}

.main-content {
  padding-bottom: 0;
  padding-right: 0;
  flex: 1;
  // background: #fff;
  padding: 20px 0 0 20px;
  // padding: 0;
  // height: calc(100vh - 180px)
}
.main-content-1 {
  padding: 0;
  height: 100%;
  // height: calc(100vh - 220px);
}
.el-menu-item.is-active {
   background-color: rgb(211 229 250) !important;
}
</style>
