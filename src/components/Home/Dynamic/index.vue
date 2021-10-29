<template>
    <div class="module">
        <h4 class="module__h4">
            实时动态 <span>更新时间：</span>
            <span>2021-04-30 18:53:35</span>
        </h4>
        <div style="margin-top: 30px;">
            <el-row>
            <el-col :span="4" v-for="(item, i) in dynamicData" :key="i">
                <div class="box">
                    <div class="box__l"></div>
                    <div class="box__r">
                        <p class="box__r__name">{{ item.name }}</p>
                        <p class="box__r__value">{{ item.value }} <i>人</i></p>
                    </div>
                </div>
            </el-col>
        </el-row>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            dynamicList: [
                {
                    key: "a1",
                    name: "今日新增用户",
                    value: 80,
                },
                {
                    key: "a2",
                    name: "今日试住",
                    value: 20,
                },
                {
                    key: "a3",
                    name: "今日入住",
                    value: 10,
                },
                {
                    key: "a4",
                    name: "今日退住",
                    value: 8,
                },
                {
                    key: "a5",
                    name: "今日探视",
                    value: 95,
                },
                {
                    key: "a5",
                    name: "今日外出",
                    value: 95,
                },
            ],
        };
    },
    computed: {
        dynamicData() {
            let temp = {
                a1: 80,
                a2: 6,
                a3: 110,
                a4: 35,
                a5: 93,
                a5: 866,
            };
            return this.dynamicList.map((item) => {
                item.value = temp[item.key];
                return item;
            });
        },
    },
};
</script>

<style lang="scss" scoped>

.module {
    border-radius: 2px;
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
}

.box {
    display: flex;
    justify-content: center;
    align-items: center;
    &__l {
        width: 75px;
        height: 75px;
        background-color: #f2f2f2;
        border-radius: 4px;
        margin-right: 20px;
    }
    &__r {
        &__name {
            font-size: 14px;
            padding: 5px 0 15px;
        }
        &__value {
            font-size: 28px;
            font-weight: bold;
            i {
                font-weight: normal;
                font-size: 14px;
                font-style: normal;
            }
        }
    }
}
</style>