let userId = '5bf38e53518825490e0f764b'

let url = `https://user-like-wrapper-ms.juejin.im/v1/user/${userId}/like/entry?page=0&pageSize=30`

console.log('axios', axios)
// 发送API请求
// fetch(`https://user-like-wrapper-ms.juejin.im/v1/user/${userId}/like/entry?page=0&pageSize=30`, {
//     mode: "no-cors",
//     method:"get",
//     headers: new Headers({
//         "X-Juejin-Src": "web"
//     })
// }).then(function(response) {
//     console.log('response', response)
//     return response.text();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });

axios.get(url, {
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        "X-Juejin-Src": "web"
    }
}).then(res => {
    console.log('res', res)
    resolve(res.data.d)
}).catch(e => {
    reject(e)
})

class Zhu {
    
    constructor () {
        
        // 保存 经常使用的DOM节点
        this.$body = document.querySelector('body')

        this.init() // 启动
    }

    // 启动
    init () {
        this.isUserHome() && !this.isCreateDOM() ? this.createDOM() : '';
    }

    /**
     * 核心方法
     */

    // 创建DOM
    createDOM() {
        console.log('是自己的首页，并且没有创建过DOM')

        // 此处用定时器不妥，此处要处理的是，等页面加载完成之后，进行拿取的操作，但是 onload 有时候也是拿不到正常的值
        setTimeout(() => {
            // select item 其中 第一个第二个是赞的 select 内容
            let selectItems = document.querySelectorAll('.nav-item.not-in-scroll-mode .more-panel .more-item')
            
            console.log('selectItems', selectItems)

            let newA = selectItems[1].cloneNode() // 赋值节点
            newA.id = 'jSort'
            newA.innerText = '文章分类'

            selectItems[1].parentNode.appendChild(newA)

            // 启动事件监听（此处因为定时器的原因，具有耦合，但不得不写到这里，否则就需要用Promise异步形式，最终原因还是因为 window.onload 执行后有时候拿不到需要的值）
            this.eventBus()

        }, 100);
    }

    // 管理事件的方法
    eventBus() {
        // 文章分类点击事件
        let jSort = document.getElementById('jSort')
        
        jSort.addEventListener('click', event => {
            
            console.log('触发了', this)

            // // 删除DOM节点
            // let listBosy = document.querySelector('.list-body')
            // // listBosy.parentNode.removeChild(listBosy)
            // listBosy.innerHTML = ''

            // 创建DOM节点
            
            // 拿数据

            // 处理数据

            // 渲染数据


            event.preventDefault();
            return false
        })

    }



    /**
     * 工具方法
     */

    // 判断当前页面是否是用户的个人首页
    isUserHome () {
        return new RegExp(userId).test(location.href)
    }

    // 判断是否创建过插件DOM了
    isCreateDOM () {
        return document.querySelectorAll('.nav-item.not-in-scroll-mode .more-panel .more-item') > 4
    }

}

window.onload = function(){ 
    // 下面节点有时候为空，导致我需要使用定时器来保证节点的正常添加
    // console.log('页面加载完成', document.querySelectorAll('.nav-item.not-in-scroll-mode .more-panel .more-item'))
    let zhu = new Zhu()
} 


// // 获取用户
// chrome.storage.local.set({userId}, function() {
//     if (userId === '5bf38e53518825490e0f764b') { // 表示是自己，然后就需要执行创建DOM等操作了

//     }
//     console.log('当前用户的ID是' + userId);
//     console.log('chrome.storage2', chrome.storage)
// });

// window.chrome = chrome

// console.log('chrome.storage1', chrome.storage.get())


// let userId = location.href.split('user/')[1]
// console.log('userId', userId)

// fetch('./juejin.txt')
//   .then(function(response) {
//     console.log('response', response)
//     return response.text();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });


