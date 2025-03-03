<template>
  <div class="staff-page">
    <div class="work-body">

      <div class="bottomBottom">
        <el-button class="bottoBtn" @click="goinnovateApp" style="border: none;">

          
          
          <!-- <svg style="width:16px;width:16px;fill: currentColor;margin-right: 2px;" width="16px" height="16.0000015px"
            viewBox="0 0 16 16.0000015" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>编组</title>
            <g id="五小备份" stroke="none" stroke-width="1">
              <g id="首页" transform="translate(-314.000000, -118.000000)">
                <g id="编组" transform="translate(314.000000, 118.000000)">
                  <path
                    d="M6.0484061,16 L0.96335799,16 C0.431648485,15.9992107 0.000816136358,15.5825405 0,15.0683091 L0,0.931690929 C0.000816136358,0.417459535 0.431648485,0.000789308699 0.96335799,0 L13.036642,0 C13.5683515,0.000789308699 13.9991839,0.417459535 14,0.931690929 L14,5.83023516 C14,6.12709594 13.7511673,6.36774916 13.4442165,6.36774916 C13.1372658,6.36774916 12.8884331,6.12709594 12.8884331,5.83023516 L12.8884331,1.07413214 L1.11027009,1.07413214 L1.11027009,14.924972 L6.0484061,14.924972 C6.35535682,14.924972 6.60418953,15.1656252 6.60418953,15.462486 C6.60418953,15.7593468 6.35535682,16 6.0484061,16 Z"
                    id="路径"></path>
                  <path
                    d="M15.7394999,9.08102829 L13.9179561,7.25962331 C13.5705408,6.9134589 13.0086392,6.9134589 12.6612238,7.25962331 L11.7201109,8.19995236 C11.705752,8.21115186 11.6920265,8.22314067 11.6789978,8.23586334 C11.6658918,8.24915041 11.6536836,8.26297614 11.6421935,8.27716096 L7.26050648,12.6600962 C7.09330415,12.8264201 6.99951247,13.0526851 7.00000191,13.2885384 L7.00000191,15.110482 C7.00079461,15.6014196 7.39853302,15.9992062 7.88941124,16 L9.71041636,16 C9.94622923,16.0004285 10.1724448,15.9066347 10.3387825,15.7394629 L13.6709185,12.4074625 C13.8638711,12.2144865 13.863871,11.9016107 13.6709185,11.7086348 C13.4779659,11.5156589 13.1651279,11.5156589 12.9721753,11.7086348 L9.66876466,15.0124451 L7.98815449,15.0124451 L7.98815449,13.3300156 L12.0305237,9.28697777 L14.0569148,11.313614 C14.2511771,11.5071903 14.5649155,11.5087104 14.761044,11.3170255 L15.7394999,10.33899 C16.0868334,9.99161303 16.0868334,9.42840522 15.7394999,9.08102829 Z M14.4109543,10.2698613 L12.7294464,8.58832963 L13.2892309,8.02829787 L14.9707387,9.71000912 L14.4109543,10.2698613 Z"
                    id="形状"></path>
                  <path
                    d="M3.5115717,3 L10.4884283,3 C10.8294761,3 11,3.16666667 11,3.5 L11,3.5 C11,3.83333333 10.8294761,4 10.4884283,4 L3.5115717,4 C3.17052389,4 3,3.83333333 3,3.5 L3,3.5 C3,3.16666667 3.1705239,3 3.5115717,3 L3.5115717,3 Z"
                    id="路径"></path>
                  <path
                    d="M3.5115717,6 L10.4884283,6 C10.8294761,6 11,6.16666666 11,6.5 L11,6.5 C11,6.83333333 10.8294761,7 10.4884283,7 L3.5115717,7 C3.17052389,7 3,6.83333333 3,6.5 L3,6.5 C3,6.16666665 3.1705239,6 3.5115717,6 Z"
                    id="路径"></path>
                  <path
                    d="M3.44901288,9 L7.55098712,9 C7.85032905,9 8,9.16666667 8,9.5 L8,9.5 C8,9.83333333 7.85032904,10 7.55098712,10 L3.44901288,10 C3.14967095,10 3,9.83333333 3,9.5 L3,9.5 C3,9.16666667 3.14967096,9 3.44901288,9 L3.44901288,9 Z"
                    id="路径"></path>
                </g>
              </g>
            </g>
          </svg> -->



          <div class="btnRows">
            <div class="firstImage">
              <el-image :src="firstImage" style="height: 16px;width: 16px;" fit="scale-down"></el-image>
            </div>
            <div>我要申报创新立项</div>
          </div>
          
        </el-button>
        <el-button class="bottoBtn" @click="goresultApplication" style="border: none;">



          <!-- <svg style="width:16px;width:16px;fill: currentColor;margin-right: 2px;" width="16px" height="16.0000015px"
            viewBox="0 0 16 16.0000015" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>编组</title>
            <g id="五小备份" stroke="none" stroke-width="1">
              <g id="首页" transform="translate(-314.000000, -118.000000)">
                <g id="编组" transform="translate(314.000000, 118.000000)">
                  <path
                    d="M6.0484061,16 L0.96335799,16 C0.431648485,15.9992107 0.000816136358,15.5825405 0,15.0683091 L0,0.931690929 C0.000816136358,0.417459535 0.431648485,0.000789308699 0.96335799,0 L13.036642,0 C13.5683515,0.000789308699 13.9991839,0.417459535 14,0.931690929 L14,5.83023516 C14,6.12709594 13.7511673,6.36774916 13.4442165,6.36774916 C13.1372658,6.36774916 12.8884331,6.12709594 12.8884331,5.83023516 L12.8884331,1.07413214 L1.11027009,1.07413214 L1.11027009,14.924972 L6.0484061,14.924972 C6.35535682,14.924972 6.60418953,15.1656252 6.60418953,15.462486 C6.60418953,15.7593468 6.35535682,16 6.0484061,16 Z"
                    id="路径"></path>
                  <path
                    d="M15.7394999,9.08102829 L13.9179561,7.25962331 C13.5705408,6.9134589 13.0086392,6.9134589 12.6612238,7.25962331 L11.7201109,8.19995236 C11.705752,8.21115186 11.6920265,8.22314067 11.6789978,8.23586334 C11.6658918,8.24915041 11.6536836,8.26297614 11.6421935,8.27716096 L7.26050648,12.6600962 C7.09330415,12.8264201 6.99951247,13.0526851 7.00000191,13.2885384 L7.00000191,15.110482 C7.00079461,15.6014196 7.39853302,15.9992062 7.88941124,16 L9.71041636,16 C9.94622923,16.0004285 10.1724448,15.9066347 10.3387825,15.7394629 L13.6709185,12.4074625 C13.8638711,12.2144865 13.863871,11.9016107 13.6709185,11.7086348 C13.4779659,11.5156589 13.1651279,11.5156589 12.9721753,11.7086348 L9.66876466,15.0124451 L7.98815449,15.0124451 L7.98815449,13.3300156 L12.0305237,9.28697777 L14.0569148,11.313614 C14.2511771,11.5071903 14.5649155,11.5087104 14.761044,11.3170255 L15.7394999,10.33899 C16.0868334,9.99161303 16.0868334,9.42840522 15.7394999,9.08102829 Z M14.4109543,10.2698613 L12.7294464,8.58832963 L13.2892309,8.02829787 L14.9707387,9.71000912 L14.4109543,10.2698613 Z"
                    id="形状"></path>
                  <path
                    d="M3.5115717,3 L10.4884283,3 C10.8294761,3 11,3.16666667 11,3.5 L11,3.5 C11,3.83333333 10.8294761,4 10.4884283,4 L3.5115717,4 C3.17052389,4 3,3.83333333 3,3.5 L3,3.5 C3,3.16666667 3.1705239,3 3.5115717,3 L3.5115717,3 Z"
                    id="路径"></path>
                  <path
                    d="M3.5115717,6 L10.4884283,6 C10.8294761,6 11,6.16666666 11,6.5 L11,6.5 C11,6.83333333 10.8294761,7 10.4884283,7 L3.5115717,7 C3.17052389,7 3,6.83333333 3,6.5 L3,6.5 C3,6.16666665 3.1705239,6 3.5115717,6 Z"
                    id="路径"></path>
                  <path
                    d="M3.44901288,9 L7.55098712,9 C7.85032905,9 8,9.16666667 8,9.5 L8,9.5 C8,9.83333333 7.85032904,10 7.55098712,10 L3.44901288,10 C3.14967095,10 3,9.83333333 3,9.5 L3,9.5 C3,9.16666667 3.14967096,9 3.44901288,9 L3.44901288,9 Z"
                    id="路径"></path>
                </g>
              </g>
            </g>
          </svg> -->



          <div class="btnRows">
            <div class="firstImage">
              <el-image :src="firstImage" style="height: 16px;width: 16px;" fit="scale-down"></el-image>
            </div>
            <div>我要申报创新成果</div>
          </div>
        </el-button>
      </div>

      <div style="display: flex;flex-direction: column;">
        <div style="" class="banner-item-box">



          <!-- <div style="display: flex;align-items: center;padding: 24px 0 0 0;">
            <div style="flex: 1"></div>
           
          </div> 
          <div class="noat-title-font banner-item-title">创新科技，创新引领未来</div> -->



          <div v-loading="loadingFlag" class="banner-bg-box">



            <!-- <el-tabs v-model="activeName" @tab-click="handleClick" class="eventsTabs"  v-loading="tabsLoading">
              <el-tab-pane label="" name="AWARD">
                <span slot="label">
                  <span class="span-box portrait_center">
                    <svg viewBox="0 0 20 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>编组</title>
                      <g id="五小备份" stroke="none" stroke-width="1">
                        <g id="首页" transform="translate(-443.000000, -242.000000)">
                          <g id="编组-6" transform="translate(440.000000, 238.000000)">
                            <g id="编组" transform="translate(3.000000, 4.000000)">
                              <path
                                d="M11.1424626,16.4867358 L13.1006895,16.4867358 C13.3618649,16.4867358 13.5671581,16.878795 13.5671581,16.878795 C13.5671581,16.878795 13.8165688,17.3917906 13.9989209,17.7225378 C14.158332,18.0122229 13.9036272,17.9999247 13.9036272,17.9999247 L6.10189596,17.9999247 C6.10189596,17.9999247 5.84660294,18.0122229 6.00660224,17.7225378 C6.18895441,17.3917906 6.43836509,16.878795 6.43836511,16.878795 C6.43836513,16.878795 6.64307011,16.4867358 6.9048337,16.4867358 L8.8577665,16.4867358 L8.8577665,13.5842603 C7.92482932,13.326075 7.01542145,12.8074543 6.19483674,12.0598982 C5.30722602,11.2471009 4.61480096,10.2596655 4.16543367,9.16586011 C4.11308095,9.17036007 4.05955177,9.17317254 4.00308142,9.17317254 C1.80662024,9.17317254 0.020157306,7.460937 0.020157306,5.35664227 C0.020157306,5.10801937 0.0142749709,4.88414627 0.00839265419,4.68614793 C-0.0116072557,3.96277904 -0.0245483782,3.48465808 0.324861892,3.14153597 C0.761918843,2.7123521 1.51426856,2.69041477 3.64543589,2.6892898 C3.64955352,2.65947754 3.65484762,2.6302278 3.66014172,2.60097804 L3.66014172,0.975929257 C3.66014172,0.437058805 4.11778681,0 4.68072558,0 L15.3347976,0 C15.8983246,0 16.3553814,0.437058805 16.3553814,0.975929257 L16.3553814,2.6892898 C18.3194907,2.6892898 19.2236044,2.69603973 19.6759554,3.14041097 C20.0247775,3.48353308 20.0112481,3.96052905 19.9918364,4.68221047 C19.9859541,4.8807713 19.9800718,5.1057694 19.9800718,5.35551728 C19.9800718,7.459812 18.1936089,9.17204755 15.9977359,9.17204755 C15.9436185,9.17204755 15.8895011,9.16923507 15.8353837,9.16473511 C15.38565,10.2583569 14.6932746,11.2457214 13.8059806,12.0587732 C12.9859841,12.8068919 12.075988,13.3255125 11.1424626,13.5831353 L11.1424626,16.4867358 Z M18.8012533,5.51470342 C18.8189003,5.27451796 18.8183121,4.67939798 18.8259591,4.43752504 C18.8353708,4.09440293 18.8394884,4.01790357 18.7883122,3.92677935 C18.3765492,3.80021791 16.6036157,3.81934276 16.3724402,3.81990524 L16.2483231,8.03749464 C17.1324369,7.99080754 18.6771362,7.23650139 18.8012533,5.51470342 Z M1.20721105,5.52145338 C1.33073994,7.24268885 2.86249808,8.00768238 3.77778827,8.03749464 L3.67896515,3.81653027 C3.44778967,3.81540527 1.6048564,3.79684294 1.19309346,3.92340438 C1.1795641,4.0280285 1.17309355,4.10115288 1.18250528,4.44371248 C1.1901523,4.68558544 1.18956407,5.28070541 1.20721105,5.52145338 Z M4.85307778,1.15142777 C4.85307778,3.1499734 4.88484234,5.41345428 4.94837148,7.94243293 C6.45012976,12.1881471 9.82305648,12.7292675 10.0007028,12.7292675 C10.1777609,12.7292675 13.6624518,12.0908354 15.0771516,7.94243293 C15.1395043,5.9438873 15.1700924,3.68040642 15.1700924,1.15142777 L4.85307778,1.15142777 Z M11.3277559,6.08282363 C11.1230509,6.27407201 10.9942279,6.65206882 11.0430513,6.92262904 L11.1465802,7.50199915 C11.1948153,7.77199688 11.027169,7.88899589 10.7730524,7.76074696 L10.2295253,7.48793676 C9.97540876,7.36025035 9.56011642,7.36025035 9.30599987,7.48793676 L8.7624728,7.76130946 C8.50835623,7.88899587 8.34012168,7.77255936 8.38894497,7.50199915 L8.49247395,6.92262904 C8.54129727,6.65263132 8.41247429,6.27407201 8.20718106,6.08282363 L7.76777117,5.6722021 C7.5618897,5.48095372 7.62659531,5.29195532 7.9101235,5.25258065 L8.51776796,5.16820636 C8.80188438,5.1288317 9.13835353,4.89483367 9.26482358,4.64846075 L9.53658712,4.12196519 C9.6636454,3.87615476 9.87187979,3.87615476 9.99893808,4.12196519 L10.2701134,4.64846075 C10.3971717,4.89483367 10.7336408,5.12883168 11.017169,5.16820636 L11.6254017,5.25258065 C11.9095181,5.29195532 11.9736355,5.48095372 11.7683423,5.6727646 L11.3277559,6.08282363 L11.3277559,6.08282363 Z"
                                id="形状"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span>奖项设置</span>
                  </span>
                </span>
                <EventsTabs :eventsDataList="awardSettingDataList" :type="activeName"></EventsTabs>
              </el-tab-pane>
              <el-tab-pane label="活动安排" name="HD">
                <span slot="label">
                  <span class="span-box portrait_center">
                    <svg viewBox="0 0 20.7000157 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>活动安排</title>
                      <g id="五小备份" stroke="none" stroke-width="1">
                        <g id="首页" transform="translate(-761.299984, -243.000000)">
                          <g id="编组-2" transform="translate(758.000000, 239.000000)">
                            <g id="活动安排" transform="translate(3.300000, 4.000000)">
                              <path
                                d="M20.5235294,6 L14.8764706,6 C14.7794118,6 14.7,6.1125 14.7,6.25 L14.7,7.75 C14.7,7.8875 14.7794118,8 14.8764706,8 L20.5235294,8 C20.6205882,8 20.7,7.8875 20.7,7.75 L20.7,6.25 C20.7,6.1125 20.6205882,6 20.5235294,6 Z M17.526087,9 L14.873913,9 C14.7782609,9 14.7,9.1125 14.7,9.25 L14.7,10.75 C14.7,10.8875 14.7782609,11 14.873913,11 L17.526087,11 C17.6217391,11 17.7,10.8875 17.7,10.75 L17.7,9.25 C17.7,9.1125 17.6217391,9 17.526087,9 Z M9.80707455,4 L8.9275089,4 C8.80156647,4 8.7,4.13194337 8.7,4.29555316 L8.7,10.8399445 C8.7,10.9349437 8.7345326,11.0220263 8.79344115,11.0774426 L11.8180907,13.9432526 C11.9196572,14.0382519 12.0618502,14.0118632 12.1349781,13.8799198 L12.6570298,12.9536773 L12.6570298,12.9510385 C12.7301576,12.8190951 12.707813,12.6343744 12.6062465,12.5393751 L10.0325521,10.1221725 L10.0325521,4.29555316 C10.0345834,4.13194337 9.93098564,4 9.80707455,4 L9.80707455,4 Z"
                                id="形状"></path>
                              <path
                                d="M16.8877409,12.7261298 L15.5557123,12.7261298 C15.4266577,12.7261298 15.3045166,12.7928876 15.2353802,12.9033834 C14.9427027,13.3660843 14.6016296,13.7942554 14.2098565,14.1855945 C13.534624,14.860079 12.7487733,15.3895378 11.8753497,15.757857 C10.9696625,16.1399882 10.0086662,16.3333557 9.01771067,16.3333557 C8.02445063,16.3333557 7.06345427,16.1399882 6.16007159,15.757857 C5.28664803,15.3895378 4.50079729,14.860079 3.82556483,14.1855945 C3.15033237,13.51111 2.62028641,12.7261298 2.25155879,11.8536737 C1.86900388,10.9512917 1.67542188,9.99135987 1.67542188,8.99920009 C1.67542188,8.0070403 1.86900388,7.04941044 2.25155879,6.14472646 C2.62028641,5.2722704 3.15033237,4.48729016 3.82556483,3.81280566 C4.50079729,3.13832117 5.28664803,2.60886235 6.16007159,2.24054317 C7.06345427,1.85841202 8.02675518,1.66504445 9.01771067,1.66504445 C10.0109707,1.66504445 10.9719671,1.85841202 11.8753497,2.24054317 C12.7487733,2.60886235 13.534624,3.13832117 14.2098565,3.81280566 C14.6016296,4.20414479 14.9427027,4.63231583 15.2353802,5.0950168 C15.3045166,5.20551255 15.4266577,5.2722704 15.5557123,5.2722704 L16.8877409,5.2722704 C17.0467547,5.2722704 17.1481547,5.10652677 17.0767138,4.96610509 C15.5741487,1.98041775 12.5275367,0.0398360816 9.12602441,0.000702168935 C4.14589695,-0.0614516924 0.0092339348,4.01077722 0,8.98078413 C-0.00920244633,13.959999 4.03066957,18 9.01540612,18 C12.4607048,18 15.5580169,16.0525123 17.0767138,13.0322951 C17.1481547,12.8918734 17.0444501,12.7261298 16.8877409,12.7261298 Z"
                                id="路径"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span>活动安排</span>
                  </span>
                </span>
                <EventsTabs :eventsDataList="activityArrangementDataList" :type="activeName"></EventsTabs>
              </el-tab-pane>
              <el-tab-pane label="活动新闻" name="XW">
                <span slot="label">
                  <span class="span-box portrait_center">
                    <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>活动新闻</title>
                      <g id="五小备份" stroke="none" stroke-width="1">
                        <g id="首页" transform="translate(-1090.000000, -242.000000)">
                          <g id="编组-3" transform="translate(1086.000000, 238.000000)">
                            <g id="活动新闻" transform="translate(4.000000, 4.000000)">
                              <path
                                d="M4.80000001,16.8 L13.56,16.8 C13.32,16.44 13.2,16.08 13.2,15.6 L13.2,1.20000001 L1.20000001,1.20000001 L1.20000001,15.6 C1.20000001,16.32 1.68000002,16.8 2.40000002,16.8 L4.80000001,16.8 Z M0,15.6 L0,0 L14.4,0 L14.4,3.6 L18,3.6 L18,15.6 C18,16.92 16.92,18 15.6,18 L2.40000002,18 C1.08000003,18 0,16.92 0,15.6 L0,15.6 Z M14.4,4.80000001 L14.4,15.6 C14.4,16.32 14.88,16.8 15.6,16.8 C16.32,16.8 16.8,16.32 16.8,15.6 L16.8,4.80000001 L14.4,4.80000001 L14.4,4.80000001 Z M3.6,4.80000001 L10.8,4.80000001 L10.8,6.00000002 L3.6,6.00000002 L3.6,4.80000001 Z M3.6,8.40000001 L10.8,8.40000001 L10.8,9.60000002 L3.6,9.60000002 L3.6,8.40000001 Z M3.6,12 L8.40000001,12 L8.40000001,13.2 L3.6,13.2 L3.6,12 Z"
                                id="形状"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <span>活动新闻</span>
                  </span>
                </span>
                <EventsTabs :eventsDataList="eventNewsDataList" :type="activeName"></EventsTabs>
              </el-tab-pane>
            </el-tabs> -->



            <div class="newsBoxWrap">
              <img class="titleMsg" src="@/assets/image/main_activenews.png"/>
              <div class="topBxMainPage">
                <div class="left">



                  <!-- <el-image :src="newsImage" style="height: auto;width: 100%;border-radius:10px" fit="scale-down"></el-image> -->



                    <swiper :options="swiperOption" ref="mySwiper" >
                      <swiper-slide
                        v-for="(item,index) in bannerList"
                        :key="index"
                        style="width: 100%;height: auto;"
                        
                        >
                        <img :src="item" style="width:100%;height: auto;border-radius:10px"/>
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination" v-if="bannerList.length>1"></div>
                    </swiper>
                </div>
                <div class="right">


                  
                  <!-- <div style="display: flex;flex-direction: column;align-items: center;">
                    <div class="noat-title-font">活动新闻</div>
                    <div class="noat-subTitle">陕西联通五小创新最新信息</div>
                  </div> -->



                  <EventsTabs :eventsDataList="eventNewsDataList" :type="activeName"></EventsTabs>
                </div>
              </div>
            </div>



            <!-- <EventsTabs :eventsDataList="eventNewsDataList" :type="activeName"></EventsTabs>
            <div class="banner-bg-box-mainBarChart">
              <MainBarChart :reportInfoSelList="reportInfoSelList"></MainBarChart>
              <el-image :src="newsImage"></el-image>
            </div> -->



          </div>
        </div>
        <div class="achievementShowCont">
          <div class="achievementShowTitle">



            <!-- <div class="noat-title-font achievementShow-title">成果展示</div>
            <div class="noat-title-info">国家级、省市级项目成果展示介绍</div> -->



              <img class="resultTitleMsg" src="@/assets/image/main_resultshow.png"/>
          </div>
          <div class="achievementShowListCont" v-loading="achievementLoading">
            <AchievementBar :typeStr="'1'" :achievementLoading="achievementLoading" :achievementTitle="'国家级及省部级样版创新成果'" :achievementBarDataList="nationalLevelList" :myLength="nationalNum"></AchievementBar>
            <AchievementBar :typeStr="'2'" :achievementLoading="achievementLoading" :achievementTitle="'省公司创新成果展示'" :achievementBarDataList="provincialLevelList" :myLength="provinciNum" ></AchievementBar>
            <AchievementBar :typeStr="'3'" :achievementLoading="achievementLoading" :achievementTitle="'市州分公司及省本部级创新成果'" :achievementBarDataList="cityLevelList" :myLength="cityNum"></AchievementBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/workbench/navBar.vue'
import mainItemBar from '@/components/workbench/mainItemBar.vue'
import EventsTabs from '@/components/workbench/eventsTabs.vue'
import MainBarChart from '@/components/workbench/mainBarChart.vue'
import AchievementBar from '@/components/workbench/achievementBar.vue'
import { achievementQuery,teamInfoReportInfoSel } from '@/assets/api/workbench/trainingStaff.js'
import { activityInfoQueryNews,activityInfoQueryActivity } from '@/assets/api/resultManage'
import { qryParamList } from '@/assets/api/common'
import {
  downloadBase64
} from '@/assets/api/common/index'
import { mapMutations } from "vuex";
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {
  mainPage
} from '@/assets/image/main.gif'
var vm = null;
export default {
  components: {
    NavBar,
    mainItemBar,
    EventsTabs,
    MainBarChart,
    AchievementBar,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',    //与slot="pagination"处 class 一致
          clickable: true,            //轮播按钮支持点击
        },
        // loop:true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        //单页循环
        // slidesPerView:3, 
        // spaceBetween:10,
        // navigation: {
        //   // 如果需要前进后退按钮
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        observer: true,
        observeParents: true,
        clicks: {
          preventClicksPropagation: false,
        },
        // autoHeight:true,
        on: {
          slideChange: () => {
            vm.changeSlide(this);
          },
          click: function () {
            //this 指向的是 swpier 实例，而不是当前的 vue， 因此借助 vm，来调用 methods 里的方法
            
            vm.handleClickSlide(this);
          },
        },
      },
      achievementLoading:true,
      tabsLoading:true,
      cityLevelListShow:true,
      activeName: 'XW',
      reportInfoSelList:{},
      awardSettingDataList: [{}],
      activityArrangementDataList: [{}],
      eventNewsDataList: [],
      nationalLevelList: [],
      provincialLevelList: [],
      cityLevelList: [{}],
      nationalNum:0,
      provinciNum:0,
      cityNum:0,
      activeIndex: 0,
      rightHightIndex: -1,
      nationalArr: [],
      showNationArr: [],
      lastNationArr: [],
      bannerList: [
        require('@/assets/image/changde.jpg'),
        require('@/assets/image/changsha.jpg'),
        require('@/assets/image/chenzhou.jpg'),
        require('@/assets/image/hengyang.jpg'),
        require('@/assets/image/huaihua.jpg'),
        require('@/assets/image/loudi.jpg'),
        require('@/assets/image/shaoyang.jpg'),
        require('@/assets/image/shenggongsi.jpg'),
        require('@/assets/image/xiangtan.jpg'),
        require('@/assets/image/xiangxi.jpg'),
        require('@/assets/image/yiyang.jpg'),
        require('@/assets/image/yongzhou.jpg'),
        require('@/assets/image/yueyang.jpg'),
        require('@/assets/image/zhangjiajie.jpg'),
        require('@/assets/image/zhuzhou.jpg'),
      ],
      yearArr: [],
      checkYear: "",
      //省级成果
      rzqk: {
        title: '省级成果',
        list: []
      },
      cityLevel: {
        title: '市级成果',
        list: []
      },
      current: 1,
      size: 10,
      total: 0,
      loadingFlag: false,
      newsImage: require('@/assets/image/main.jpg'),
      firstImage: require('@/assets/image/first.png'),
    }
  },

  watch: {
    nationalArr() {
    },
    showNationArr() {
      if (this.showNationArr && this.showNationArr.length) {
        // 初始值默认选第一个
        let checkYear = this.showNationArr[0].achievementDate
        this.bannerList = this.showNationArr[0].achievementList
        this.checkYear = checkYear
        if (this.bannerList.length == 1) {
          this.swiperOption.autoplay = false
          //  this.swiperOption.loop=false
          this.$forceUpdate();
        } else {
          this.swiperOption.autoplay = {
            delay: 2000,
            disableOnInteraction: false,
            dynamicMainBullets: 3,
            dynamicBullets: true
          }
          // this.swiperOption.loop=true
          this.$forceUpdate();
        }
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  created() {
    vm = this;
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if(userInfo != null){
      this.cityLevelListShow = userInfo.companyId?(userInfo.companyId=='004300'?true:false):false;
    }else{
      this.cityLevelListShow = true;
    }
    this.handleClick()
    this.achievementQuery()
    this.getTeamInfoReportInfoSel()
  },
  methods: {
    ...mapMutations(['setcurrentAndSiderMenu']),
    // 切换首页tabs
    handleClick() {
      this.tabsLoading = true;
      switch (this.activeName) {
        case "AWARD":
          this.getQryParamList(this.activeName);
          break;
        case "HD":
          this.getActivityInfoQueryActivity(this.activeName);
          break;
        case "XW":
          this.getActivityInfoQueryNews(this.activeName);
          break;
      
        default:
          break;
      }
    },
    //奖项设置查询
    async getQryParamList(type){
      const res = await qryParamList({attrType:type})
      let data = res.rspBody?res.rspBody:[];
      data.map((item) => {
        item.title = item.attrCode;
        item.content = item.attrDesc;
      });
      this.awardSettingDataList =  data;
      this.tabsLoading = false;
    },
    //活动安排查询
    async getActivityInfoQueryActivity(type){
      const res = await activityInfoQueryActivity({pageNum:1,pageSize:10,reqParam:{type:type}})
      if(res.rspBody && res.rspBody.list && res.rspBody.list.length >0){
        this.activityArrangementDataList =  res.rspBody.list;
      }else{
        this.activityArrangementDataList =  [];
      }
      this.tabsLoading = false;
    },
    //活动新闻查询
    async getActivityInfoQueryNews(type){
      const res = await activityInfoQueryNews({pageNum:1,pageSize:10,reqParam:{type:type}})
      if(res.rspBody && res.rspBody.list && res.rspBody.list.length >0){
        this.eventNewsDataList =  res.rspBody.list;
      }else{
        this.eventNewsDataList =  [];
      }
      this.tabsLoading = false;
    },
    async achievementQuery() {
      this.achievementLoading = true;
      let reqData = { achievementType: "", applyDate: "" }
      this.loadingFlag = true;
      let tempYearArr = []
      const res = await achievementQuery(reqData)
      let this_ = this;
      if (res.rspCode == "0000") {
        let reData = res.rspBody
        if (!res.rspBody || !reData.nationalLevel || !reData.nationalLevel.length) {
          this.loadingFlag = false;
        }
        if (reData && reData.nationalLevel && reData.nationalLevel.length > 0) {
          this.nationalNum=reData.nationalLevelCount || 0
          this.nationalLevelList = this.intoAchievementQueryData(reData.nationalLevel);
          this.nationalLevelList.map((item,index) => {
            item.url = "";
            item.updateImageSwitch = true;
          });
        }else this.nationalLevelList = []
        if (reData && reData.provincialLevel && reData.provincialLevel.length > 0) {
          this.provinciNum=reData.provincialLevelCount || 0
          this.provincialLevelList = this.intoAchievementQueryData(reData.provincialLevel);
          this.provincialLevelList.map((item) => {
            item.url = "";
            item.updateImageSwitch = true;
          });
        }else this.provincialLevelList = []
        if (reData && reData.cityLevel && reData.cityLevel.length > 0) {
          this.cityNum=reData.cityLevelCount || 0
          this.cityLevelList = this.intoAchievementQueryData(reData.cityLevel);
          this.cityLevelList.map((item) => {
            item.url = "";
            item.updateImageSwitch = true;
          });
        }else this.cityLevelList = []
        this.loadingFlag = false;
      } else {
        this.$message.error(res.rspDesc)
      }
      this.achievementLoading = false;
    },

    intoAchievementQueryData(list){
      var resultList = [];
      list.forEach(item => {
        if(item.achievementList){
          item.achievementList.forEach(element => {
            resultList.push(element);
          });
        }
      });
      return resultList;
    },
    
    async getTeamInfoReportInfoSel(){
      let this_ = this;
      const res = await teamInfoReportInfoSel()
      if(res.rspCode == '0000' && res.rspBody && res.rspBody.length > 0){
        let  dataAxis=[],achievementCountList=[],achievementBaseCountList=[],shineValueList=[];
        res.rspBody.forEach((item,index) => {
          dataAxis.push(item.teamName?item.teamName:""+index)
          achievementCountList.push(item.achievementCount?item.achievementCount:0)
          achievementBaseCountList.push(item.achievementBaseCount?item.achievementBaseCount:0)
          shineValueList.push(item.shineValue?item.shineValue:0)
        });
        this.reportInfoSelList = {
          dataAxis:dataAxis,
          achievementCountList:achievementCountList,
          achievementBaseCountList:achievementBaseCountList,
          shineValueList:shineValueList,
        }
      }else{
        this.reportInfoSelList = {
          dataAxis:[],
          achievementCountList:[],
          achievementBaseCountList:[],
          shineValueList:[],
        };
      }
    },
    goDetail(itt) {
      if (itt && itt.achievementId) {
        this.$router.push(`/countryManage/countryDetail?projectId=${itt.achievementId}`)
      }
    },
    goinnovateApp() {
      this.$router.push({
        name: 'approvalApplication',
        // params: {
        //   isWhere: 'workbench',
        // }
      })
    },
    goresultApplication() {
      this.$router.push({
        name: 'resultApplication',
        // params: {
        //   isWhere: 'workbench',
        // }
      })
    },

    // async queryBase64(achievementName, name, index, ind, flag) {
    //   let imgStr = "", nar = []
    //   if (name && name.length) {
    //     const res = await downloadBase64(name);
    //     if (res) {
    //       imgStr = 'data:image/png;base64,' + res
    //       this.nationalArr[index].achievementList[ind].url = imgStr
    //       this.nationalArr[index].achievementList[ind].achievementName = ""
    //       this.$set(this.nationalArr[index].achievementList[ind], 'url', imgStr)
    //       this.$set(this.nationalArr[index].achievementList[ind], 'achievementName', achievementName)
    //       // 去掉没有图片的
    //       this.nationalArr.map((nItem, nindex) => {
    //         if (nItem && nItem.achievementList && nItem.achievementList.length) {
    //           let tempNationArr = []
    //           nItem.achievementList.map((item, index) => {
    //             if (item.url && item.url.length > 0) {
    //               tempNationArr.push(item)
    //             }
    //           })
    //           nar.push({
    //             achievementDate: nItem.achievementDate,
    //             achievementList: tempNationArr
    //           })
    //         }
    //       })

    //     }
    //     // if(flag){

    //     this.showNationArr = nar
    //     this.loadingFlag = false;
    //     this.$forceUpdate();
    //     // }
    //     if (flag) {
    //       this.swiper.autoplay.stop();
    //       this.$refs.mySwiper.swiper.slideTo(1)
    //       this.swiper.autoplay.start();
    //     }
    //   }

    // },
    handleClickSlide(vm) {
      let index = vm.clickedIndex - vm.activeIndex + vm.realIndex;
      if (index === this.bannerList.length) {
        index = 0;
      } else if (index === this.bannerList.length + 1) {
        index = 1;
      } else if (index === this.bannerList.length + 2) {
        index = 2;
      }
      // 我得到的index就是点击的item在实际数组中的下标index
      
      
      // 后面可以根据得到的index判断跳到每个对应的路由
      this.goDetail(this.bannerList[index]);
    },
    changeSlide(vm) {
      this.rightHightIndex = this.$refs.mySwiper.swiper.activeIndex
    },
    checkItem(e) {
      
      this.checkYear = e.target.innerText;
      this.LoadPrint(e.target.innerText)
    },
    LoadPrint(year) {
      let tempArr = []
      this.swiper.autoplay.stop();
      if (this.showNationArr && this.showNationArr.length) {
        this.showNationArr.map((item, index) => {
          if (year == item.achievementDate) {
            
            tempArr = item.achievementList || []
          }
        })
        this.bannerList = tempArr
        if (this.bannerList.length == 1) {
          this.swiperOption.autoplay = false
          this.$forceUpdate();
          
          this.$refs.mySwiper.swiper.slideTo(1)
          this.swiper.autoplay.start();
        } else {
          this.swiperOption.autoplay = {
            delay: 2000,
            disableOnInteraction: false,
            dynamicMainBullets: 3,
            dynamicBullets: true
          }
          this.$forceUpdate();
          this.$refs.mySwiper.swiper.slideTo(1)
          this.swiper.autoplay.start();
        }

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.staff-page {
  padding: 0px;

  ::v-deep(.el-loading-spinner) {
    margin-top: 71px !important;
    width: 100%;
    text-align: center;
    position: absolute;
  }

  ::v-deep(.el-loading-spinner) {
    margin-top: 71px !important;
    width: 100%;
    text-align: center;
    position: absolute;
  }

  ::v-deep(.el-tabs__header) {
    background-color: #ffffff;

    .el-tabs__nav {
      display: flex;
      width: 100%;
    }

    .el-tabs__item {
      text-align: center;
      padding-left: calc((100% - (140px * 3))/4) !important;
      width: calc(((100% - (140px * 3))/4) + 140px) !important;
      padding-right: 0px !important;
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      .portrait_center {
        display: flex;
        justify-content: center;
      }
    }
  }

  ::v-deep(.el-tabs__content) {
    height: calc(100% - 50px);
    // overflow: auto;

    .el-tab-pane {
      height: calc(100% - 50px)
    }
  }

  .newsBoxWrap{
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    margin-bottom: 20px;
    .titleMsg{
      width: 229px;
      height: 37px;
      object-fit: contain;
      display: flex;
      margin: 0 auto;
    }
    .topBxMainPage{
      display: flex;
      align-items: center;
      // height: 320px;
      .left{
        width: 50%;
        // height: 100%;
        display: flex;
        justify-content: center;
        vertical-align: middle;
        // height: 320px;
      }
      .right{
        flex: 1;
        height: 320px;
        display: flex;
        flex-direction: column;
      }
    }
  }

  .tableTitle {
    font-size: 12px;
    font-weight: 550;
    color: #333;
    margin: 15px 0px 7px 2px;
  }

  .tableFath {
    position: relative;
  }

  .tableTitleAnther {
    font-size: 12px;
    font-weight: 550;
    color: #333;
    margin: 2px 0px 9px 2px
  }

  .tableChild {
    position: absolute;
    right: 10px;
    z-index: 10;
    top: 12.38px;
    font-size: 11px;
    color: #0000EE;
    display: flex;
    align-items: center;
  }

  .tableChild :hover {
    cursor: pointer;
  }

  .tableChild img {
    width: 14px;
    height: 14px;
    margin-left: 1px;
  }

  .work-body {
    margin: 0 20px 0 0;
    .title-text {
      font-size: 16px;
      color: #333333;
      font-weight: 800;
      margin: 20px 0;

    }

    .slot-panel>.el-button {
      width: 80px;
      height: 26px;
      padding-top: 0;
      padding-bottom: 0;
      background: rgba(174, 0, 3, 0.10);
      border: 1px solid rgba(174, 0, 3, 1);
      border-radius: 2px;
      color: #5991FF;
      float: right;
    }

    .tips-panel {
      margin-left: 20px;

      .icon-img {
        padding: 10px;
        width: 100px;
        height: 100px;
        background: rgba(85, 174, 0, 0.11);
        border-radius: 6px;

        .iconfont {
          color: #55AE00;
          font-size: 20px;
          display: flex;
          align-items: center;
        }

        .icon-img-title {
          font-size: 14px;
          color: #55ae00;
          margin-left: 2px;
        }

        .icon-img-body {
          height: calc(100% - 20px);
          display: flex;
          align-items: center;
          justify-content: center;

          .icon-img-nums {
            font-size: 50px;
            color: #55ae00;
          }

          .icon-img-unit {
            font-size: 14px;
            color: #55ae00;
          }
        }

        //&.icon-img-red {
        //  background-image: url("@/assets/image/collect-img.png");
        //
        //  .icon-img-body {
        //    justify-content: unset;
        //  }
        //
        //  .icon-img-title,
        //  .icon-img-nums,
        //  .icon-img-unit {
        //    color: #5991FF;
        //  }
        //}

        +.icon-img {
          margin-top: 30px;
        }
      }
    }

    .work-item {
      width: calc((100% - 300px) / 2);
      flex: 1 1 auto;
      cursor: pointer;

      &.item-border {
        padding: 7px;
        border-radius: 8px;

        &.actvie-border {
          box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
        }
      }

      +.work-item {
        margin-left: 10px;
      }
    }

    .bottomBottom {
      display: flex;
      text-align: center;
      padding-top: 6px;
      padding-bottom: 16px;
      // background-color: #f7fbff;
      // gap: 12px;
    }

    .bottomBottom .bottoBtn {
      margin-left: 0px;
      background: #5991ff;
      color: #fff;
      margin-right: 12px;
      .btnRows{
        display: flex;
        align-items: center;
        .firstImage{
          width:16px;
          height:16px;
          margin-right: 2px;
        }
      }
    }
  }

  // 国家级别
  .nationalBox {
    width: 100%;
    display: flex;
    box-sizing: border-box;
  }

  .noat-title-font {
    width: 100%;
    font-size: 26px;
    padding-bottom: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    text-align: center;
    font-weight: 600;
    line-height: 37px;
  }
  .noat-subTitle {
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
  }

  .banner-item-box {
    height: 100%;
    background-color: #fff;
    // height: 580px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border-radius: 4px;

    .banner-item-title {
      margin: 16px 0 25px 0;
    }

    .banner-bg-box {
      // background: #ffffff;
      // margin-bottom: 20px;
      padding: 20px 20px;
      // height: calc(100% - 118px);
      height: calc(100% - 95px);
      width: calc(100% - 40px);

      .banner-bg-box-mainBarChart {
        position: relative;
        width: 50%;
        height: calc(100% - 50px);
        z-index: 30;
        // background: red;
        top: calc(-100% + 50px);
      }

      .eventsTabs {
        height: 100%;
        width: 100%;

        .portrait_center {
          display: flex;
          align-items: center;

          svg {
            width: 20px;
            height: 18px;
            margin-right: 8px;
            fill: currentColor;
          }
        }
      }

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
    }
  }

  .achievementShowCont {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 4px;

    .achievementShowTitle {
      text-align: center;

      .achievementShow-title {
        padding-top: 16px;
      }

      .noat-title-info {
        padding-top: 12px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
      }

      .resultTitleMsg{
        margin-top: 20px;
        width: 254px;
        height: 37px;
        object-fit: contain;
      }
    }

    .achievementShowListCont {
      padding: 25px 20px;
      display: flex;
      flex-direction: row;
      height:700px;
      // justify-content: space-around;
      // flex-wrap: wrap;
      gap: 24px;
    }
  }


  .banner-content-box {
    height: auto;
    flex: 1;
    display: flex;
    background: #ffffff;
    padding-top: 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    scrollbar-width: none;
    margin-right: '5px';
    padding: 18px 12px 18px 18px;

  }

  .nationalLeftBox {
    // flex: 1;
    margin-right: 35px;
    // height: 420px;
    height: 370px;
    width: 55%;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
  }

  .nationalRightBox {
    width: 43%;
    // background: #f7fbff;
    opacity: 0.96;
    // height: 420px;
    height: 370px;
    overflow-x: hidden;
    overflow-y: scroll;
    // border-bottom-right-radius:4px;
    // border-bottom-left-radius:4px;
    border: 1px solid #dedede;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .pointTitle {
    height: 43px;
    // background-color: #c23f51;
    // border: 1px solid #c23f51;
    background-color: #5991ff;
    border: 1px solid #5991ff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding-left: 10px;
    line-height: 38px;
    text-align: left;
    font-size: 15px;
    color: #fff;
    font-weight: bolder;
    letter-spacing: 1.3px;
  }

  .pointBox {
    height: 40px;
    // background: #fff;
    line-height: 35px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
    display: flex;
    padding: 0px 14px 0px 10px;

  }

  .pointLeft {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .poinRight {
    width: 20%;
    text-align: right;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .pointBoxNew {
    min-height: 65px;
    // background: #fff;
    // line-height: 35px;
    border-bottom: 1px solid #d5dbe5;
    font-size: 13px;
    padding: 5px 14px 5px 10px;

    &:last-child {
      border-bottom: none !important;
    }
  }

  .pointTop {
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: bold;
    font-size: 15px;
    line-height: 31px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing: 1px;
    // border-bottom: 1px solid #f0f0f0;
  }

  .pointBottom {
    font-weight: lighter;
    font-size: 11px;
    line-height: 25px;
    text-overflow: ellipsis; //
    display: -webkit-box; // 定义为盒子显示
    -webkit-line-clamp: 3; //限制一个块元素显示的文本行数 
    /* autoprefixer: off */
    -webkit-box-orient: vertical; //定义为竖向编排显示  建议前后行加注释 安装autoprefixer 缺失
    /* autoprefixer: on */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }

  .selectScorll {
    background: #00a0e2;
    color: #f0f0f0;
  }

  // 轮播图
  .swiper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .swiper-container {
    width: 100%;
    height: auto;
    border-radius: 5px;
    position: relative;
    box-sizing: border-box;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;    // padding-bottom: 28.1%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    // box-sizing: border-box;
  }

  .swiper-slide-active {
    width: 100%;
    // height: 0;
    // padding-bottom: 28.1%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  .el-image__inner--center{}

  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 0px;
    left: 0px;
    width: 100%;
    background: #f0f0f0;
    opacity: 0.6;
    height: 35px;
    box-sizing: border-box;
  }

  .swiper-button-prev {
    background-image: url("../../assets/image/向左.png");
  }

  .swiper-button-next {
    background-image: url("../../assets/image/向右.png");
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 45%;
    width: 50px;
    height: 50px;
    margin-top: -22px;
    z-index: 10;
    cursor: pointer;
    background-size: 50px 50px;
    background-position: center;
    background-repeat: no-repeat;
  }

  // 文字显示
  .bannerText {
    position: absolute;
    font-size: 13px;
    height: 100px;
    color: #f0f0f0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background: pink; */
    height: 35px;
    line-height: 35px;
    width: 36%;
    padding-left: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .swiper-slide {}

  .swiper-slide .swiper-slide-prev {
    width: 100% !important;
  }

  .swiper-slide .swiper-slide-active {
    width: 100% !important;
  }

  .noDataBox {
    color: #666;
    font-size: 13px;
    /* line-height: 20px; */
    text-align: center;
    margin-top: 72px;

  }

  .noDataBox img {
    width: 100px
  }
}</style>
