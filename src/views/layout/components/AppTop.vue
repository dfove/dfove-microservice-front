<!-- 
  Copyright (c) 2021 dfove.com Authors. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
 
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License. -->

<template>
  <div class="content">
    <div class="content__left">
      <router-link to="/">点服科技信息化系统</router-link>
    </div>
    <div class="content__center">
      <!-- <div class="menu-demo">
        <el-dropdown :hide-on-click="false" @command="handleMenuActive">
          <span class="el-icon-s-grid"> </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in menuList"
              :key="index"
              :command="item.name"
            >
              <router-link :to="item.path" style="display: block;">{{
                item.meta.name
              }}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div> -->
    </div>
    <div class="content__right">
      <SubMenu
        class="sub-menu"
        mode="horizontal"
        :menuList="menuList"
        :attribute="menuAttribute"
        :collapse="false"
        :iconfont="false"
      />
      <!-- :collapse="$store.state.isTopCollapse" -->
      <div class="content__right__box">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar
              class="logo"
              :size="40"
              :src="$store.state.userInfo.adminLogo"
            >
              <i class="iconfont icon-morentouxiang" style="font-size: 40px;"></i>
            </el-avatar>
            {{
              $store.state.userInfo.adminName
                ? $store.state.userInfo.adminName
                : ""
            }}
            <i class="el-icon-arrow-down" style="margin-left: 5px;"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, index) in sysChildrenMenu"
              :key="index"
              :command="item.path"
              >{{ item.meta.name }}</el-dropdown-item
            >
            <el-dropdown-item
              divided
              command="0"
              style="text-align: center; font-weight: bold;"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import SubMenu from "./M";
import { logout } from "@/api/public";
export default {
  components: {
    SubMenu
  },
  data() {
    return {
      menuAttribute: {
        textColor: "#dff1e7",
        activeTextColor: "#fff",
        backgroundColor: "#559d75"
      },
      searchKey: "",
      userInfo: {},
      menuList: [],
      sysMenuList: [],
      menuActive: "",
      portraitSvg: ""
    };
  },
  watch: {
    $route(v) {
      this.getNavList();
    },
    "$store.state.permission.menuList"(v) {
      this.getNavList();
    }
  },
  computed: {
    /** 系统管理的子级菜单 **/
    sysChildrenMenu() {
      let temp = [];
      if (this.$store.state.permission.menuList) {
        temp = this.$store.state.permission.menuList[0]["children"].filter(
          item => item.name === "系统管理"
        );
      }
      return temp[0].children;
    }
  },
  mounted() {
    this.getNavList();
  },
  methods: {
    /*
     * 获取导航列表
     * 处理菜单，首页和系统管理不显示
     */
    getNavList() {
      let menuList = this.$store.state.permission.menuList
        ? this.$store.state.permission.menuList[0].children
        : [];
      this.menuList = menuList.filter(item => {
        return item.meta.name != "系统管理" && item.meta.name != "首页";
      });
      this.menuActive = this.$route.name;
    },

    /*
     * 系统管理的子菜单跳转
     * v=0 退出系统
     */
    handleCommand(v) {
      if (v == 0) {
        this.loginOut();
      } else {
        this.$router.push(v);
      }
    },

    handleMenuActive(v) {
      this.$store.commit("SET_MENU_ACTIVE", v);
    },

    /** 系统退出登录 **/
    loginOut() {
      this.$confirm("退出系统, 是否继续?", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            localStorage.clear();
            this.$store.commit("permission/CLEAR_ALL");
            this.$message({
              message: "退出登录成功",
              type: "success"
            });
            location.reload()
            this.$router.replace("/login");
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  background-color: #559d75;
  display: flex;
  align-items: center;
  &__left {
    // flex: 0 0 300px;
    flex: 0 0 200px;
    font-size: 20px;
    font-weight: bold;
    color: #e7fbf0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__center {
    flex: 1;
  }
  &__right {
    // flex: 0 0 400px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__box {
      padding: 0 10px;
      height: 60px;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        color: white;
        cursor: pointer;
        .logo {
          margin-right: 5px;
        }
      }
    }
  }
}
.iconfont {
  color: #e6fff2;
}
.sub-menu /deep/ .el-submenu__title i {
  color: #c4efd7;
}
.content /deep/ .el-menu-item {
  padding: 0 10px;
}
.content /deep/ .el-menu-item:hover {
  background-color: transparent;
}
.menu-demo {
  span {
    display: inline-block;
    line-height: 60px;
    font-size: 30px;
    color: white;
  }
  height: 60px;
  line-height: 60px;
}
.conten /deep/ .el-submenu__title {
  padding: 0 !important;
}
</style>
