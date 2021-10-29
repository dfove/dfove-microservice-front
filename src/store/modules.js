/* 读取./moudles下的*.js文件并注册到Module */
const requireModule = require.context('./modules', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
    const moduleName = fileName.replace(/(\.\/|\.js)/g, '')

    modules[moduleName] = {
        namespaced: true,
        ...requireModule(fileName).default
    }
})
export default modules
