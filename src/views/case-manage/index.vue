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
        <el-button
          type="text"
          v-if="authType >= 5 && data.status == 1"
          @click="onDistribute(data)"
        >分配</el-button>
        <el-button type="text" v-if="authType >= 5" @click="onOpenCaseDialog(data)">编辑</el-button>
        <el-button type="text" v-if="authType >= 5" @click="onDelete(data)">删除</el-button>
        <template v-if="authType < 5">-</template>
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
    <el-dialog
      class="case-title-dialog"
      :visible.sync="caseVisible"
      :title="caseData.id ? '编辑案件' : '新增案件'"
    >
      <form-table
        :formProps="caseProps"
        :formData="caseData"
        :inline="false"
        @confirm="handleConfirmCase"
      >
        <case-title slot="case-title" :caseData="caseData"></case-title>
      </form-table>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import FormTable from "../../components/form-table";
import CaseTitle from "./case-title";
import { getLawCases, saveLawCase } from "../../http/api/case-manage";
import { getUndertakers } from "../../http/api/juror-manage";
import { getUserList } from "../../http/api/user";

import { CaseUtil } from "./config";

export default {
  name: "case-manage",
  components: {
    FormTable,
    CaseTitle,
    "random-panel": () => import("../../components/random-panel/index")
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

      randomVisible: false,
      randomCase: null,

      caseVisible: false,
      caseProps: [
        {
          prop: "caseTitle",
          label: "案号:",
          labelWidth: "100px",
          slot: "case-title"
        },
        {
          prop: "undertakerIds",
          label: "承办人:",
          labelWidth: "100px",
          target: "cascader",
          options: [],
          call: (obj, option) => {
            if (obj.undertakerIds && obj.undertakerIds.length) {
              obj.servantUnitId = obj.undertakerIds[0];
              if (obj.undertakerIds.length > 1) {
                obj.undertakerId = obj.undertakerIds[1];
              }
            }
          }
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
      const keys = ["caseYear", "caseType", "caseCode", "undertaker"];
      let count = 0;
      keys.forEach(key => {
        if (data[key]) {
          count++;
        }
      });
      if (keys.length === count) {
        saveLawCase(data).then(({ data }) => {
          this.$message(data.msg);
          this.caseVisible = false;
          this.getLawCases();
        });
      } else {
        this.$message("请输入数据");
      }
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
      getUndertakers().then(resp => {
        const result = resp.data.data;
        if (result) {
          // 处理级联配置数据
          const directChildren = [];
          const { servantUnits, undertakers } = result,
            options = [];
          const tempObj = {};
          servantUnits.forEach(o => {
            tempObj[o.id] = {
              value: o.id,
              label: o.name,
              children: o.direct === 2 ? directChildren : [] // 合并direct=1的数据
            };
          });

          undertakers.forEach(o => {
            if (tempObj[o.servantUnitId]) {
              const children = tempObj[o.servantUnitId].children;
              children.push({
                value: o.id,
                label: o.name
              });
            } else {
              console.log("match undertakers error", o);
            }
          });

          Object.keys(tempObj).forEach(key => {
            options.push(tempObj[key]);
          });

          this.caseProps[1].options = options;

          if (data) {
            const lawCase = JSON.parse(JSON.stringify(data));
            lawCase.undertakerIds = [
              lawCase.servantUnitId,
              lawCase.undertakerId
            ];
            this.caseData = lawCase;
          } else {
            this.caseData = {
              caseYear: new Date().getFullYear(),
              caseProvince: 440000
            };
          }
        }
      });
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

  .case-title-dialog .el-dialog {
    max-width: 700px;
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
