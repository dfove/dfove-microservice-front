import axios from "axios";
// import baseUrl from "@/config/baseUrl";
import { Promise } from "core-js";

export default {
    state: {
        taskNull: true,
        resourceType: {
            // "4000": {
            //     name: "所有资源",
            //     type: 4000,
            //     listId: "",
            //     getList: `${baseUrl.datacenter}`
            // },
            // "4001": {
            //     name: "案件信息",
            //     type: 4001,
            //     listId: "caseUuids",
            //     getList: `${baseUrl.datacenter}/case/search/page`,
            //     getDetails: `${baseUrl.datacenter}/case/id/`
            // },
            // "4002": {
            //     name: "许可证用户",
            //     type: 4002,
            //     listId: "licNos",
            //     getList: `${baseUrl.datacenter}/retail/search/page`,
            //     getDetails: `${baseUrl.datacenter}/retail/id/`
            // },
            // "4003": {
            //     name: "涉案人员",
            //     type: 4003,
            //     listId: "partyUuids",
            //     getList: `${baseUrl.datacenter}/caseperson/search/page`,
            //     getDetails: `${baseUrl.datacenter}/caseperson/id/`
            // },
            // "4005": {
            //     name: "涉烟物流点部",
            //     type: 4005,
            //     listId: "ids",
            //     getList: `${baseUrl.datacenter}/expresspoint/search/page`,
            //     getDetails: `${baseUrl.datacenter}/expresspoint/id/`
            // },
            // "4006": {
            //     name: "涉烟快递人员",
            //     type: 4006,
            //     listId: "ids",
            //     getList: `${baseUrl.datacenter}/expressrider/search`,
            //     getDetails: `${baseUrl.datacenter}/expressrider/id/`
            // },
            // "4007": {
            //     name: "涉案物品",
            //     type: 4007,
            //     listId: "goodsDtlUuids",
            //     getList: `${baseUrl.datacenter}/casegoods/search/page`,
            //     getDetails: `${baseUrl.datacenter}/casegoods/id/`
            // },
            // "4101": {
            //     name: "涉烟寄递信息",
            //     type: 4101,
            //     listId: "ids",
            //     getList: `${baseUrl.datacenter}/casepersonexpress/search/page`,
            //     getDetails: `${baseUrl.datacenter}/casepersonexpress/id/`
            // },
            // "4102": {
            //     name: "跨区倒卖",
            //     type: 4102,
            //     listId: "ids",
            //     getList: `${baseUrl.datacenter}/retailresell/search/page`,
            //     getDetails: `${baseUrl.datacenter}/retailresell/id/`
            // },
            // "4103": {
            //     name: "制假售假",
            //     type: 4103,
            //     listId: "ids",
            //     getList: `${baseUrl.datacenter}/casepersonfake/search/page`,
            //     getDetails: `${baseUrl.datacenter}/casepersonfake/id/`
            // },
            // "4104": {
            //     name: "涉烟宣传",
            //     type: 4104,
            //     listId: "ids",
            //     getList: `${baseUrl.datacenter}/casepersonpropaganda/search/page`,
            //     getDetails: `${baseUrl.datacenter}/casepersonpropaganda/id/`
            // }
            // '4105': { name: '涉烟网络搜索', type: 4105, listId: 'ids', getList: `${baseUrl.datacenter}/casepersonwebsearch/search/page`, getDetails: `${baseUrl.datacenter}/casepersonwebsearch/id/` }
        },
        keywordType: {
            "3000": { name: "全文搜索", id: 3000 },
            "3001": { name: "手机号码", id: 3001 },
            "3002": { name: "身份证", id: 3002 },
            "3003": { name: "许可证号", id: 3003 },
            "3004": { name: "网络账号", id: 3004 }
        },
        detailsParams: [],
        showMode: "list",
        // resourceType: '',
        get taskId() {
            return sessionStorage.getItem("taskId");
        },
        set taskId(v) {
            return sessionStorage.setItem("taskId", v);
        },
        get params() {
            return JSON.parse(sessionStorage.getItem("params"));
        },
        set params(v) {
            return sessionStorage.setItem("params", JSON.stringify(v));
        },
        get businessId() {
            return JSON.parse(sessionStorage.getItem("businessId"));
        },
        set businessId(v) {
            return sessionStorage.setItem("businessId", JSON.stringify(v));
        },
        get getListApi() {
            return sessionStorage.getItem("getListApi");
        },
        set getListApi(v) {
            return sessionStorage.setItem("getListApi", v);
        },
        get getDetailsApi() {
            return sessionStorage.getItem("getDetailsApi");
        },
        set getDetailsApi(v) {
            return sessionStorage.setItem("getDetailsApi", v);
        },
        get totalCount() {
            return sessionStorage.getItem("totalCount");
        },
        set totalCount(v) {
            return sessionStorage.setItem("totalCount", v);
        },
        taskDetailsLoading: 0,
        specialData: [],
        basicsData: []
    },
    mutations: {
        SET_TOTAL_COUNT(state, count) {
            state.totalCount = count
        },
        SET_PARAMS(state, data) {
            state.getListApi = state.resourceType[data[0].resourceType].getList;
            state.getDetailsApi =
                state.resourceType[data[0].resourceType].getDetails;
            state.params = data.map(item => {
                return item.businessId;
            });
        },
        SET_PARAMS2(state, data) {
            state.getListApi = state.resourceType[data[0].resourceType].getList;
            state.getDetailsApi =
                state.resourceType[data[0].resourceType].getDetails;
            state.businessId = data.map(item => {
                return item.businessId;
            });
        },
        SET_SHOW_MODE(state, data) {
            state.showMode = data;
        },
        SET_TASKID(state, id) {
            state.taskId = id;
        },
        CLEAR_SETITEM(state, data) {
            sessionStorage.removeItem("taskId");
            sessionStorage.removeItem("params");
            sessionStorage.removeItem("getListApi");
            sessionStorage.removeItem("getDetailsApi");
            sessionStorage.removeItem("businessId");
        },
        SET_TASKDETAILS_DATA(state, data) {
            state.basicsData = [];
            state.specialData = [];
            data.forEach(item => {
                if (Number(item.resourceType) > 4007) {
                    state.specialData.push(item);
                } else {
                    state.basicsData.push(item);
                }
            });
            // console.log('basicsData', state.basicsData)
            // console.log('specialData', state.specialData)
        },
        PUSH_BASICSDATA(state, data) {
            state.basicsData = data;
        },
        PUSH_SPECIDATA(state, data) {
            state.specialData = data;
        },
        SET_TASK_LOADING(state, data) {
            state.taskDetailsLoading = data;
        },
        CLEAR_BUSINESSID(state, data) {
            state.businessId = data;
        },
        SET_TASK_NULL(state, data) {
            state.taskNull = data;
        }
    },
    actions: {
        getBusinessId({ commit, state }, params) {
            // return new Promise((resolve, reject) => {
            //     axios
            //         .post(`${baseUrl.task}/taskresult/search/page`, params, {
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: "Bearer  " + state.token
            //             }
            //         })
            //         .then(res => {
            //             if (res.code == 200) {
            //                 commit("SET_PARAMS2", res.data);
            //                 resolve(res.data);
            //             }
            //         });
            // });
        },
        getList({ commit, state }, params) {
            // return new Promise((resolve, reject) => {
            //     axios
            //         .post(`${baseUrl.task}/taskresult/search/page`, params, {
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 Authorization: "Bearer  " + state.token
            //             }
            //         })
            //         .then(res => {
            //             if (res.code == 200) {
            //                 commit("SET_PARAMS", res.data);
            //                 resolve(res.data);
            //             }
            //         });
            // });
        }
    }
};