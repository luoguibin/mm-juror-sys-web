<template>
  <div class="random-panel">
    <el-form class="random-panel_search" :data="searchData" :inline="true">
      <el-form-item
        v-for="column in searchColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      >
        <el-input
          v-if="column.key === 'input'"
          v-model="searchData[column.prop]"
          :placeholder="column.placeholder"
        ></el-input>
        <el-input
          v-if="column.key === 'number'"
          v-model.number="searchData[column.prop]"
          :placeholder="column.placeholder"
        ></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-form :data="caseData" v-if="caseData.id">
      <el-form-item
        v-for="column in caseColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        label-width="100px"
      >
        <el-input
          readonly
          v-if="column.prop === 'content'"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 10}"
          v-model="caseData[column.prop]"
        ></el-input>
        <div v-else-if="column.prop === 'jurors'">
          <el-button
            v-for="juror in caseData[column.prop]"
            :key="juror.id"
            type="text"
            @click="onOpenJuror(juror)"
          >{{juror.name}}</el-button>
          <el-button
            :disabled="caseData[column.prop].length >= 2"
            type="primary"
            @click="onRandomJuror"
          >随机分配</el-button>
          <el-button
            :disabled="caseData[column.prop].length >= 2"
            type="primary"
            @click="onOpenRandomJurors"
          >手动分配</el-button>
        </div>
        <el-input
          v-else-if="column.prop === 'timeCreate'"
          readonly
          :value="caseData[column.prop] | timeFilter"
        ></el-input>
        <el-input v-else readonly v-model="caseData[column.prop]"></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item disabled="false" label-width="100px">
        <el-button type="primary" :disabled="caseData.status !== 0" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLawCase, saveLawCaseJurors } from "../../http/api/case-manage";
import { getLowJurors } from "../../http/api/juror-manage";

export default {
  name: "random-panel",
  data() {
    return {
      searchColumns: [
        { prop: "id", label: "ID", key: "number", placeholder: "请输入案件ID" },
        {
          prop: "title",
          label: "标题",
          key: "input",
          placeholder: "请输入案件标题"
        }
      ],
      searchData: {
        id: 20001000,
        title: ""
      },

      caseColumns: [
        { prop: "id", label: "ID" },
        { prop: "title", label: "标题" },
        { prop: "content", label: "描述" },
        { prop: "jurors", label: "陪审员" },
        { prop: "timeCreate", label: "创建时间" }
      ],
      caseData: {}
    };
  },
  created() {
    window.randomPanel = this;
    const lawCase = this.$route.params.lawCase;
    if (lawCase) {
      this.caseData = lawCase;
      this.searchData.id = lawCase.id;
    }
  },
  methods: {
    onSearch() {
      getLawCase(this.searchData).then(({ data }) => {
        this.caseData = data.data;
        if (!this.caseData) {
          this.caseData = {};
          this.$message(data.msg);
        }
      });
    },

    onRandomJuror() {
      getLowJurors().then(({ data }) => {
        console.log(data);
        this.caseData.jurors = data.data;
      });
    },

    onSave() {
      const caseData = this.caseData;
      if (caseData.status !== 0) {
        this.$message("该案件已分配陪审员或已完结");
        return;
      }
      if (caseData.jurors.length < 2) {
        this.$message("请随机分配陪审员");
        return;
      }
      saveLawCaseJurors({
        id: caseData.id,
        jurors: caseData.jurors
      }).then(({ data }) => {
        this.$message(data.msg);
        this.caseData = {};
        this.searchData.id = null;
        this.searchData.title = "";
      });
    },

    onOpenJuror(juror) {
      this.$message("过阵子开放该功能");
    },

    onOpenRandomJurors() {
      this.$message("过阵子开放该功能");
    }
  }
};
</script>

<style>
</style>
