<template>
  <div class="acievementScore-dialog">
    <el-dialog
      :visible="showScore"
      :title="'【'+achievementItem.projectName+'】评分'"
      width="800px"
      destroy-on-close
      :close-on-click-modal="false"
      @open="openModal"
      @close="closeModel"
    >
      <!-- 表格区域 -->
       <el-table v-loading="tableLoading" :data="achievementItem.children" ref="multipleTable"
            style="width: 100%">
            <!-- <el-table-column type="selection" width="55" fixed="left" v-model="selectList" ></el-table-column> -->
            <el-table-column prop="itemName" show-overflow-tooltip label="类型"></el-table-column>
            <el-table-column prop="projectDetail"  label="详情"></el-table-column>
            <el-table-column
              prop="children"
              label="评分"
              width="150"
            >
              <template
                slot-scope="scope"
                v-if="scope.row.type !== 0"
              >
                <el-input
                  type="text"
                  placeholder="请评分"
                  v-if="scope.row.projectName !== '附件'"
                  v-model="scope.row.score"
                  oninput="if(!/^[0-9]+$/.test(value)) value=value.replace(/^0+(\d)|[^\d]+/g,'');if(value>100)value=100;if(value<0)value=null;if(value<0)value=null;"
                />
              </template>
            </el-table-column>
        </el-table>
      <span slot="footer">
        <el-button class="minorGrayButton_copy" @click="closeModel">取消</el-button>
        <el-button class="mainRedButton_copy" @click="submit">暂存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import {
    queryStaffRoleList
} from '@/assets/api/common/index'
export default {
  props: {
    showScore: {
      type: Boolean,
      default: false,
    },
    achievementItem:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      //表单查询
      form: {
        major: "",
      },
      formQuestion:{
        question:""
      },
      majorList: [], //专业分类
      //分页
      pageParam: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      tableLoading: false,
      selectList: [],
      step:1,
    };
  },
  created() {
    console.log(this.achievementItem)
  },
  methods: {
    //确认添加
    submit() {
      console.log(this.achievementItem.projectId)
      let tempObj = {};
      tempObj.projectId = this.achievementItem.projectId;
      let itemScoreList = [];
      if(this.achievementItem.children && this.achievementItem.children.length>0){
        for (const subItem of this.achievementItem.children) {
          if (subItem.score && subItem.score.length > 0) {
            console.log(subItem,'===')
            itemScoreList.push({
              itemCode: subItem.itemCode,
              itemName: subItem.itemName,
              score: subItem.score || "",
            });
          }
        }
      }
      tempObj.itemScoreList = itemScoreList
      this.$emit('submitScore',tempObj)
    },
    //打开弹窗
    openModal() {

    },
    //关闭弹窗
    closeModel() {
      console.log('===')
      this.$emit("closeModel");
    },
  },
};
</script>
  
<style lang="scss" scoped>
::v-deep .el-table__body-wrapper{
  height: 500px;
  overflow-y: scroll;
}
   
</style>
  
  