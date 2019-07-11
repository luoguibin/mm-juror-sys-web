<template>
  <el-container class="home">
    <!-- 头部 -->
    <el-header class="home_header">
      <el-button type="text">{{userInfo ? userInfo.name : ''}}</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button type="text" @click="onLogout">退出</el-button>
    </el-header>

    <el-container style="overflow: hidden;">
      <!-- 左侧菜单 -->
      <el-aside :width="asideWidth" class="home_aside">
        <div class="aside_collapse">
          <el-button type="text" @click="asideNormal = !asideNormal">
            <i :class="[asideNormal ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
          </el-button>
        </div>

        <el-menu mode="vertical" :default-active="activeIndex" @select="onMenuSelect">
          <el-menu-item v-for="(menu, index) in asideMenus" :key="index" :index="'' + index">
            <i class="el-icon-notebook-1"></i>
            <span style="margin-left: 5px;" v-show="asideNormal">{{menu.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主视图 -->
      <el-main>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      asideNormal: true,
      activeIndex: "-1"
    };
  },
  created() {
    window.home = this;
    this.matchPathMenu();
  },

  computed: {
    asideWidth() {
      return this.asideNormal ? "160px" : "60px";
    },
    ...mapState({
      userInfo: state => state.user.userInfo,
      asideMenus: state => {
        const menu = state.user.menu;
        const menus = menu ? menu.routers : [];
        return menus.filter(o => {
          return o.parent === "home";
        });
      }
    })
  },

  watch: {
    $route() {
      this.matchPathMenu();
    }
  },

  methods: {
    /**
     * 左侧菜单选项回调
     * @param {String} index 菜单下标
     */
    onMenuSelect(index) {
      const menu = this.asideMenus[+index];
      this.$router.push({ path: "/home/" + menu.path });
    },

    matchPathMenu() {
      if (this.$route.fullPath === "/home") {
        this.onMenuSelect("0");
      } else {
        const name = this.$route.name;
        const index = this.asideMenus.findIndex(o => {
          return o.path === name;
        });
        if (index !== -1) {
          this.activeIndex = "" + index;
        } else {
          this.onMenuSelect("0");
        }
      }
    },

    onLogout() {
      this.$confirm("用户退出后所有数据将重置?", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.logout();
        })
        .catch(() => {});
    },

    ...mapActions(["logout"])
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  #{&}_header {
    text-align: right;
    line-height: 60px;
    background: rgb(48, 79, 119);
  }

  #{&}_aside {
    background: rgb(68, 99, 138);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    transition-property: width;
    transition-duration: 300ms;

    .aside_collapse {
      text-align: center;
      padding: 10px;
    }
  }
}
</style>

<style lang="scss">
.home {
  #{&}_aside {
    .el-menu {
      border-right: none;
      background-color: transparent;
    }

    .el-menu-item {
      color: white;
    }

    .el-menu-item:not(.is-disabled):focus,
    .el-menu-item:not(.is-disabled):hover,
    .el-menu-item.is-active {
      background-color: rgba(0, 0, 0, 0.2);
      color: #409eff;
    }
  }

  .el-scrollbar {
    height: 100%;

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>
