<template>
  <component :is="currentView"></component>
</template>

<script>
import {
    queryProject,
} from '@/assets/api/approval/index'
import mainPage from "./mainPage.vue";
import trainingAdmin from "./trainingAdmin.vue";
import trainingStaff from "./trainingStaff.vue";
// import lecturer from './lecturer.vue';
export default {
  name: 'workbench',
  components: {
    mainPage,
    // trainingAdmin,
    // trainingStaff,
  },
  data() {
    return {
      form:{},//可删
      currentView: "",
    };
  },
  created() {
      this.currentView = "mainPage";
    // let obj = JSON.parse(sessionStorage.getItem("userInfo")) || {};
    // obj.workBenchType ? null : obj.workBenchType = '1'
    // //1：参训人员 2：管理员 3：讲师
    // if (obj.workBenchType == "1") {
    //   this.currentView = "mainPage";
    // } else if (obj.workBenchType == "2") {
    //   this.currentView = "trainingStaff";
    // } else {
    //   this.currentView = "lecturer";
    // }
    //可删
    // this.queryApprovalApply()
  },
  methods:{
    //查询---可删
    async queryApprovalApply() {
        this.tableLoading = true
        let param={pageNum:1,pageSize:10}
        const res = await queryProject({
            ...this.form, ...param
        })
        
        if (res.dataList) {
            
        } else {
            this.tableLoading = false
            this.$message.error(res.rspDesc)
        }
    },
  }
};
</script>

<style lang="scss" scoped>

</style>