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
            <div class="app-main__left">
                <SubMenu />
            </div>
            <div class="app-main__right">
                <ChildMain />
            </div>
        </div>
        <Notice />
    </div>
</template>

<script>
import AppTop from "./components/AppTop";
import ChildMain from "./components/childMain";
import SubMenu from "./components/M";
import Notice from "@/components/Common/Notice";
export default {
    name: "Layout",
    components: {
        AppTop,
        ChildMain,
        Notice,
        SubMenu,
    },
    data() {
        return {};
    },
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
        flex: 0 0 220px;
        background-color: white;
        height: 100%;
        overflow-y: auto;
    }
    &__right {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        position: relative;
    }
}
</style>