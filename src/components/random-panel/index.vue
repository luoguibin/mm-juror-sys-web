<template>
  <div class="random-panel">
    <el-form :data="caseData" v-if="caseData.id">
      <el-form-item
        v-for="column in caseColumns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        label-width="100px"
      >
        <div v-if="column.prop === 'jurors'">
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
        <el-input v-else-if="column.call" :value="column.call(caseData, column.prop)"></el-input>
        <el-input v-else readonly v-model="caseData[column.prop]"></el-input>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item disabled="false" label-width="100px">
        <el-button type="primary" :disabled="caseData.status !== 1" @click="onSave">保存</el-button>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import { getLawCase, saveLawCaseJurors } from "../../http/api/case-manage";
import { getLowJurors } from "../../http/api/juror-manage";

export default {
  name: "random-panel",
  props: {
    lawCase: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      caseColumns: [
        { prop: "id", label: "ID" },
        { prop: "title", label: "案号" },
        { prop: "jurors", label: "陪审员" },
        {
          prop: "timeCreate",
          label: "创建时间",
          call(target, key) {
            return Vue.filter("time-filter")(target[key]);
          }
        }
      ],
      caseData: {}
    };
  },
  created() {
    window.randomPanel = this;
  },

  watch: {
    lawCase: {
      immediate: true,
      handler(val) {
        this.checkLawCase(val);
      }
    }
  },

  methods: {
    checkLawCase(lawCase) {
      if (lawCase) {
        this.caseData = lawCase;
      }
    },

    onSearch() {
      getLawCase({ id: this.caseData.id }).then(({ data }) => {
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
      if (caseData.status !== 1) {
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
        this.$emit("save");
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

<style lang="scss">
.random-panel {
}
</style>
