export default {
    state: {
        cleaningId: ''
    },
    mutations: {
        SET_CLEANING_ID(state, data) {
            state.cleaningId = data
        }
    }
}