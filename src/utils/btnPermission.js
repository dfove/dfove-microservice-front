// import Vue from 'vue'

// /**权限指令**/
// const has = Vue.directive('has', {
//         bind: function(el, binding, vnode) {
//             // 获取页面按钮权限
//             let btnPermissionsArr = vnode.context.$route.meta.btnPermissions
//             if (!Vue.prototype.$_has(btnPermissionsArr)) {
//                 if (el.parentNode) {
//                     el.parentNode.removeChild(el)
//                 }
//             }
//         }
//     })
//     // 权限检查方法
// Vue.prototype.$_has = function(value) {
//     console.log('需要的权限', value)
//     let isExist = false
//         // 获取用户按钮权限
//     let btnPermissionsStr = JSON.parse(sessionStorage.getItem("btnPermissions"))
//     if (btnPermissionsStr == undefined || btnPermissionsStr == null) {
//         return false
//     }
//     // for (let i = 0; i < btnPermissionsStr.length; i++) {
//     //     if (btnPermissionsStr[i].perms.indexOf(value) > -1) {
//     //         isExist = true
//     //         break
//     //     }
//     // }
//     // return isExist
//     if (value.indexOf(btnPermissionsStr) > -1) {
//         isExist = true
//     }
//     return isExist
// }
// export { has }



import Vue from 'vue'
/**权限指令**/
Vue.directive('has', {
        bind: function(el, binding) {
            // debugger
            if (!Vue.prototype.$_has(binding.value)) {
                setTimeout(() => el.parentNode.removeChild(el))
                    // if(el.parentNode!=null){
                    //   setTimeout(() => console.log(el.parentNode))
                    //   el.parentNode.removeChild(el);        
                    // }
            }
        }
    })
    //权限检查方法
Vue.prototype.$_has = function(value) {
    // debugger
    let isExist = false
    let buttonpermsStr = JSON.parse(sessionStorage.getItem("btnPermissions"))
    if (buttonpermsStr == undefined || buttonpermsStr == null) {
        return false
    }
    for (let i = 0; i < buttonpermsStr.length; i++) {
        if (value == buttonpermsStr[i]) {
            isExist = true
            break
        }
    }
    return isExist
}