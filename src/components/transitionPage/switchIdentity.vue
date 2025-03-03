<template>
  <div class="switchIdentity-page">
    <el-dialog
        title="身份切换"
        width="500px"
        :visible="visible"
        destroy-on-close
        :close-on-click-modal="false"
        @close="closeModel"
        @open="openModel"
        ref="treeSelectMore"
        append-to-body
        class="switchIdentity-dialog"
    >
        <div class="stafflist">
          <div v-for="item in staffList" :key="item.id" style="width: 200px;text-align: center" @click="switchIdentiy(item.id,item.identity)">
              <img src="@/assets/image/identitied.png" v-if="item.identity===deptName">
              <img src="@/assets/image/identity.png" v-else>
              <p>{{item.identity}}</p>
          </div>
        </div>

       <span slot="footer">
        <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
        <el-button
            class="mainRedButton_copy"
            @click="submit"
        >确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {getStaffList, switchIdentity} from "@/assets/api/common";

export default {
  props: {
    visible: { type: Boolean },
  },
  data(){
    return{
      staffList:[],
      deptName:"",
      id:null,
    }
  },
  methods:{
    closeModel(){
      this.$emit("closeModel");
    },
    openModel(){
     // this.deptName=JSON.parse(sessionStorage.getItem("userInfo"))?.deptName;
      this.getStaffList();
    },
    async getStaffList(){
        const res=await getStaffList();
        if (res.rspCode=="0000"){
          this.staffList=res.rspBody
          this.deptName=this.staffList.find(item=>item.current=='1').identity
        }
    },
    async submit(){
      if (!this.id){
        return  this.$message.info("请选择身份")
      }
      const res=await switchIdentity(this.id)
      if (res.rspCode=="0000"){
        this.$message.success("切换身份成功");
        
        sessionStorage.setItem("userInfo",JSON.stringify(res.rspBody))
        this.closeModel();
      }
    },
    switchIdentiy(id,deptName){
      this.deptName=deptName;
      this.id=id
    },


  }

}
</script>

<style lang="scss" scoped>
.switchIdentity-dialog{
  .stafflist{
    display: flex;
    overflow-x: scroll;
  }
}

</style>