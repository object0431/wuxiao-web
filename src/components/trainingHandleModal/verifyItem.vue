<template>
  <div class="verifyItem-page">
    <el-dialog title="选择任务评审附件"
               width="500px"
               :visible="visible"
               destroy-on-close
               @close="closeModel"
               :close-on-click-modal="false">
      <el-form
          ref="form"
          :model="form"
          style="padding: 20px;"
          label-position="right"
          label-width="120px"
          class="form"
      >
        <el-col :span="24">
          <el-form-item label="绩效考核结果" prop="lastYearEvalRet" class="is-required">
            <el-select v-model="form.yearEvalRet" clearable>
              <el-option v-for="item in yearEvalRetList" :key="item.attrCode" :label="item.attrValue"
                         :value="item.attrCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="minorGrayButton" @click="closeModel">取 消</el-button>
        <el-button class="mainRedButton" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {queryPublicParams} from "@/assets/api/common";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  created() {
  },
  watch: {
    visible: {
      handler: function (val) {
        if (val) {
          this.queryPublicParams()
        }
      },
    },
  },
  data() {
    return {
      form: {
        yearEvalRet: ''
      },
      rules: {},
      yearEvalRetList: [],
    }
  },
  methods: {
    async queryPublicParams() {
      const res = await queryPublicParams({
        paramType: 'NSJG'
      })
      if (res.rspCode == "0000") {
        this.yearEvalRetList = res.rspBody.data
      }
    },
    closeModel() {
      this.$emit('close')
    },
    onSubmit() {
      this.$emit("submit", this.form.yearEvalRet);
    }
  }
}
</script>

<style lang="scss" scoped>
.verifyItem-page {

  .container {
    margin-top: 12px;
    height: 100px;
    width: 350px;
  }

  .dialog-footer {
    display: flex;
    width: 33%;
    margin: 0 33%;
  }
  ::v-deep(.el-dialog .el-dialog__footer) {
    padding-bottom: 10px;
  }
}
</style>
