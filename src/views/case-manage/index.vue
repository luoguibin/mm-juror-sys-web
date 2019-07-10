<template>
  <div class="case-manage">
    <div class="case-manage_header">
      <el-button @click="onOpenNewCase()" type="primary">新增案件</el-button>
    </div>

    <!-- 表格 -->
    <div class="case-manage_main">
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        >
          <template slot-scope="scope">
            <template v-if="column.prop === 'jurors'">
              <el-button
                v-for="juror in scope.row.jurors"
                :key="juror.id"
                type="text"
                @click="onOpenJuror"
              >{{juror.name}}</el-button>
            </template>
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
import { getLawCases } from "../../http/api/case-manage";

export default {
  name: "case-manage",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: [
        { prop: "id", label: "ID" },
        { prop: "title", label: "标题" },
        { prop: "content", label: "描述" },
        { prop: "jurors", label: "陪审员" },
        { prop: "timeCreate", label: "创建时间" }
      ],
      tableTotal: 0,
      currentPage: 1
    };
  },
  created() {
    window.caseManage = this;
    this.getLawCases();
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getLawCases();
    },

    getLawCases() {
      this.tableLoading = true;
      getLawCases({ page: this.currentPage })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    onOpenEidtDialog(info) {
      this.$message("过阵子开放该功能");
    },

    onDelete(info) {
      this.$message("过阵子开放该功能");
    },

    onOpenJuror(info) {
      this.$message("过阵子开放该功能");
    },

    onOpenNewCase() {
      this.$message("过阵子开放该功能");
    }
  }
};
</script>

<style>
</style>
