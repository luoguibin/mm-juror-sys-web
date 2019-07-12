<template>
  <div class="form-table">
    <!-- 头部搜索框 -->
    <el-form class="form-table_search" :data="searchData" :inline="true">
      <!-- 常规选项 -->
      <el-form-item
        v-for="item in searchProps"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :label-width="item.width || 'auto'"
      >
        <!-- 下拉选择 -->
        <el-select
          v-if="item.target === 'select'"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
        >
          <el-option
            v-for="option in item.options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          ></el-option>
        </el-select>

        <!-- 数字输入框 -->
        <el-input
          v-else-if="item.target === 'number'"
          v-model.number="searchData[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
        ></el-input>

        <slot v-else-if="item.slot" :name="item.slot"></slot>

        <!-- span文本显示 -->
        <span v-else-if="item.target === 'span'">{{searchData[item.prop]}}</span>

        <!-- 常规字符输入框 -->
        <el-input
          v-else
          v-model="searchData[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
        ></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onConfirm">{{confirmText}}</el-button>
        <slot name="form-end"></slot>
      </el-form-item>
    </el-form>

    <!-- 表格数据 -->
    <el-table class="form-table_main" :data="tableData" border v-loading="tableLoading">
      <el-table-column
        v-for="item in tableColumns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || 'auto'"
      >
        <template slot-scope="scope">
          <el-button
            v-if="item.target === 'button'"
          >{{item.buttonText ? item.buttonText : scope.row[item.prop]}}</el-button>
          <slot v-else-if="item.slot" :name="item.slot"></slot>
          <template v-else>{{item.call ? item.call(scope.row, item.prop) : scope.row[item.prop]}}</template>
        </template>
      </el-table-column>

      <slot name="table-option"></slot>
    </el-table>

    <slot name="pagination"></slot>
  </div>
</template>

<script>
export default {
  name: "form-table",
  props: {
    searchProps: {
      type: Array,
      default: []
    },
    searchData: {
      type: Object,
      default: {}
    },
    tableColumns: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "确定"
    }
  },

  created() {
    window.formTable = this;
  },

  methods: {
    /**
     * 表单确认
     */
    onConfirm() {
      this.$emit("confirm", this.searchData);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-table {
}
</style>

<style lang="scss">
.form-table {
}
</style>
