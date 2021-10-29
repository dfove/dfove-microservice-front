<template>
    <div class="function">
        <h4 class="function__title">
            常用功能 <span @click="setting">设置</span>
        </h4>

        <ul class="function__ul clearfix">
            <li v-for="(item, index) in showList" :key="index">
                <i :class="item.iconfont" style="color: #91cc75"></i>
                <p>{{ item.name }}</p>
            </li>
        </ul>

        <el-dialog
            title="快捷菜单设置"
            :visible.sync="dialogVisible"
            width="720px"
        >
            <el-row>
                <el-col
                    :span="5"
                    :offset="1"
                    v-for="(item, index) in menuList"
                    :key="index"
                    style="margin-bottom: 20px"
                >
                    <h3 style="font-size: 14px; font-weight: bold; padding-bottom: 12px;">
                        {{ item.name }}
                    </h3>
                    <el-checkbox
                        v-for="(item2, index2) in item.children"
                        :label="item2.name"
                        :key="index2"
                        v-model="item2.checked"
                        style="height: 28px; line-height: 28px;"
                        >{{ item2.name }}</el-checkbox
                    >
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" style="text-align: center;">
                <el-button size="small" @click="cancel">取 消</el-button>
                <el-button size="small" type="primary" @click="confirm"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            checked: false,
            showList: [],
            menuList: [
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                    ],
                },
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                    ],
                },
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                    ],
                },
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: true,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-platform-eleme",
                            checked: true,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-platform-eleme",
                            checked: false,
                        },
                    ],
                },
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-platform-eleme",
                            checked: true,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-s-custom",
                            checked: true,
                        },
                    ],
                },
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-s-custom",
                            checked: true,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-s-custom",
                            checked: true,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-s-custom",
                            checked: true,
                        },
                    ],
                },
                {
                    name: "咨询接待",
                    children: [
                        {
                            name: "客户",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "公海客户",
                            iconfont: "el-icon-s-custom",
                            checked: true,
                        },
                        {
                            name: "垃圾客户",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "数据分析",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                        {
                            name: "CRM设置",
                            iconfont: "el-icon-s-custom",
                            checked: false,
                        },
                    ],
                },
            ],
        };
    },
    mounted () {
        this.confirm()
    },
    methods: {
        setting() {
            this.dialogVisible = true;
        },
        confirm () {
            let temp = []
            this.menuList.forEach(item => {
                temp.push(...item.children)
            })
            this.showList = temp.filter(item => item.checked)
            this.dialogVisible = false;
        },
        cancel () {
            this.dialogVisible = false
        }
    },
};
</script>

<style lang="scss" scoped>
.function {
    border-radius: 2px;
    &__title {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        height: 54px;
        line-height: 54px;
        padding: 0 10px;
        background-color: white;
        margin-bottom: 30px;
        span {
            font-weight: normal;
            color: #559d75;
            font-size: 15px;
            cursor: pointer;
        }
    }
    &__ul {
        li {
            float: left;
            width: 20%;
            text-align: center;
            i {
                font-size: 28px;
            }
            p {
                font-size: 14px;
                padding: 8px 0 30px;
            }
        }
    }
}
</style>