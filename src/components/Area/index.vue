<template>
    <div class="tempDiv">
        <ul class="title">
            <li
                v-if="tempList['provinces']"
                :class="{ active: tempSpan == 'provinces' }"
                @click="tempProvinces(tempList['provinces'])"
            >
                {{ tempList["provinces"]["name"] }} <i class="el-icon-arrow-down"></i>
            </li>
            <li
                v-if="tempList['cities']"
                :class="{ active: tempSpan == 'cities' }"
                @click="tempCities(tempList['cities'])"
            >
                {{ tempList["cities"]["name"] }} <i class="el-icon-arrow-down"></i>
            </li>
            <li
                v-if="tempList['areas']"
                :class="{ active: tempSpan == 'areas' }"
                @click="tempAreas(tempList['areas'])"
            >
                {{ tempList["areas"]["name"] }} <i class="el-icon-arrow-down"></i>
            </li>
        </ul>
        <div class="content" v-if="tempSpan == 'provinces'">
            <span
                v-for="(item, i) in tempContent"
                :key="i"
                :title="item.name"
                :class="{ active: item.code == tempList['provinces'].code }"
                @click="tempProvinces2(item)"
                >{{ item.name }}</span
            >
        </div>
        <div class="content" v-if="tempSpan == 'cities'">
            <span
                v-for="(item, i) in tempContent"
                :key="i"
                :title="item.name"
                :class="{
                    active: tempList['cities']
                        ? item.code == tempList['cities'].code
                        : false,
                }"
                @click="tempCities2(item)"
                >{{ item.name }}</span
            >
        </div>
        <div class="content" v-if="tempSpan == 'areas'">
            <span
                v-for="(item, i) in tempContent"
                :key="i"
                :title="item.name"
                :class="{
                    active: tempList['areas']
                        ? item.code == tempList['areas'].code
                        : false,
                }"
                @click="tempAreas2(item)"
                >{{ item.name }}</span
            >
        </div>
    </div>
</template>

<script>
let provinces = require(`./data/provincesUnit.json`);
let cities = require(`./data/cities.json`);
let areas = require(`./data/areas.json`);

export default {
    props: {
        a: {
            type: String,
            default: ''
        },
        b: {
            type: String,
            default: ''
        },
        c: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tempList: {
                provinces: {
                    code: "44",
                    name: "广东省",
                },
                cities: {
                    code: "4403",
                    name: "深圳市",
                },
                areas: {
                    code: "440305",
                    name: "南山区",
                },
            },
            tempContent: [],
            tempSpan: "provinces",
        };
    },
    mounted() {        
        provinces.filter(item => {
            if(this.a == item.name) {
                this.$set(this.tempList, "provinces", item);
            }
        })
        cities.filter(item => {
            if(this.b == item.name) {
                this.$set(this.tempList, "cities", item);
            }
        })
        areas.filter(item => {
            if(this.c == item.name) {
                this.$set(this.tempList, "areas", item);
            }
        })

        console.log(this.tempList)
        this.tempContent = provinces;
    },
    methods: {
        tempProvinces(item) {
            if (!item.name || !item.code) return;
            this.tempSpan = "provinces";
            this.tempContent = provinces;
            this.$set(this.tempList, "provinces", item);
        },        
        tempCities(item) {
            if (!item.name || !item.code) {
                this.tempSpan = "cities";
                this.tempContent = cities.filter((v) => this.tempList['provinces'].code == v.provinceCode);
                return
            };
            this.tempSpan = "cities";
            this.$set(this.tempList, "cities", item);
            this.tempContent = cities.filter(
                (v) => item.provinceCode == v.provinceCode
            );
        },
        tempAreas(item) {
            if (!item.name || !item.code) {
                this.tempSpan = "areas";
                this.tempContent = areas.filter((v) => this.tempList['cities'].code == v.cityCode);
                return
            };
            this.tempSpan = "areas";
            this.$set(this.tempList, "areas", item);
            this.tempContent = areas.filter((v) => item.cityCode == v.cityCode);
        },
        tempProvinces2(item) {
            this.tempSpan = "cities";
            this.tempContent = cities.filter(
                (v) => item.code == v.provinceCode
            );
            this.$set(this.tempList, "provinces", item);
            this.$set(this.tempList, "cities", {
                name: "请选择",
                code: "",
            });
            delete this.tempList["areas"];
        },
        tempCities2(item) {
            this.tempSpan = "areas";
            this.$set(this.tempList, "cities", item);
            this.tempContent = areas.filter((v) => item.code == v.cityCode);
            this.$set(this.tempList, "areas", {
                name: "请选择",
                code: "",
            });
        },        
        tempAreas2(item) {
            this.tempSpan = "areas";
            this.$set(this.tempList, "areas", item);
            console.log("this.tempList", this.tempList);
        },

        tempTitle(item) {
            this.tempList[this.tempTitle] = item;
            switch (this.tempTitle) {
                case "provinces":
                    delete this.tempList["cities"];
                    delete this.tempList["areas"];
                    break;
                case "cities":
                    delete this.tempList["areas"];
                    break;
                case "areas":
                    break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.tempDiv {
    width: 100%;
    .title {
        display: flex;
        color: #000;
        border-bottom: 2px solid #409eff;
        & > li {
            padding: 6px 10px;
            margin-bottom: -2px;
            min-width: 60px;
            margin-left: 10px;
            border: 2px solid transparent;
            font-size: 13px;
            max-width: 200px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:hover {
                color: #409eff;
                cursor: pointer;
            }
            &.active {
                color: #2382e4;
                border: 2px solid #409eff;
                border-bottom: 0;
                background: white;
                border-radius: 3px 3px 0 0;
                box-shadow: 1px 2px 2px #bbdcff inset;
            }
        }
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        transition: all 0.3s;
        padding: 10px;
        & > span {
            padding: 5px 8px;
            flex: 0 0 25%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 13px;
            &:hover {
                color: #409eff;
                transition: all 0.3s;
                cursor: pointer;
            }
            &.active {
                color: #409eff;
            }
        }
    }
}
</style>