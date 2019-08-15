import { createMoreItem,  eventBus } from './init'

/**
 * 页面加载监听函数
 */
export const init = () => {
    
    // 实现一个简单的路由监听（监听跳转是否是主页）
    window.addEventListener('load', function (e) {
        var reg = /https:\/\/juejin.im\/user/;
        if (reg.test(e.target.URL)) { // 如果进入主页，触发
            createMoreItem() // 创建DOM
            eventBus() // 绑定事件
        }; 
    })

}

init()