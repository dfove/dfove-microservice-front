<template>
    <div class="module">
        <h4 class="module__h4">老人生日</h4>
        {{ currentDate.month }}
        <div class="week">
            <div
                class="week__list"
                v-for="(item, index) in currentDate.weekData"
                :key="index"
            >
                <p class="week__title">{{ item.name }}</p>
                <p class="week__num">{{ item.num }}</p>
            </div>
        </div>
        <div>
            <el-carousel :interval="5000" arrow="always" height="80px" :autoplay="false">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentDate: {
                month: "",
                weekData: [
                    {
                        name: "一",
                        num: 17,
                    },
                    {
                        name: "二",
                        num: 18,
                    },
                    {
                        name: "三",
                        num: 19,
                    },
                    {
                        name: "日",
                        num: 20,
                    },
                    {
                        name: "四",
                        num: 21,
                    },
                    {
                        name: "五",
                        num: 22,
                    },
                    {
                        name: "六",
                        num: 23,
                    },
                    {
                        name: "日",
                        num: 16,
                    },
                ],
            },
            oneWeek: [],
        };
    },
    mounted() {
        this.setWeekDay();
    },
    methods: {
        setWeekDay() {
            this.getWeekDay();
            this.oneWeek.forEach((item, index) => {
                this.currentDate.weekData[index].num = item;
            });
        },
        // 格式化日期
        formatDate(date) {
            date = new Date(date);
            let myyear = date.getFullYear();
            let mymonth = date.getMonth() + 1;
            let myweekday = date.getDate();
            // mymonth < 10 ? (mymonth = "0" + mymonth) : mymonth;
            // myweekday < 10 ? (myweekday = "0" + myweekday) : myweekday;
            this.oneWeek.push(myweekday);
            return `${myyear}-${mymonth}-${myweekday}`;
        },
        getWeekDay() {
            let date = new Date();
            let myyear = date.getFullYear();
            let mymonth = date.getMonth() + 1;
            this.currentDate.month = `${myyear}-${mymonth}`;

            let dateString = this.formatDate(new Date()); //当天的日期，例如2020-2-28
            let presentDate = new Date(dateString);
            let today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;
            this.oneWeek = [];
            Array.from(new Array(7), (val, index) => {
                this.formatDate(
                    new Date(
                        presentDate.getTime() -
                            (today - index - 1) * 24 * 60 * 60 * 1000
                    )
                );
            });
        },
    },
};
</script>

<style lang="scss" scoped>

.module {
    background: white;
    padding: 20px;
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
.week {
    display: flex;
    &__list {
        flex: 1;
        text-align: center;
        p {
            padding-bottom: 20px;
        }
    }
}
</style>