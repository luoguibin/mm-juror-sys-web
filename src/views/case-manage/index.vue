<template>
  <div class="case-manage">
    <div class="case-manage_header">
      <span>案件状态&nbsp;</span>
      <el-select v-model="currentStatus" @change="handleStatusChange">
        <el-option :value="-1" label="所有"></el-option>
        <el-option :value="0" label="可审办"></el-option>
        <el-option :value="1" label="已分配"></el-option>
        <el-option :value="2" label="已完结"></el-option>
      </el-select>
      <el-divider direction="vertical"></el-divider>
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
            <div
              v-else-if="column.prop === 'content'"
              class="case-manage__content"
            >{{scope.row[column.prop]}}</div>
            <span
              v-else-if="column.prop === 'status'"
              :class="['case-manage_status', 'case-manage_status__' + scope.row[column.prop] ]"
            >{{scope.row[column.prop] | statusFilter}}</span>
            <template
              v-else-if="column.prop === 'timeCreate'"
            >{{scope.row[column.prop] | timeFilter}}</template>
            <template v-else>{{scope.row[column.prop]}}</template>
          </template>
        </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.status == 0" @click="onDistribute(scope.row)">分配</el-button>
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
        { prop: "status", label: "状态" },
        { prop: "jurors", label: "陪审员" },
        { prop: "timeCreate", label: "创建时间" }
      ],
      tableTotal: 0,
      currentStatus: -1,
      currentPage: 1
    };
  },
  created() {
    window.caseManage = this;
    this.getLawCases();
  },
  filters: {
    statusFilter(value) {
      switch (value) {
        case 0:
          return "可审办";
        case 1:
          return "已分配";
        case 2:
          return "已完结";
        default:
          return "其他";
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.getLawCases();
    },

    handleStatusChange(value) {
      this.getLawCases();
    },

    getLawCases() {
      this.tableLoading = true;
      getLawCases({ page: this.currentPage, status: this.currentStatus })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    onDistribute(info) {
      this.$router.push({
        name: "random-panel",
        params: { lawCase: JSON.parse(JSON.stringify(info)) }
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

<style lang="scss" scoped>
.case-manage {
  #{&}__content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #{&}_status {
    color: white;
    padding: 5px 8px;
    border-radius: 5px;
  }
  #{&}_status__0 {
    background-color: rgb(84, 161, 100);
  }
  #{&}_status__1 {
    background-color: rgb(84, 132, 194);
  }
  #{&}_status__2 {
    background-color: rgb(153, 153, 153);
  }
}
</style>

