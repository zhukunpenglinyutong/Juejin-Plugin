// 此文件用于 测试 1.用户主页-赞文章分类功能

import { createMoreItem, eventBus } from '../src/1.用户主页-赞文章分类功能/init'
import { getData, getTotal, dataHandle} from '../src/1.用户主页-赞文章分类功能/http'
import { entryList } from '../src/1.用户主页-赞文章分类功能/data'

// 集成测试 部分
describe('1️⃣  测试index.js', () => {

})

describe('2️⃣  测试init.js', () => {
    
    
    beforeAll(() => {

        // 模拟一个掘金的DOM结构
        document.body.innerHTML = `
            <div id="app"></div>
            <div class="nav-item not-in-scroll-mode">
                <div class="more-panel">
                    <a data-v-7bbf9a87="" href="/user/5bf38e53518825490e0f764b/likes" class="more-item">文章 148</a>
                    <a data-v-7bbf9a87="" href="/user/5bf38e53518825490e0f764b/praise" class="more-item">沸点 56</a>
                </div>
            </div>
        `
    })

    test('1.文章分类 标签是否正常创建', () => {
        createMoreItem()
        let selectItems = document.querySelectorAll('.nav-item.not-in-scroll-mode .more-panel .more-item')
        let jSort = document.getElementById('jSort')
        expect(jSort).not.toBeNull() // 创建节点成功
        expect(jSort.innerText).toBe('文章分类') // 文字内容正确
        expect(selectItems[2]).toBe(jSort) // 显示位置正确
    })

    test('2.测试点击事件是否正常', () => {
        eventBus()

        // location.href = "https://juejin.im/user/5bf38e53518825490e0f764b"
        // let jSort = document.getElementById('jSort')
        // jSort.click()

        // 测试有 dialogId 层的时候，是否会显示弹出层
        let app = document.getElementById('app')
        app.innerHTML = `<div id="dialogId"></div>`
        let dialogId = document.getElementById('dialogId')
        jSort.click()
        expect(dialogId.style.display).toBe('inline')
    })

})

describe('3️⃣  测试http.js', () => {

    test('1.测试接口发送', () => {
        // getData('5bf38e53518825490e0f764b')
    })

    test('2.Promise.all 拼接的数据是否可以正常得到', async () => {
        let reqData = await getTotal('5bf38e53518825490e0f764b')
        expect(reqData.length).toBeGreaterThan(0) // 请求的数据是否比0大
    })

    test('3.测试数据处理函数是否正常', () => {
        let srcData = dataHandle(entryList)
        expect(srcData.length).toBe(20)
        expect(srcData[0].name).toBe('JavaScript')
        expect(srcData[0].num).toBe(11)
        expect(srcData[0].data.length).toBe(11)
        expect(srcData[19].name).toBe('API')
    })

})

describe('4️⃣  测试dom.js', () => {

})