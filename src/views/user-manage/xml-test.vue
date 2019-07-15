<template>
  <div>
    <el-input type="file" @change.native="onChange"></el-input>
    <el-button @click="onSaveFile">save</el-button>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  name: "xml-test",
  data() {
    return {};
  },

  methods: {
    onChange(e) {
      console.log(e);
      this.readExcel(e);
    },

    readExcel(e) {
      const files = e.target.files;
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary"
          });
          console.log(workbook);
          for (let sheet in workbook.Sheets) {
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]); //获得以第一列为键名的sheet数组对象
            console.log(workbook.Sheets[sheet], sheetArray);
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },

    onSaveFile() {
      saveAs(
        new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" }),
        "test.txt"
      );
    }
  }
};
</script>

<style>
</style>
