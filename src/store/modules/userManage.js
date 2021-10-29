export default {
    state: {
        adminId: ''
    },
    mutations: {
        SET_ADMINID(state, id) {
            state.adminId = id
        },
        CLEAR_ADMINID(state, id) {
            state.adminId = ''
        }
    }
}