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
  <div class="mani">
    <app-top />
    <div class="app-main">
      <div class="app-main__left" v-if="showLeftNav">
        <div class="l" :class="classObject">
          <SubMenu
          mode="vertical"
          :menuList="menuList"
          :attribute="menuAttribute"
          :collapse="$store.state.isCollapse"
          :iconfont="true"
        />
        </div>
        
        <span
          class="icon el-icon-arrow-right"
          v-if="$store.state.isCollapse"
          @click="isCollapse(false)"
        >
        </span>
        <span
          class="icon el-icon-arrow-left"
          v-else
          @click="isCollapse(true)"
        >
        </span>
      </div>
      <div class="app-main__right">
        <app-main />
      </div>
    </div>
    <Notice />
  </div>
</template>

<script>
import AppTop from "./components/AppTop";
import AppMain from "./components/AppMain";
// import NavBar from "./components/NavBar";
import SubMenu from "./components/M";
import Notice from "@/components/Common/Notice";

export default {
  name: "Layout",
  components: {
    AppTop,
    AppMain,
    Notice,
    SubMenu
  },
  data() {
    return {
      classObject: {
        "left-expand": true,
        "left-shrink": false
      },
      layoutSet: "left",
      menuAttribute: {
        textColor: "#000",
        activeTextColor: "#559d75",
        backgroundColor: "#fff"
      },
      menuList: [],
      menuActive: ""
    };
  },
  watch: {
    $route(v) {
      this.temp();
    },
    "$store.state.isCollapse"(v) {
      if (v) {
        this.classObject = {
          "left-expand": false,
          "left-shrink": true
        };
        return;
      }
      this.classObject = {
        "left-expand": true,
        "left-shrink": false
      };
    }
  },
  computed: {
    showLeftNav() {
      return this.$route.path == "/home" ? false : true;
    }
  },
  mounted() {
    this.temp();
    this.$store.commit("SET_ISCOLLAPSE", false);
  },
  methods: {
    temp() {
      let currentRouter = this.$route.matched[1];
      let menuList = this.$store.state.permission.menuList
        ? this.$store.state.permission.menuList[0].children
        : [];
      if (menuList.length) {
        let temp = menuList.filter(item => {
          return currentRouter.name == item.name;
        });
        this.menuActive = this.$route.name;
        this.menuList = temp[0].children;
      }
    },

    isCollapse(v) {
      this.$store.commit("SET_ISCOLLAPSE", v);
    }
  }
};
</script>

<style lang="scss" scoped>
.mani {
  height: 100%;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.app-main {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  &__left {
    background-color: white;
    // height: 100%;
    // overflow-y: auto;
    // transition: all 0.3s;
    // position: relative;
    position: relative;
    border-right: 1px solid #dddddd;
    .l {
      height: 100%;
      overflow-y: auto;
      transition: all 0.3s;
      &.left-expand {
        // flex: 0 0 200px;
        width: 200px;
      }
      &.left-shrink {
        // flex: 0 0 64px;
        width: 64px;
      }
    }
    
    .icon {
      position: absolute;
      right: -13px;
      top: 50%;
      z-index: 99;
      margin-top: -40px;
      width: 12px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #fff;
      cursor: pointer;
      font-size: 12px;
      color: #409eff;
      overflow: hidden;
      border: 1px solid #dddddd;
      border-left: 0;
    }
  }
  &__right {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
}
</style>
