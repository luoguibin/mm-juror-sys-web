<template>
  <div class="juror-manage">
    <div class="juror-manage_header">
      <el-button @click="onOpenNewJuror()" type="primary">新增陪审员</el-button>
    </div>

    <!-- 表格 -->
    <div class="juror-manage_main">
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        >
          <template slot-scope="scope">
            <template v-if="column.prop === 'caseCount'">
              <el-button type="text" @click="onCaseCount(scope.row)">{{scope.row[column.prop]}}</el-button>
            </template>
             <template v-else-if="column.prop === 'timeCreate'">{{scope.row[column.prop] | timeFilter}}</template>
            <template v-else>{{scope.row[column.prop]}}</template>
          </template>
        </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="onOpenEidtDialog(scope.row)">编辑</el-button>
            <el-button
              type="text"
              v-if="scope.row.authType !== 'ADMIN'"
              @click="onDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="prev, pager, next"
        background
        hide-on-single-page
        :total="tableTotal"
        :current-page="currentPage"
        @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getJurors } from "../../http/api/juror-manage";

export default {
  name: "juror-manage",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "姓名" },
        { prop: "caseCount", label: "已陪审案件数" },
        { prop: "phone", label: "手机号码" },
        { prop: "address", label: "地址" },
        { prop: "timeCreate", label: "创建时间" }
      ],
      tableTotal: 0,
      currentPage: 1
    };
  },
  created() {
    window.JurorManage = this;
    this.getJurors();
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getJurors();
    },

    getJurors() {
      this.tableLoading = true;
      getJurors({ page: this.currentPage })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    onCaseCount(data) {
      this.$message("过阵子开放该功能");
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
