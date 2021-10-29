<template>
    <div class="module">
        <h4 class="module__title">院内统计 </h4>
        <el-row style="line-height: 80px;">
            <el-col :span="8" align="center" v-for="(item, i) in statisticsList" :key="i"><span>{{item.name}}： {{item.value}}</span> 人</el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            statisticsList: [
                {
                    name: '在住老人',
                    value: 532
                },
                {
                    name: '试住老人',
                    value: 26
                },
                {
                    name: '入住率',
                    value: '70%'
                },
                {
                    name: '院内床位',
                    value: 832
                },
                {
                    name: '空闲床位',
                    value: 365
                },
                {
                    name: '护工人数',
                    value: 126
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.module {
    border-radius: 2px;
    margin-bottom: 30px;
    background-color: white;
    padding: 20px;
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
</style>