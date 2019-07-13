<template>
  <div class="case-title">
    <span>(</span>
    <el-input class="case-title_item year" v-model.number="caseData.caseYear"></el-input>
    <span>)</span>

    <el-select class="case-title_item province" v-model="caseData.caseProvince" :disabled="true">
      <el-option
        v-for="option in provinceOptions"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      ></el-option>
    </el-select>

    <div class="case-title_item type">
      <span
        :class="['el-input__inner', caseData.caseType ? '': 'empty']"
        @click="onClickCaseType"
      >{{ caseData.caseType ? caseTypeMap[caseData.caseType] : '请选择'}}</span>
      <el-select ref="typeSelect" v-model="caseData.caseType">
        <el-option
          v-for="option in caseTypeOptions"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        ></el-option>
      </el-select>
    </div>

    <el-input class="case-title_item code" v-model.number="caseData.caseCode"></el-input>
    <span>号</span>
  </div>
</template>

<script>
import { CaseUtil } from "./config";

export default {
  props: {
    caseData: {
      type: Object
    }
  },
  data() {
    return {
      provinceOptions: CaseUtil.caseProvinces.map(o => ({
        value: o.id,
        label: o.name
      })),
      caseTypeMap: CaseUtil.caseTypeMap,
      caseTypeOptions: CaseUtil.caseTypes.map(o => ({
        value: o.id,
        label: o.name
      }))
    };
  },

  created() {
    window.caseTitle = this;
  },

  methods: {
    onClickCaseType(e) {
      this.$refs.typeSelect.$refs.reference.$el.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.case-title {
  display: flex;
  flex-direction: row;

  #{&}_item {
    display: inline-block;
    margin: 0 5px;
  }

  .year {
    width: 60px;
  }

  .province {
    width: 100px;
  }

  .type {
    position: relative;
    text-align: center;

    span {
      display: inline-block;
      cursor: pointer;
    }

    .empty {
      color: #c0c4cc;
    }

    .el-select {
      position: absolute;
      left: 0;
      width: 60px;
      z-index: -1;
    }
  }

  .code {
    width: 80px;
  }
}
</style>

<style lang="scss">
.case-title {
  .el-input__inner {
    padding: 0 5px;
    border-radius: 0;
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
  }
}
</style>
