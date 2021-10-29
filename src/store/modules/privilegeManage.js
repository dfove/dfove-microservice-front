import AllMeun from '@/router/index.js'

export default {
    state: {
        menuId: '',
        //menuList: [] // 所有菜单
    },
    mutations: {
        // SET_TEMP (state, data) {
        //     // console.log('AllMeun', AllMeun.options.routes)
        //     state.menuList = AllMeun.options.routes
        //     // console.log('state.menuList', state.menuList)
        // },
        // SET_MENULIST(state, data) {
        //     state.menuList = data
        // },
        SET_MENUID(state, id) {
            state.menuId = id
        },
        CLEAR_MENUID(state, id) {
            state.menuId = ''
        }
    },
    actions: {}
}