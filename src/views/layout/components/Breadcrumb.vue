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
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :key="index"
                :to="{ path: item.path }"
                >{{ item.name }}</el-breadcrumb-item
            >
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadcrumbList: [],
        };
    },
    created() {
        this.loadBreadcrumb();
    },
    watch: {
        //监听路由变化
        $route(to, from) {
            this.loadBreadcrumb();
        },
    },
    methods: {
        loadBreadcrumb() {
            this.breadcrumbList = this.$route.matched.map((item) => {
                return {
                    name: item.meta.name,
                    path: item.path,
                };
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.crumbs {
    padding: 20px 30px;
    background-color: white;
    border-bottom: 1px solid #dddddd;
}
</style>