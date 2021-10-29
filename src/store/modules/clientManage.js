import router from '@/router'
export default {
    state: {
        currentForm: {}, //客户详情 请求值

        rulesForm: {
            address: "",
            birthday: "",
            clientClassify: 1,
            consultingDate: "",
            consultingIntention: 1,
            consultingWay: 1,
            labelList: [],
            mail: "",
            name: "",
            organizationId: "",
            phone: "",
            qq: "",
            remark: "",
            sex: 1,
            source: 1,
            type: 1,
            wechat: "",
            belonger: "",
            clientRelation: {
                agedAddress: "",
                age: "",
                agedBirthday: "",
                clientId: "",
                idCard: "",
                agedName: "",
                organizationId: "",
                agedPhone: "",
                realtion: "",
                selfcare: 1,
                agedSex: 1,
                agedType: 1,
            },
        }, //客户详情 表单值

        isEditClient: false, //是否处于编辑客户信息状态

        folloWObject: {}, //跟进列表根据时间分类

        followDateList: [], //跟进列表分类key值数组
        
    },
    mutations: {
        SET_Current_Form(state, data) {
            state.currentForm = data
        },
        SET_Rules_Form(state, data) {
            state.rulesForm = data
        },
        SET_Is_Edit_Client(state, data) {
            state.isEditClient = data
        },
        SET_FolloW_Object(state, data) {
            state.folloWObject = data
        },
        SET_FolloW_Date_List(state, data) {
            state.followDateList = data
        },
    }
}