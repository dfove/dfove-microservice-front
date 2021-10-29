<template>
    <div class="notice">
        <h4 class="module__title">通知公告 <span>更多</span></h4>
        <a
        class="notice__link"
            v-for="(item, i) in dataList"
            :key="i"
            href="https://element.eleme.io"
        >
            <el-row
                style="height: 38px; line-height: 38px"
                type="flex"
                justify="space-between"
            >
                <el-col :span="16">{{ item.title }} {{ item.content }}</el-col>
                <el-col :span="8" align="right">{{ item.dateTime }}</el-col>
            </el-row>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: [
                {
                    title: "【放假通知】",
                    content: "五一放假通知",
                    dateTime: "2021-07-06",
                },
                {
                    title: "【员工培训】",
                    content: "销售部全体员工培训",
                    dateTime: "2021-07-06",
                },
                {
                    title: "【部门会议】",
                    content: "高层领导会议",
                    dateTime: "2021-07-06",
                },
                {
                    title: "【团建活动】",
                    content: "全体员工年度旅游度假",
                    dateTime: "2021-07-06",
                },
                {
                    title: "【生日会】",
                    content: "3月份员工生日会",
                    dateTime: "2021-07-06",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.module {
    background-color: white;
    border-radius: 2px;
    margin-bottom: 30px;
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
}
.notice {
    &__link {        
        &:hover {
            color: red;
        }
    }
}
</style>