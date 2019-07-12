<template>
  <div class="juror-manage">
    <form-table
      :formProps="formProps"
      :formData="formData"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :tableLoading="tableLoading"
      confirmText="搜索"
      @confirm="handleConfirm"
    >
      <template slot="form-end">
        <el-divider direction="vertical"></el-divider>
        <el-button @click="onOpenNewJuror()" type="primary">新增陪审员</el-button>
      </template>

      <!-- 操作按钮插槽 -->
      <template #table-option="{data}">
        <el-button type="text" @click="onOpenEidtDialog(data)">编辑</el-button>
        <el-button type="text" v-if="authType >= 5" @click="onDelete(data)">删除</el-button>
      </template>

      <el-pagination
        slot="pagination"
        layout="prev, pager, next"
        background
        hide-on-single-page
        :total="tableTotal"
        :current-page="currentPage"
        @current-change="handlePageChange"
      ></el-pagination>
    </form-table>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import FormTable from "../../components/form-table";
import { getJurors } from "../../http/api/juror-manage";

export default {
  name: "juror-manage",
  components: {
    FormTable
  },

  data() {
    return {
      formProps: [
        { prop: "id", label: "ID", target: "number", placeholder: "请输入ID", disabled: true },
        {
          prop: "orderType",
          label: "案件数排序",
          target: "select",
          options: [
            { value: 0, label: "所有" },
            { value: 1, label: "从多到少" },
            { value: 2, label: "从少到多" }
          ],
          call: this.getJurors
        }
      ],
      formData: {
        orderType: 2
      },
      tableColumns: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "姓名" },
        {
          prop: "sex",
          label: "性别",
          changeText(target, key) {
            return target[key] ? "男" : "女";
          }
        },
        { prop: "company", label: "工作单位" },
        {
          prop: "caseCount",
          label: "已陪审案件数",
          target: "button",
          buttonType: "text",
          call: this.onCaseCount
        },
        { prop: "phone", label: "手机号码" },
        { prop: "address", label: "地址" },
        {
          prop: "timeCreate",
          label: "创建时间",
          changeText(target, key) {
            return Vue.filter("time-filter")(target[key]);
          }
        },
        { prop: "table-option", label: "操作", slot: "table-option" }
      ],
      tableData: [],
      tableLoading: false,

      tableTotal: 0,
      currentPage: 1,

      orderType: 1
    };
  },

  created() {
    window.JurorManage = this;
    this.getJurors();
  },

  computed: {
    ...mapGetters(["authType"])
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getJurors();
    },

    handleConfirm(data) {
      console.log(data);
      this.getJurors();
    },

    getJurors() {
      this.tableLoading = true;
      getJurors({ page: this.currentPage, ...this.formData })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    onCaseCount(data, option) {
      this.$message("过阵子开放该功能");
      console.log("onCaseCount", data, option);
    },

    onOpenEidtDialog(info) {
      this.$message("过阵子开放该功能");
    },

    onDelete(info) {
      this.$message("过阵子开放该功能");
    },

    onOpenNewJuror() {
      this.$message("过阵子开放该功能");
    }
  }
};
</script>

<style>
</style>
