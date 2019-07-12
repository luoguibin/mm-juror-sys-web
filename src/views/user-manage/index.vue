<template>
  <div class="user-manage">
    <div class="user-manage_header">
      <el-button @click="onOpenDialog()" type="primary">新增用户</el-button>
    </div>

    <!-- 表格 -->
    <div class="user-manage_main">
      <el-table :data="tableData" border v-loading="tableLoading">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
        >
          <template slot-scope="scope">
            <template v-if="column.prop === 'timeCreate'">{{scope.row[column.prop] | time-filter}}</template>
            <template v-else>{{scope.row[column.prop]}}</template>
          </template>
        </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="onOpenDialog(scope.row)">详情</el-button>
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

    <el-dialog :visible.sync="dialogVisible" :title="isEditData ? '编辑用户' : '新增用户'">
      <el-form ref="form" :model="editData" label-width="80px" autocomplete="off">
        <!-- 输入框 -->
        <el-form-item label="账 号" prop="id">
          <el-input v-model.number="editData.id" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="昵 称" prop="name">
          <el-input v-model.trim="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="pw">
          <el-input v-model="editData.pw" show-password clearable autocomplete="new-password"></el-input>
        </el-form-item>
        <el-form-item v-if="false && isEditData" label="重复密码" prop="pw2">
          <el-input v-model="editData.pw2" show-password clearable></el-input>
        </el-form-item>

        <!-- 功能按钮 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="onCreateUpdate"
            :loading="inRequest"
          >{{isEditData ? "更新" : "新增"}}</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  createAccount,
  updateAccount,
  deleteAccount
} from "../../http/api/user";

export default {
  name: "user-manage",
  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableColumns: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "名称" },
        { prop: "authType", label: "账号类型" },
        //  {prop: "iconUrl", label: "iconUrl"},
        { prop: "timeCreate", label: "创建时间" }
      ],
      tableTotal: 0,
      currentPage: 1,

      dialogVisible: false,
      isEditData: false,
      inRequest: false,
      editData: {}
    };
  },
  created() {
    window.userManage = this;
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.tableLoading = true;
      getUserList({ token: true, page: this.currentPage })
        .then(({ data }) => {
          this.tableData = data.data;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getUserList();
    },

    onOpenDialog(info) {
      this.dialogVisible = true;
      console.log(info);
      if (info) {
        this.editData = JSON.parse(JSON.stringify(info));
      } else {
        this.editData = {
          id: null,
          name: "",
          pw: ""
        };
      }

      this.isEditData = !!this.editData.authType;

      console.log("onOpenDialog", this.isEditData, this.editData);
    },

    onCreateUpdate() {
      let method;
      if (this.isEditData) {
        method = updateAccount;
      } else {
        method = createAccount;
      }
      this.inRequest = true;
      method(this.editData)
        .then(({ data }) => {
          this.$message(data.msg);
          this.dialogVisible = false;
          this.getUserList();
        })
        .finally(() => {
          this.inRequest = false;
        });
    },

    onDelete(info) {
      this.$confirm("确定删除?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          console.log("onDelete", info);
          deleteAccount({ id: info.id, token: true }).then(({ data }) => {
            this.$message(data.msg);
            this.getUserList();
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
</style>
