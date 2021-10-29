<template>
    <div class="matter">
        <el-row
            class="matter__row"
            type="flex"
            justify="space-between"
            v-for="(item, i) in agendaList"
            :key="i"
        >
            <el-col :span="20" class="matter__left"><p><span class="matter__type">【{{ item.name }}】</span> {{ item.content }}</p></el-col>
            <el-col :span="4" class="matter__right" align="center" style="color: #559d75;"><p>立即办理</p></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            agendaList: [
                {
                    type: 'a',
                    name: '咨询接待',
                    content: '客户【张三】已超过4天未跟进，请及时处理。'
                },
                {
                    type: 'b',
                    name: '咨询接待',
                    content: '线索客户【赵黎明】超过3天未被领取/分配，请及时处理。'
                },
                {
                    type: 'c',
                    name: '退住管理',
                    content: '张卫国已完成退住结算，未办理退住登记。'
                },
                {
                    type: 'd',
                    name: '用药任务',
                    content: '安岳山08:30服药已超时10分钟，请立即处理。'
                },
                {
                    type: 'e',
                    name: '入住管理',
                    content: '李梅老人已成功办理入住，入住费用暂时未缴纳。'
                },
                {
                    type: 'f',
                    name: '欠费管理',
                    content: '张卫国老人5月费用未进行缴费。'
                }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
.matter {
    font-size: 15px;
    &__row {
        padding: 14px 0;
    }
    &__left {
        p {
            width: 100%;
            overflow-y: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }        
    }
    &__right {
        white-space: nowrap;
        p {
            width: 100%;
            overflow-y: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    &__type {
        font-weight: bold;
    }
}
</style>