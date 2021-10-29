<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.open4();
    },
    methods: {
        open4() {
            this.$notify({
                title: "超时警告",
                dangerouslyUseHTMLString: true,
                position: "bottom-right",
                iconClass: 'el-icon-platform-eleme',
                onClick: function () {
                    alert(0);
                },
                message: "<div>张卫国，吃药时间已超时10分钟</div>",
            });
            // this.$notify({
            //     title: "自定义位置",
            //     message: "左上角弹出的消息",
            //     type: 'success',
            //     position: "bottom-right",
            //     onClick: function () {
            //         alert(0)
            //     }
            // });
        },
    },
};
</script>