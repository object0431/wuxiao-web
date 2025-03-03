<template>
  <div class="custom-tree-select">
    <div v-if="filterableInput">
      <el-input v-model="valueModel" ref="reference" v-popover:popover :placeholder="placeholder" :disabled="disabled"
        :readonly="readonly" @input="(val) => this.$refs.customtreeSelect.filter(val)" suffix-icon="el-icon-search">
      </el-input>
      <transition name="el-zoom-in-top">
        <el-popover ref="popover" popper-class="custom-tree-select-popper" placement="bottom-start" trigger="click"
          :width="popoverWidth">
          <el-scrollbar tag="ul" wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list"
            ref="scrollbar">
            <el-tree :data="treeData" node-key="code" default-expand-all ref="customtreeSelect"
              :filter-node-method="filterNode" :render-content="(h,node) => renderContent(h,node)"
              @node-click="(data) => clickUnitTreeNode(data)" icon-class=" ">
            </el-tree>
          </el-scrollbar>
        </el-popover>
      </transition>
    </div>
    <div v-if="filterableSelect">
      <el-select v-model="valueModel" :placeholder="placeholder" :popper-append-to-body="false" ref="unitTreeSelect"
        :disabled="disabled" collapse-tags :readonly="readonly">
        <el-input placeholder="输入关键字进行过滤" v-model="filterValue"
          @input="(val) => this.$refs.customtreeSelect.filter(val)">
        </el-input>
        <el-option :value="[]">
          <el-tree :data="treeData" node-key="code" default-expand-all ref="customtreeSelect"
            :filter-node-method="filterNode" :render-content="(h,node) => renderContent(h,node)"
            @node-click="(data) => clickUnitTreeNode(data)" icon-class=" ">
          </el-tree>
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TreeSelect',
  props: {
    value: { type: [Array, String, Number, Date, Boolean] },
    treeData: { type: Array },
    filterableInput: { type: Boolean, default: false }, // 启用筛选
    filterableSelect: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false }
  },
  model: {
    prop: 'value',
    event: 'handlerValueChange'
  },
  data() {
    return {
      popoverWidth: '',
      selectList: [], // 选中
      filterValue: ''
    }
  },
  computed: {
    valueModel: {
      get: function () {
        return this.value;
      },
      set: function (val) {
        this.$emit('handlerValueChange', val);
      }
    },
  },
  mounted() {
    this.popoverWidth = this.$el.getBoundingClientRect().width
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.displayName.indexOf(value) !== -1;
    },
    // treeNode
    renderContent(createElement, { node, data, store }) {
      const isNodeSelect = this.selectList.findIndex(item => item.id === data.code)
      return (
        <span class="custom-tree-node">
          {
            data.children && data.children.length > 0 && <i class={node.expanded ? 'iconfont icon-shouqi-zhijiao' : 'iconfont icon-zhankai-zhijiao'}></i>
          }
          <span class={isNodeSelect > -1 ? 'node-check' : ''}>{data.displayName}</span>
          {
            (!data.children || data.children.length === 0) && isNodeSelect > -1 && <i class="node-check-icon el-icon-check"></i>
          }
        </span>
      );
    },
    // 点击节点
    clickUnitTreeNode(data, index) {
      if (data.sex) {
        if (this.filterableInput) {
          const isindex = this.selectList.findIndex(item => item.id === data.code)
          if (isindex !== -1) {
            this.selectList.splice(isindex, 1)
          } else {
            // this.selectList.push({
            //   label: data.displayName,
            //   id: data.code
            // })
            this.selectList = [{
              label: data.displayName,
              id: data.code
            }]
          }
        } else {
          if (!this.multiple) {
            this.selectList = [{
              label: data.displayName,
              id: data.code
            }]
            this.valueModel = data.displayName
          }
        }
      }
      this.$emit('selectChange', this.selectList)
    },
  }
};
</script>

<style lang="scss">
.custom-tree-select {
  .el-select-dropdown__item {
    padding: 0;
    height: 100%;

    .custom-tree-node {
      .node-check {
        color: #28B0E8;
      }

      .node-check-icon {
        color: #28B0E8;
        margin: 10px;
      }
    }
  }

}

.custom-tree-select-popper {
  padding: 0;

  .el-select-dropdown__wrap {
    max-height: 250px;
  }

  .custom-tree-node {
    .node-check {
      color: #28B0E8;
    }

    .node-check-icon {
      color: #28B0E8;
      margin: 10px;
    }
  }

  .el-select-dropdown__item {
    padding: 0;
    height: 100%;

    .custom-tree-node {
      .node-check {
        color: #28B0E8;
      }

      .node-check-icon {
        color: #28B0E8;
        margin: 10px;
      }
    }
  }

}
</style>