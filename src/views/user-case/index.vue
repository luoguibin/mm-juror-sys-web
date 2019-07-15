<template>
  <div class="user-case">
    <form-table
      :formProps="formProps"
      :formData="formData"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :tableLoading="tableLoading"
      confirmText="搜索"
      @confirm="handleConfirm"
    >
      <template #jurors="{data}">
        <el-button
          v-for="juror in data.jurors"
          :key="juror.id"
          type="text"
          :class="[juror.id === userInfo.jurorId ? 'juror__me' : '']"
          @click="onOpenJuror(juror)"
        >{{juror.id === userInfo.jurorId ? "我" : juror.name}}</el-button>
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
import { mapState } from "vuex";
import FormTable from "../../components/form-table";
import {
  getLawCasesByJurorId,
  getCaseConfig
} from "../../http/api/case-manage";
import { CaseUtil } from "../case-manage/config";

export default {
  name: "user-case",
  components: {
    FormTable
  },
  data() {
    return {
      formProps: [
        {
          prop: "id",
          label: "ID",
          target: "number",
          disabled: false,
          placeholder: "请输入ID"
        },
        {
          prop: "status",
          label: "案件状态",
          target: "select",
          disabled: true,
          options: [{ value: 0, label: "所有" }],
          call: () => {
            this.currentPage = 1;
            this.getLawCases();
          }
        }
      ],
      formData: {
        status: 0
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
          prop: "servantUnit",
          label: "承办部门",
          changeText(obj, key) {
            return obj[key] ? obj[key].name : "-";
          }
        },
        {
          prop: "undertaker",
          label: "承办人",
          changeText(obj, key) {
            return obj[key] ? obj[key].name : "-";
          }
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

      randomStatus: 0
    };
  },

  created() {
    window.userCase = this;

    getCaseConfig().then(({ data }) => {
      CaseUtil.servantUnits = data.data.servantUnits;
      CaseUtil.caseTypes = data.data.caseTypes;
      CaseUtil.caseProvinces = data.data.caseProvinces;
      CaseUtil.statuses = data.data.statuses;
      CaseUtil.resetMap();

      const options = CaseUtil.statuses.map(o => ({
        value: o.id,
        label: o.name
      }));
      this.formData.status = options[1].value;
      this.formProps[1].options = this.formProps[1].options.concat(options);

      this.getLawCases();
      // this.$forceUpdate();
    });
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getLawCases();
    },

    handleConfirm(data) {
      this.getLawCases();
    },

    getLawCases() {
      this.tableLoading = true;
      getLawCasesByJurorId({
        jurorId: this.userInfo.jurorId,
        page: this.currentPage,
        ...this.formData
      })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    onOpenJuror(info) {
      console.log("onOpenJuror", info);
      this.$message("过阵子开放该功能");
    }
  }
};
</script>

<style lang="scss" scoped>
.user-case {
  height: 100%;

  .juror__me {
    color: white;
    padding: 5px;
    background-color: #409eff;
  }
}
</style>
