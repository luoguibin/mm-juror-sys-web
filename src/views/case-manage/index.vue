<template>
  <div class="case-manage">
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
        <el-button @click="onOpenCaseDialog()" type="primary">新增案件</el-button>
      </template>

      <template #jurors="{data}">
        <el-button
          v-for="juror in data.jurors"
          :key="juror.id"
          type="text"
          @click="onOpenJuror(juror)"
        >{{juror.name}}</el-button>
      </template>

      <!-- 操作按钮插槽 -->
      <template #table-option="{data}">
        <el-button type="text" v-if="data.status == 1" @click="onDistribute(data)">分配</el-button>
        <el-button type="text" @click="onOpenCaseDialog(data)">编辑</el-button>
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

    <!-- 陪审员分配对话框 -->
    <el-dialog :visible.sync="randomVisible" title="陪审员分配">
      <random-panel :lawCase="randomCase" @save="handleRandomSave"></random-panel>
    </el-dialog>

    <!-- 新增案件对话框 -->
    <el-dialog :visible.sync="caseVisible" :title="caseData.id ? '编辑案件' : '新增案件'">
      <form-table
        :formProps="caseProps"
        :formData="caseData"
        :inline="false"
        @confirm="handleConfirmCase"
      ></form-table>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import FormTable from "../../components/form-table";
import { getLawCases, saveLawCase } from "../../http/api/case-manage";
import { CaseUtil } from "./config";

export default {
  name: "case-manage",
  components: {
    FormTable,
    "random-panel": () => import("../../components/random-panel/index")
  },
  data() {
    return {
      formProps: [
        {
          prop: "id",
          label: "ID",
          target: "number",
          disabled: true,
          placeholder: "请输入ID"
        },
        {
          prop: "status",
          label: "案件状态",
          target: "select",
          options: [
            { value: 0, label: "所有" },
            { value: 1, label: "可审办" },
            { value: 2, label: "已分配" },
            { value: 3, label: "已完结" }
          ],
          call: this.getLawCases
        }
      ],
      formData: {
        status: 1
      },
      tableColumns: [
        { prop: "id", label: "ID" },
        {
          prop: "title",
          label: "案号",
          changeText(obj) {
            return CaseUtil.makeTitle(obj);
          }
        },
        {
          prop: "department",
          label: "承办部门",
          changeText(obj, key) {
            return CaseUtil.departmentMap[obj[key]];
          }
        },
        {
          prop: "undertaker",
          label: "承办人"
        },
        {
          prop: "status",
          label: "状态",
          target: "span",
          class(obj, key) {
            return ["case-manage_status", "case-manage_status__" + obj[key]];
          },
          changeText(obj, key) {
            return CaseUtil.makeStatus(obj[key]);
          }
        },
        { prop: "jurors", label: "陪审员", slot: "jurors" },
        {
          prop: "timeCreate",
          label: "创建时间",
          changeText(obj, key) {
            return Vue.filter("time-filter")(obj[key]);
          }
        },
        { prop: "table-option", label: "操作", slot: "table-option" }
      ],
      tableData: [],
      tableLoading: false,

      tableTotal: 0,
      currentStatus: 0,
      currentPage: 1,

      randomVisible: false,
      randomCase: null,

      caseVisible: false,
      caseProps: [
        { prop: "caseYear", label: "年份", width: "100px", target: "number" },
        {
          prop: "caseProvince",
          label: "省份",
          width: "100px",
          target: "select",
          options: CaseUtil.getCaseProvinces()
        },
        {
          prop: "caseType",
          label: "案件类型",
          width: "100px",
          target: "select",
          options: CaseUtil.getCaseTypes()
        },
        { prop: "caseCode", label: "编号", width: "100px", target: "number" },
        {
          prop: "department",
          label: "承办部门",
          width: "100px",
          target: "select",
          options: CaseUtil.getDepartments()
        }
      ],
      caseData: {}
    };
  },

  created() {
    window.caseManage = this;
    this.getLawCases();
  },

  computed: {
    ...mapGetters(["authType"])
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getLawCases();
    },

    handleConfirm(data) {
      this.getLawCases();
    },

    handleConfirmCase(data) {
      saveLawCase(data).then(({ data }) => {
        this.$message(data.msg);
        this.caseVisible = false;
        this.getLawCases();
      });
    },

    handleRandomSave() {
      this.randomVisible = false;
      this.currentStatus = 1;
      this.getLawCases();
    },

    getLawCases() {
      this.tableLoading = true;
      getLawCases({ page: this.currentPage, ...this.formData })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    onDistribute(info) {
      this.randomVisible = true;
      const lawCase = JSON.parse(JSON.stringify(info));
      lawCase.title = CaseUtil.makeTitle(lawCase);
      this.randomCase = lawCase;
    },

    /**
     * 新建或编辑案件
     * @param {Object} data
     */
    onOpenCaseDialog(data) {
      this.caseVisible = true;
      this.caseData = data
        ? JSON.parse(JSON.stringify(data))
        : { caseYear: new Date().getFullYear() };
    },

    onDelete(info) {
      this.$message("过阵子开放该功能");
    },

    onOpenJuror(info) {
      console.log("onOpenJuror", info);
      this.$message("过阵子开放该功能");
    }
  }
};
</script>

<style lang="scss" scoped>
.case-manage {
}
</style>

<style lang="scss">
.case-manage {
  .el-dialog {
    min-width: 700px;
  }

  #{&}_status {
    color: white;
    padding: 5px 8px;
    border-radius: 5px;
  }
  #{&}_status__1 {
    background-color: rgb(84, 161, 100);
  }
  #{&}_status__2 {
    background-color: rgb(84, 132, 194);
  }
  #{&}_status__3 {
    background-color: rgb(153, 153, 153);
  }
}
</style>
