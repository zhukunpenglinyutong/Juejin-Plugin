const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const router = new Router
const bodyBody = require('koa-body')
const cors = require('koa2-cors')
const { dataReq } = require('./logic')

app.use(cors()) // 解决跨域问题
app.use(bodyBody()) // 解析 请求body中的 JSON

// 路由部分（就一个接口，就不搞什么分层结构了，逻辑写到logic.js）
router.post('/proxy', async (ctx) => {
    ctx.body = await dataReq.getData(ctx.request.body.userId) // 请求数据函数
})

app.use(router.routes()) // 注册路由
app.listen(3000, () => console.log(`http://localhost:3000`)) // 启动Node服务


