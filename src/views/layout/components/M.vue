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
  <el-menu
    :mode="mode"
    ref="kzMenu"
    router
    :text-color="attribute['textColor']"
    :active-text-color="attribute['activeTextColor']"
    :background-color="attribute['backgroundColor']"
    :default-active="menuActive"
    :collapse="collapse"
    @select="handleSelect"
    style="border-right: 0;"
  >
  <!-- $store.state.menuActive -->
    <template v-for="(val, key) in menuList">
      <el-submenu
        :index="val.name"
        v-if="val.children && val.children.length > 0"
        :key="key"
      >
        <template slot="title">
          <i class="iconfont" :class="val.menuImg" v-if="val.menuImg && iconfont"></i>
          <i class="el-icon-tickets" v-else-if="iconfont"></i>
          <span>{{ val.meta.name }}</span>
        </template>
        <SubItem
          :chil="val.children"
          :props="propsConfig"
          @getSubItem="onMenuItemClick"
        />
      </el-submenu>
      <el-menu-item
        :index="val.name"
        :route="{ path: val.path }"
        v-else
        @click="onMenuItemClick(val)"
        :key="key"
      >
        <!-- <i :class="val.icon"></i> -->
        <!-- :route="{ path: val.path }" -->
        <i class="iconfont" v-if="val.menuImg" :class="val.menuImg"></i>
        <i class="el-icon-tickets" v-else></i>
        <a slot="title" :href="'/#'+val.path"
          >{{ val.meta.name }}
          <!-- <router-link style="display: block;" :to="val.path"> </router-link> -->
        </a>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import SubItem from "./S";

export default {
  name: "subMenu",
  components: { SubItem },
  props: {
    menuActive2: {
      type: String,
      default() {
        return "";
      }
    },
    mode: {
      type: String,
      default() {
        return "vertical";
      }
    },
    attribute: {
      type: Object,
      default() {
        return {
          textColor: "#000",
          activeTextColor: "#559d75",
          backgroundColor: "#fff"
        };
      }
    },
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    propsConfig: {
      type: Object,
      default() {
        return {
          children: "children",
          label: "label",
          index: "id"
        };
      }
    },
    collapse: {
      type: Boolean,
      default() {
        return false
      }
    },
    iconfont: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      navList: [],
      menuActive: ""
    };
  },
  watch: {
    $route(v) {
      this.temp();
    }
  },
  mounted() {
    this.temp();
  },
  methods: {
    temp() {
      this.menuActive = this.$route.name;
      this.$store.commit("SET_MENU_ACTIVE", this.$route.name);
    },
    onMenuItemClick(item) {
      this.$emit("getmenu", item);
    },
    handleSelect(v) {
      this.menuActive = v;
      this.$store.commit("SET_MENU_ACTIVE", v);
    }
  }
};
</script>
