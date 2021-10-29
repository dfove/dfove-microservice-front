import axios from 'axios'
// import baseUrl from '@/config/baseUrl'
export default {
    state: {
        roleId: "",
        activeName: "",
        superAdmin: 0,
        roleType: 0
    },
    mutations: {
        SET_ROLEID(state, data) {
            state.roleId = data.roleId;
            state.roleType = data.type;
            state.superAdmin = data.superAdmin;
        },
        CLEAR_ROLEID(state, roleId) {
            state.roleId = "";
            state.roleType = 0;
            state.superAdmin = 0;
        },
        SET_PRIVILEGELIST(state, data) {
            state.privilegeList = data;
        },
        SET_ACTIVENAME(state, name) {
            state.activeName = name;
        }
    },
    actions: {
        // getDefaultPrivilege({ commit, state }, data) {
        //     commit('SET_ROLEID', data)
        //     axios.post(`${baseUrl.admin}/rolepermission/search/extends`, {
        //         data: {
        //             roleId: data.roleId
        //         }
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer  ' + state.token
        //         }
        //     }).then(res => {
        //         if (res.code === '200') {
        //             commit('SET_PRIVILEGELIST', res.data)
        //         }
        //     }).catch(error => {})
        // }
    }
};