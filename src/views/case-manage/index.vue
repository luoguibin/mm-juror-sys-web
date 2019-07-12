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

            <span
              v-else
              :class="column.class ? column.class(scope.row, column.prop) : ''"
            >{{ column.call ? column.call(scope.row, column.prop) : scope.row[column.prop]}}</span>
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
import Vue from "vue";
import { getLawCases } from "../../http/api/case-manage";
import { CaseUtil } from "./config";

export default {
  name: "case-manage",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: [
        { prop: "id", label: "ID" },
        {
          prop: "title",
          label: "案号",
          call(target) {
            return CaseUtil.makeTitle(target);
          }
        },
        { prop: "department", label: "承办部门" },
        {
          prop: "status",
          label: "状态",
          class(target, key) {
            return ["case-manage_status", "case-manage_status__" + target[key]];
          },
          call(target, key) {
            return CaseUtil.makeStatus(target[key]);
          }
        },
        { prop: "jurors", label: "陪审员" },
        {
          prop: "timeCreate",
          label: "创建时间",
          call(target, key) {
            return Vue.filter("time-filter")(target[key]);
          }
        }
      ],
      tableTotal: 0,
      currentStatus: 0,
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

