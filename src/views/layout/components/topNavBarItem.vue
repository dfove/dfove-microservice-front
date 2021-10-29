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
    <div class="el-menu-item pp">
        <el-submenu
            v-if="item.meta && item.meta.type != 1 && dispose"
            :index="item.name"
        >
            <template slot="title"
                ><span slot="title">{{ item.meta.name }}</span></template
            >
            <nav-bar-item
                v-for="(subItem, i) in item.children"
                :key="i"
                :item="subItem"
            ></nav-bar-item>
        </el-submenu>

        <el-menu-item
            v-else
            :index="item.name"
            :title="item.meta.name"
            :route="{ path: item.path }"
        >
            <span slot="title">{{ item.meta.name }}</span></el-menu-item
        >
    </div>
</template>

<script>
export default {
    name: "NavBarItem",
    props: ["item"],
    data() {
        return {};
    },
    mounted() {},
    computed: {
        dispose(v) {
            return v.item.children && v.item.children.length >= 1
        },
    },
    methods: {
        to (v) {
            this.$router.push(v)
        }
    }
};
</script>


<style lang="scss" scoped>
.el-menu-item /deep/ .el-menu-item:hover {
	background-color: transparent;
}
.el-menu-item /deep/ .el-menu-item {
	background-color: #559d75
}
.el-menu-item /deep/ .el-submenu {
    background-color: #559d75
}

.iconfont {
    color: #a8b7ca;
    vertical-align: middle;
    margin-right: 10px;
    width: 24px;
    text-align: center;
    font-size: 15px;
}
</style>

