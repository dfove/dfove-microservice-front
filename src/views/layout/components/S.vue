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
  <div>
    <template v-for="(val, key) in chil">
      <el-submenu
        :index="val.name"
        :key="key"
        v-if="val.children && val.children.length > 0"
      >
        <template slot="title">
          <i class="iconfont" :class="val.menuImg" v-if="val.menuImg"></i>
          <i class="el-icon-tickets" v-else></i>
          <span>{{ val.meta.name }}</span></template
        >
        <sub-item
          :chil="val.children"
          :props="propsConfig"
          @getSubItem="onSubTtemClick"
        />
      </el-submenu>
      <el-menu-item
        :index="val.name"
        :route="{ path: val.path }"
        v-else
        :key="key"
        @click="onSubTtemClick(val)"
      >
        <!-- <i class="iconfont" :class="val.menuImg" v-if="val.menuImg"></i>
        <i class="el-icon-tickets" v-else></i> -->
        <span :to="val.path" slot="title">{{
          val.meta.name
        }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "subItem",
  props: {
    chil: {
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
    }
  },
  methods: {
    onSubTtemClick(item) {
      this.$emit("getSubItem", item);
    }
  }
};
</script>
