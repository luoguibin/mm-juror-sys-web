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
      <template v-if="authType >= 5" slot="form-end">
        <el-divider direction="vertical"></el-divider>
        <el-button @click="onOpenNewJuror()" type="primary">新增陪审员</el-button>
      </template>

      <!-- 操作按钮插槽 -->
      <template #table-option="{data}">
        <el-button type="text" v-if="authType >= 5" @click="onOpenNewJuror(data)">编辑</el-button>
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

    <!-- 新增案件对话框 -->
    <el-dialog :visible.sync="jurorVisible" :title="jurorData.id ? '编辑陪审员' : '新增陪审员'">
      <form-table
        :formProps="jurorProps"
        :formData="jurorData"
        :inline="false"
        @confirm="handleConfirmCase"
      ></form-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormTable from "../../components/form-table";
import {
  getJurors,
  saveJuror,
  deleteJuror,
  getUndertakers
} from "../../http/api/juror-manage";

export default {
  name: "juror-manage",
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
          placeholder: "请输入ID",
          disabled: false
        },
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
          changeText(obj, key) {
            return +obj[key] === 1 ? "男" : "女";
          }
        },
        {
          prop: "dept_id",
          label: "工作单位"
        },
        {
          prop: "case_count",
          label: "已陪审案件数",
          target: "button",
          buttonType: "text",
          call: this.onCaseCount
        },
        { prop: "phone", label: "手机号码" },
        { prop: "address", label: "地址" },
        { prop: "table-option", label: "操作", slot: "table-option" }
      ],
      tableData: [],
      tableLoading: false,

      tableTotal: 0,
      currentPage: 1,

      orderType: 1,

      jurorVisible: false,
      jurorProps: [
        {
          prop: "servantUnitId",
          label: "单位",
          labelWidth: "100px",
          target: "select",
          options: [],
          call: (obj, option) => {
            // servantUnitId
            console.log(obj, option)
          }
        },
        {
          prop: "name",
          label: "姓名",
          labelWidth: "100px"
        },
        {
          prop: "sex",
          label: "性别",
          labelWidth: "100px",
          target: "select",
          options: [{ value: 0, label: "女" }, { value: 1, label: "男" }]
        },
        {
          prop: "phone",
          label: "手机号码",
          labelWidth: "100px",
          target: "number"
        },
        {
          prop: "jurorType",
          label: "角色",
          labelWidth: "100px",
          target: "select",
          options: [
            { value: 0, label: "陪审员" },
            { value: 1, label: "承办人" }
          ]
        },
        {
          prop: "address",
          label: "住址",
          labelWidth: "100px"
        }
      ],
      jurorData: {}
    };
  },

  created() {
    window.jurorManage = this;
  },

  activated() {
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
      getJurors({ token: true, page: this.currentPage, ...this.formData })
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

    onDelete(info) {
      this.$confirm("确定删除?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteJuror({ id: info.id }).then(({ data }) => {
            this.$message(data.msg);
            this.getJurors();
          });
        })
        .catch(() => {});
    },

    onOpenNewJuror(data) {
      this.jurorVisible = true;

      getUndertakers().then(resp => {
        const result = resp.data.data;
        if (result) {
          const { servantUnits } = result;
          console.log(servantUnits);
          const options = servantUnits.map(o => ({
            value: o.id,
            label: o.name
          }));

          this.jurorProps[0].options = options;

          if (data) {
            const juror = JSON.parse(JSON.stringify(data));
            this.jurorData = juror;
          } else {
            this.jurorData = { sex: 1, jurorType: 0 };
          }
        }
      });
    },

    handleConfirmCase(data) {
      const keys = ["name", "phone", "servantUnitId"];
      let count = 0;
      keys.forEach(key => {
        if (data[key]) {
          count++;
        }
      });
      if (keys.length === count) {
        saveJuror(data).then(({ data }) => {
          this.$message(data.msg);
          this.jurorVisible = false;
          this.getJurors();
        });
      } else {
        this.$message("请输入数据");
      }
    }
  }
};
</script>

<style>
</style>
