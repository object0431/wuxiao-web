<template>
  <div class="selectSpeciality-dialog">
    <el-dialog
      :visible="visible"
      title="选择专业线"
      width="600px"
      destroy-on-close
      :close-on-click-modal="false"
      @open="openModal"
      @close="closeModel"
    >
      <el-form
        label-position="right"
        label-width="70px"
        ref="form"
        class="form"
      >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="专业线" required="">
            <el-select v-model="scoreName" placeholder="请选择">
              <el-option
                v-for="item in cateList"
                :key="item.attrCode"
                :label="item.attrValue"
                :value="item.attrCode">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
        <el-button class="mainRedButton_copy" @click="addSure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
export default {
  name:'SelectSpeciality',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    cateList:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      //表单查询
      tableData: [],
      tableLoading: false,
      selectList: [],
      scoreName:''
    };
  },
  created() {},
  methods: {
    //确认添加
    addSure() {
      console.log(this.scoreName)
      if(!this.scoreName){
        this.$message.error("请选择专业线");
        return;
      }
      this.$emit('addSure',this.scoreName)
    },
    //选择专业方向
    changeZYFX(val) {
      this.form.majorType = "";
      if (val == "") return;
      // this.qryLinkType(val, "3");
    },
    //打开弹窗
    openModal() {
      this.scoreName = ''
    },
    //关闭弹窗
    closeModel() {
      this.$emit("closeModel");
    },
  },
};
</script>
  
<style lang="scss" scoped>
.form{
  display: flex;
  justify-content: center;
  padding: 40px 0 10px 0;
}
</style>
  
  