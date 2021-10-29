
import { getUserInfo } from "@/api/public";

export default {
    refresh_token({ commit, state }) {},
    // 获取个人信息
    user_info({ commit, state }) {
        getUserInfo().then(res => {
            localStorage.setItem("USER_INFO", JSON.stringify(res.data));
            commit("SET_USERINFO", res.data);
        })
    },

    // 获取机构
    get_organization({ commit, state }, params = {}) {
        let data = {
            groupParentId: 0,
            ...params
        };
        // return new Promise((resolve, reject) => {
        //     axios
        //         .post(
        //             `${baseUrl.admin}/organization/search`, {
        //                 data
        //             }, {
        //                 headers: {
        //                     Authorization: "Bearer " + " " + state.token,
        //                     "Content-Type": "application/json"
        //                 }
        //             }
        //         )
        //         .then(res => {
        //             if (res.code === "200") {
        //                 resolve(res.data);
        //             }
        //         })
        //         .catch(error => {});
        // });
    },

    // 获取通知的数据
    inform_data({ commit, state }, type) {
        let params = {
            data: {
                status: 0,
                messageType: type
            },
            orderBy: "status asc, message_time desc"
        };
        // return new Promise((resolve, reject) => {
        //     axios
        //         .post(`${baseUrl.datacenter}/message/search/page`, params, {
        //             headers: {
        //                 Authorization: "Bearer " + " " + state.token,
        //                 "Content-Type": "application/json"
        //             }
        //         })
        //         .then(res => {
        //             switch (type) {
        //                 case "prediction":
        //                     commit("SET_NEWS_COUNT", res);
        //                     break;
        //                 case "clueprogress":
        //                     commit("SET_INFORM_COUNT", res);
        //                     break;
        //                 case "clueCollectionDetails":
        //                     break;
        //                 default:
        //                     break;
        //             }
        //             resolve(res);
        //         })
        //         .catch(error => {});
        // });
    }
};