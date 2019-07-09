<template>
  <el-container class="home">
    <el-header style="background: rgb(48, 79, 119);">hello，都比杰</el-header>

    <el-container>
      <el-aside width="200px" style="background: rgb(68, 99, 138);">
        <div
          style="height: 60px; line-height: 60px; color: white; text-align: center;"
          v-for="asideMenu in asideMenus"
          :key="asideMenu.key"
        >{{asideMenu.name}}</div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      asideMenus: [
        { key: "user-manage", name: "用户管理" },
        { key: "juror-manage", name: "陪审员信息" },
        { key: "random-panel", name: "随机抽取" },
        { key: "case-manage", name: "案件列表" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
