const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const router = new Router
const bodyBody = require('koa-body') // 解析请求体
const cors = require('koa2-cors') // 解决跨域
const { getData } = require('./conller')

app.use(cors())
app.use(bodyBody()) // 解析 请求body中的 JSON

// 路由部分
router.post('/proxy', async (ctx) => {
    console.log(ctx.request.body)
    let data = await getData(ctx.request.body.userId) // 请求数据函数
    // 处理函数
    ctx.body = data
})






app.use(router.routes()) // 注册路由
app.listen(3000, () => console.log(`http://localhost:3000`)) // 启动Node服务


