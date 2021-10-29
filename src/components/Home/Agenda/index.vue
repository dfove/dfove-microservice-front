<template>
    <div>
        <h4 class="module__title">今日待办事项 <span>全部待办事项</span></h4>
        <div class="agenda">
            <div class="agenda__left">
                <Chart />
            </div>
            <div class="agenda__right">
                <Matter />
            </div>
        </div>
    </div>
</template>

<script>
import Matter from "./components/Matter";
import Chart from "./components/Chart";
export default {
    components: {
        Matter,
        Chart,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.module {
    border-radius: 2px;
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
.agenda {
    display: flex;
    align-items: center;
    &__left {
        flex: 0 0 300px;
        margin-right: 60px;
    }
    &__right {
        flex: 1;
    }
}
</style>