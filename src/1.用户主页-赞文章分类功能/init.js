// 此文件是处理页面加载之后的一些列事情（点击之前的事情）
import { getData } from './http'

// 创建 点赞文章分类 div
export const createMoreItem = () => {
    let selectItems = document.querySelectorAll('.nav-item.not-in-scroll-mode .more-panel .more-item')
    let newA = selectItems[1].cloneNode() // 赋值节点
    newA.attributes.removeNamedItem('href') // 删除掉href跳转，因为就当个触发器使用
    newA.id = 'jSort'
    newA.innerText = '文章分类'
    selectItems[1].parentNode.appendChild(newA)
}

// 监听点击事件
export const eventBus = () => {
    let jSort = document.getElementById('jSort')
    jSort.addEventListener('click', async event => {
        let dialogId = document.getElementById('dialogId')
        if (dialogId) { // 已经点击过分类查看了，只是隐藏到了，这里避免重复拿取，浪费性能
          dialogId.style.display = 'inline';
        } else {
          let userId = location.pathname.match(/\w{24}/)[0]
          let res = await getData(userId) // 获取数据
          createDOM(res) // 创建展示数据的DOM层
        }
    })
}