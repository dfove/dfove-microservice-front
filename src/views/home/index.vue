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
    <div class="home">
        <div class="module dynamic">            
            <Dynamic />
        </div>

        <div class="module agenda">
            <div class="agenda__l">
                <div class="agenda__l__agenda">                    
                    <div>
                        <Agenda />
                    </div>
                </div>

                <div class="box">
                    <div class="box__left">
                        <div class="box__left__content">
                            <Function />
                        </div>
                    </div>
                    <div class="box__right">                        
                        <div class="box__right__content">
                            <Notice />
                        </div>
                    </div>
                </div>
            </div>
            <div class="agenda__r">
                <div>
                    <Birthday />
                </div>
                <div>
                    <Statistics />
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import Dynamic from "@/components/Home/Dynamic/index";
import Agenda from "@/components/Home/Agenda/index";
import Birthday from "@/components/Home/Birthday/index";
import Function from "@/components/Home/Function/index";
import Notice from "@/components/Home/Notice/index";
import Statistics from "@/components/Home/Statistics/index";
export default {
    components: {
        Dynamic,
        Agenda,
        Birthday,
        Function,
        Notice,
        Statistics
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.home {
    padding: 20px;
}
.bg {
}
.module {
    border-radius: 2px;
    margin-bottom: 30px;
    &__h4 {
        font-size: 16px;
        height: 54px;
        line-height: 54px;
        padding: 0 10px;
        background-color: white;
        span {
            font-size: 14px;
            display: inline-block;
            font-weight: normal;
        }
    }
    &__title {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        height: 54px;
        line-height: 54px;
        padding: 0 10px;
        background-color: white;
        span {
            font-weight: normal;
            color: #559d75;
            font-size: 15px;
        }
    }
    &__pd {
        padding: 30px 0;
    }
}
.dynamic {
    padding: 10px 20px 20px;
    background-color: white;
}
.agenda {
    display: flex;
    &__l {
        flex: 2;
        // background-color: white;
        margin-right: 30px;
        // padding: 20px;
        &__agenda {
            background-color: white;
            padding: 20px;
        }
    }
    &__r {
        // padding: 20px;
        flex: 1;
    }
}

.box {
    display: flex;
    margin-top: 30px;
    &__left {
        flex: 1;
        margin-right: 30px;
        background-color: white;
        border-radius: 2px;
        &__content {
            padding: 20px;
        }
    }
    &__right {
        flex: 1;
        background-color: white;
        border-radius: 2px;
        &__content {
            padding: 20px;
        }
    }
}
</style>