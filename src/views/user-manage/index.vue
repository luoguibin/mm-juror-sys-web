<template>
  <div class="user-manage">
    <!-- <xml-test></xml-test> -->

    <form-table
      :formProps="formProps"
      :formData="formData"
      :tableColumns="tableColumns"
      :tableData="tableData"
      :tableLoading="tableLoading"
      confirmText="搜索"
      @confirm="handleConfirm"
    >
      <template v-if="authType >= 9" slot="form-end">
        <el-divider direction="vertical"></el-divider>
        <el-button @click="onOpenDialog()" type="primary">新增用户</el-button>
      </template>

      <!-- 操作按钮插槽 -->
      <template #table-option="{data}">
        <el-button type="text" @click="onOpenDialog(data)">详情</el-button>
        <el-button
          type="text"
          v-if="authType >= 5 && data.authType < authType"
          @click="onDelete(data)"
        >删除</el-button>
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

    <!-- 新增或编辑用户信息对话框 -->
    <el-dialog :visible.sync="dialogVisible" :title="isEditData ? '编辑用户' : '新增用户'">
      <el-form ref="form" :model="editData" label-width="80px" autocomplete="off">
        <!-- 输入框 -->
        <el-form-item label="账 号" prop="id">
          <el-input v-model.number="editData.id" type="tel" :disabled="idDisabled"></el-input>
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
        <el-form-item label="权 限" prop="authType" v-if="authType >= 5">
          <el-select v-model="editData.authType">
            <el-option label="普通用户" :value="1"></el-option>
            <el-option label="管理员" :value="5"></el-option>
            <el-option v-if="authType >= 9" label="超级管理员" :value="9"></el-option>
          </el-select>
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
import Vue from "vue";
import { mapGetters } from "vuex";
import FormTable from "../../components/form-table";
import {
  getUserList,
  createAccount,
  updateAccount,
  deleteAccount
} from "../../http/api/user";

export default {
  name: "user-manage",
  components: {
    FormTable,
    "xml-test": () => import("./xml-test")
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
          prop: "name",
          label: "名称",
          placeholder: "请输入名称..."
        },
        {
          prop: "authType",
          label: "账号类型",
          target: "select",
          options: [
            { value: 0, label: "全部" },
            { value: 1, label: "普通用户" },
            { value: 5, label: "管理员" }
          ]
        }
      ],
      formData: { authType: 0 },
      tableColumns: [
        { prop: "id", label: "ID" },
        { prop: "name", label: "名称" },
        // {
        //   prop: "jurorId",
        //   label: "是否关联职务",
        //   target: "button",
        //   buttonType: "text",
        //   changeText(obj, key) {
        //     return obj[key] ? "是" : "否";
        //   },
        //   call: (obj, key) => {
        //     console.log(obj);
        //   }
        // },
        {
          prop: "authType",
          label: "账号类型",
          changeText(obj, key) {
            const authType = obj[key];
            if (authType === 1) {
              return "普通用户";
            } else if (authType === 5) {
              return "管理员";
            } else if (authType === 9) {
              return "超级管理员";
            } else {
              return "未知";
            }
          }
        },
        {
          prop: "last_login",
          label: "最近登录",
          changeText(obj, key) {
            if (obj[key] === "None") {
              return "-";
            } else {
              return obj[key];
            }
          }
        },
        { prop: "table-option", label: "操作", slot: "table-option" }
      ],
      tableData: [],
      tableLoading: false,

      tableTotal: 0,
      currentPage: 1,

      dialogVisible: false,
      isEditData: false,
      inRequest: false,
      idDisabled: false,
      editData: {}
    };
  },

  created() {
    window.userManage = this;
    if (this.authType >= 9) {
      const authTypeProp = this.formProps.find(o => o.prop === "authType");
      authTypeProp.options.push({ value: 9, label: "超级管理员" });
    }
    this.getUserList();
  },

  computed: {
    ...mapGetters(["authType"])
  },

  methods: {
    getUserList() {
      this.tableLoading = true;
      getUserList({
        token: true,
        mAuthType: this.authType,
        page: this.currentPage,
        ...this.formData
      })
        .then(({ data }) => {
          const list = data.data || [];
          list.forEach(o => {
            o.authType = +o.authType;
          });
          this.tableData = list;
          this.tableTotal = data.total;
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    handleConfirm(data) {
      this.currentPage = 1;
      this.getUserList();
    },

    handlePageChange(page) {
      this.currentPage = page;
      this.getUserList();
    },

    onOpenDialog(info) {
      this.dialogVisible = true;
      if (info) {
        this.editData = JSON.parse(JSON.stringify(info));
        this.idDisabled = true;
      } else {
        this.idDisabled = false;
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
