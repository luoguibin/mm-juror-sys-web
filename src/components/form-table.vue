<template>
  <div class="form-table">
    <!-- 头部搜索框 -->
    <el-form class="form-table_search" :data="formData" :inline="true">
      <!-- 常规选项 -->
      <el-form-item
        v-for="item in formProps"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :label-width="item.width || 'auto'"
      >
        <!-- 下拉选择 -->
        <el-select
          v-if="item.target === 'select'"
          v-model="formData[item.prop]"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          @change="onFormDataChange(item)"
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
          v-model.number="formData[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
        ></el-input>

        <!-- span文本显示 -->
        <span v-else-if="item.target === 'span'">{{formData[item.prop]}}</span>

        <slot v-else-if="item.slot" :name="item.slot"></slot>

        <!-- 常规字符输入框 -->
        <el-input
          v-else
          v-model="formData[item.prop]"
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
          <!-- 普通文本按钮 -->
          <el-button
            v-if="item.target === 'button'"
            :type="item.buttonType"
            @click="onTableDataClick(scope.row, item)"
          >{{item.buttonText ? item.buttonText : scope.row[item.prop]}}</el-button>

          <!-- span文本修饰 -->
          <span
            v-else-if="item.target === 'span'"
            :class="item.class ? item.class(scope.row, item.prop) : ''"
          >{{item.changeText ? item.changeText(scope.row, item.prop) : scope.row[item.prop]}}</span>

          <!-- 插槽作用 -->
          <slot v-else-if="item.slot" :name="item.slot" :data="scope.row">-</slot>

          <!-- 默认文本 -->
          <template
            v-else
          >{{item.changeText ? item.changeText(scope.row, item.prop) : scope.row[item.prop]}}</template>
        </template>
      </el-table-column>
    </el-table>

    <slot name="pagination"></slot>
  </div>
</template>

<script>
export default {
  name: "form-table",
  props: {
    formProps: {
      type: Array,
      default: []
    },
    formData: {
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
      this.$emit("confirm", this.formData);
    },

    /**
     * 表格数据点击
     * @param {Objecy} obj 数据对象
     * @param {Object} option 字段配置对象
     */
    onTableDataClick(obj, option) {
      if (option.call) {
        option.call(obj, option);
      } else {
        this.$emit("data-click", obj, option);
      }
    },

    /**
     * 表单数据改变
     * @param {Object} option 字段配置对象
     */
    onFormDataChange(option) {
      if (option.call) {
        option.call(this.formData, option);
      } else {
        this.$emit("data-change", this.formData, option);
      }
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
