<template>
  <div class="random-panel">
    <el-form class="random-panel_search" :data="searchData" :inline="true">
      <el-form-item
        v-for="column in searchColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
      >
        <el-input v-if="column.key === 'input'" v-model="searchData[column.prop]"></el-input>
        <el-input v-if="column.key === 'number'" v-model.number="searchData[column.prop]"></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-form :data="caseData" v-if="caseData.id">
      <el-form-item
        v-for="column in caseColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        label-width="100px"
      >
        <el-input v-if="column.prop === 'content'" type="textarea" v-model="caseData[column.prop]"></el-input>
        <div v-else-if="column.prop === 'jurors'">
          <el-button
            v-for="juror in caseData[column.prop]"
            :key="juror.id"
            type="text"
            @click="onOpenJuror(juror)"
          >{{juror.name}}</el-button>
          <el-button
            :disabled="caseData[column.prop].length >= 3"
            type="primary"
            @click="onRandomJuror"
          >随机分配</el-button>
        </div>
        <el-input v-else v-model.number="caseData[column.prop]"></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLawCase } from "../../http/api/case-manage";
import { getLowJurors } from "../../http/api/juror-manage";

export default {
  name: "random-panel",
  data() {
    return {
      searchColumns: [
        { prop: "id", label: "ID", key: "number" },
        { prop: "title", label: "标题", key: "input" }
      ],
      searchData: {
        id: 10001004,
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
  created() {},
  methods: {
    onSearch() {
      getLawCase(this.searchData).then(({ data }) => {
        this.caseData = data.data;
      });
    },

    onRandomJuror() {
      getLowJurors().then(({ data }) => {
        this.caseData.jurors = data.data;
      });
    },

    onSave() {
      if (this.caseData.jurors.length < 2) {
        this.$message("请随机分配陪审员");
        return;
      }
      this.caseData = {};
      this.$message("保存成功");
    },

    onOpenJuror(juror) {
      this.$message("过阵子开放该功能");
    }
  }
};
</script>

<style>
</style>
