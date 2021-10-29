import router from '@/router'
export default {
    state: {
        checkInParams: '',
        checkInContract: ''
    },
    mutations: {
        currentRegister (state, v) {
            let temp = router.history.current.params.name
            if(v == '合同' && temp == '试住登记') {
                state.checkInContract = '试住'
                return '试住'
            }
            if(v == '合同' && temp == '入住登记') {
                state.checkInContract = '入住'
                return '入住'
            }
            if(v == '日' && temp == '试住登记') {
                state.checkInParams = '日'
                return '日'
            } else {
                state.checkInParams = '月'
                return '月'
            }
        }
    }
}