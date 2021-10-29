<template>
    <div
        id="main"
        style="height: 250px; width: 100%; border-right: 1px solid #d8d8d8"
    ></div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("main"));
            // 绘制图表
            myChart.setOption({
                title: {
                    text: `10项目待处理`,
                    top: "46%",
                    textAlign: "center",
                    left: "48%",
                    textStyle: {
                        color: "#000",
                        fontSize: 22,
                        fontWeight: "400",
                    },
                },
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    top: "5%",
                    left: "center",
                    show: false,
                },
                series: [
                    {
                        type: "pie",
                        radius: ["65%", "85%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "40",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            { value: 1048, name: "搜索引擎" },
                            { value: 735, name: "直接访问" },
                            { value: 580, name: "邮件营销" },
                            { value: 484, name: "联盟广告" },
                            { value: 300, name: "视频广告" },
                        ],
                    },
                ],
            });
        },
    },
};
</script>