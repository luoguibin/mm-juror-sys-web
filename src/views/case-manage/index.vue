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
      <template v-if="authType >= 5" slot="form-end">
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
          v-if="authType >= 5 && data.status === randomStatus"
          @click="onRandomJurors(data)"
        >分配</el-button>
        <el-button v-if="authType >= 5" type="text" @click="onOpenCaseDialog(data)">编辑</el-button>
        <el-button v-if="authType >= 5" type="text" @click="onDelete(data)">删除</el-button>
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

    <!-- 陪审员分配，新增或编辑案件对话框 -->
    <el-dialog
      class="case-title-dialog"
      :visible.sync="caseVisible"
      :title="caseData.id ? '编辑案件' : '新增案件'"
    >
      <form-table
        :formProps="caseProps"
        :formData="caseData"
        :inline="false"
        confirmText="保存"
        @confirm="handleConfirmCase"
      >
        <template #random-panel="{data}">
          <el-tag
            v-for="juror in data.jurors"
            :key="juror.id"
            closable
            @close="onCloseJurorTag(juror)"
            @click="onOpenJuror(juror)"
          >{{juror.name}}</el-tag>

          <el-divider v-if="data.jurors && data.jurors.length > 0" direction="vertical"></el-divider>
          <el-button
            :disabled="data.jurors && data.jurors.length >= 2"
            type="primary"
            @click="getLowJurors()"
          >随机分配</el-button>

          <div style="display: inline-block; position: relative; margin-left: 10px;">
            <el-button type="primary" @click="onOpenRandomJurors">手动分配</el-button>
            <el-cascader
              ref="selfCascader"
              style="position: absolute; height: 40px; overflow: hidden; left: 0; z-index: -1;"
              v-model="selfValues"
              :options="selfOptions"
              :props="{ multiple: true, checkStrictly: false }"
              @change="onSelfCascaderChange"
            ></el-cascader>
          </div>
        </template>

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
import {
  getLawCases,
  saveLawCase,
  deleteLawCase,
  getCaseConfig
} from "../../http/api/case-manage";
import {
  getLowJurors,
  getCityJurors,
  getUndertakers
} from "../../http/api/juror-manage";

import { CaseUtil } from "./config";

export default {
  name: "case-manage",
  components: {
    FormTable,
    CaseTitle
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
          label: "创建时间"
        },
        { prop: "table-option", label: "操作", slot: "table-option" }
      ],
      tableData: [],
      tableLoading: false,

      tableTotal: 0,
      currentStatus: 0,
      currentPage: 1,

      randomStatus: 0,
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

                // 新建案件重新获设置陪审员
                if (!obj.jurors || !obj.jurors.length) {
                  obj.jurors = [];
                }
                this.caseProps[2].hidden = false;
              }
            }
          }
        },
        {
          prop: "random-panel",
          label: "陪审员",
          hidden: false,
          slot: "random-panel",
          labelWidth: "100px"
        }
      ],
      caseData: {},

      selfOptions: [],
      selfValues: []
    };
  },

  created() {
    window.caseManage = this;

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
      this.formData.status = options[0].value;
      this.randomStatus = options[0].value;
      this.formProps[1].options = this.formProps[1].options.concat(options);

      this.getLawCases();
      // this.$forceUpdate();
    });
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
      const keys = ["caseYear", "caseType", "caseCode", "undertakerId"];
      let count = 0;
      keys.forEach(key => {
        if (data[key]) {
          count++;
        }
      });
      if (keys.length === count) {
        this.saveLawCase(data, true);
      } else {
        this.$message("请输入数据");
      }
    },

    handleRandomSave() {
      this.caseVisible = false;
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

    /**
     * 分配，新建或编辑案件
     * @param {Object} data
     */
    onOpenCaseDialog(data) {
      this.caseVisible = true;
      this.caseProps[2].hidden = !data;

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
      this.$confirm("确定删除?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteLawCase({ id: info.id }).then(({ data }) => {
            this.$message(data.msg);
            this.getLawCases();
          });
        })
        .catch(() => {});
    },

    /**
     * 直接点击表格操作的分配按钮
     */
    onRandomJurors(data) {
      this.caseData = data;
      this.getLowJurors();
    },

    getLowJurors() {
      getLowJurors({
        servantUnitId: this.caseData.servantUnitId
      }).then(({ data }) => {
        const caseData = this.caseData;
        caseData.jurors = data.data;

        this.$forceUpdate();

        // 已创建的案件中，随机分配后自动保存
        if (caseData.id) {
          if (!caseData.jurors.length) {
            this.$message("该单位下未添加陪审员信息，或手动选择，或添加陪审员");
            return;
          }
          this.saveLawCase(caseData, false, true);
        }
      });
    },

    saveLawCase(data, closeDialog, randomDirect) {
      saveLawCase(data).then(resp => {
        this.$message(randomDirect ? "分配成功" : resp.data.msg);
        if (closeDialog) {
          this.caseVisible = false;
        }
        this.getLawCases();
      });
    },

    onOpenRandomJurors() {
      getCityJurors({ cityId: 1020 }).then(({ data }) => {
        const options = [],
          optionMap = {},
          jurors = data.data,
          selfValues = [],
          caseJurors = this.caseData.jurors || [];
        CaseUtil.cityJurors = jurors;

        jurors.forEach(juror => {
          if (!optionMap[juror.servantUnitId]) {
            optionMap[juror.servantUnitId] = {
              value: juror.servantUnitId,
              label: CaseUtil.servantUnitMap[[juror.servantUnitId]],
              children: []
            };
          }
          optionMap[juror.servantUnitId].children.push({
            value: juror.id,
            label: juror.name
          });

          caseJurors.forEach(o => {
            if (o.id === juror.id) {
              selfValues.push([o.servantUnitId, o.id]);
            }
          });
        });

        Object.keys(optionMap).forEach(key => {
          options.push(optionMap[key]);
        });

        this.selfOptions = options;
        this.selfValues = selfValues;

        setTimeout(() => {
          this.$refs.selfCascader.$el.click();
        }, 100);
      });
    },

    onSelfCascaderChange(values) {
      if (values.length > 2) {
        this.$message("最多选两个陪审员");

        const temps = JSON.parse(JSON.stringify(values));
        while (temps.length > 2) {
          temps.shift();
        }
        this.selfValues = temps;
      }

      const jurors = [];
      this.selfValues.forEach(vals => {
        const juror = CaseUtil.cityJurors.find(o => o.id === vals[1]);
        if (juror) {
          jurors.push(juror);
        }
      });
      this.caseData.jurors = jurors;
    },

    onCloseJurorTag(juror) {
      const jurors = this.caseData.jurors;
      const index = jurors.findIndex(o => o.id === juror.id);
      jurors.splice(index, 1);
      this.$forceUpdate();
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
  .el-tag {
    margin-right: 10px;
  }
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
  #{&}_status__101 {
    background-color: rgb(84, 161, 100);
  }
  #{&}_status__102 {
    background-color: rgb(84, 132, 194);
  }
  #{&}_status__103 {
    background-color: rgb(153, 153, 153);
  }
}
</style>
