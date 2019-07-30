// 实现一个简单的路由监听（监听跳转是否是主页）
window.addEventListener('load', function (e) {
    var reg = /https:\/\/juejin.im\/user/;
    if (reg.test(e.target.URL)) createDom(); // 如果进入主页，触发
})

function createDom () {
    console.log('触发')

    // 这里用定时器是为了放到宏队列中，最后执行，因为不知道掘金怎么整的，页面都加载完了，还是获取不到赞下面的DOM，估计用了Vue异步加载了
    setTimeout(() => {

        let selectItems = document.querySelector('.more-panel')

        let div = document.createElement('div')
        div.id = 'jApp'
        div.innerHTML = `
        <el-button @click="click">分类查看</el-button>
        <el-dialog :visible.sync="visible" title="点赞分类">
            <div v-loading="loading">
                <div class="lang">
                    <template v-for="(item, index) in data">
                        <el-badge :value="item.num" class="item">
                            <el-button :type="clickIndex === index ? 'primary' : ''" @click="clickBtn(item.data, index)" size="small">{{item.name}}</el-button>
                        </el-badge>
                    </template>
                </div>
                <div class="mian">
                    <template v-for="item in clickData">
                        <div class="mian-item">
                            <div class="meta-row">
                                <a :href="item.objectId">{{item.username}}</a> ·
                                <template v-for="tag in item.tags">
                                    <a href="javascript:;">{{tag}} · </a>
                                </template>
                            </div>
                            <div class="title"><a :href="item.originalUrl">{{item.title}}</a></div>
                        </div>
                    </template>
                </div>
            </div>
        </el-dialog>
        `
        selectItems.appendChild(div)
    
        new Vue({
            el: '#jApp',
            data: function() {
              return { 
                  visible: false,
                  loading: true,
                  data: null, // 全部数据
                  clickData: null,
                  clickIndex: 0,
              }
            },
            mounted () {
                this.$message.success('DOM加载成功')
            },
            methods: {
              click () {
                  let userId = location.pathname.match(/\w{24}/)[0]
                  this.visible = true
                  axios.post('http://localhost:3000/proxy', { userId: userId}).then(res => {
                      this.loading = false
                      this.clickData = res.data[0].data
                      this.data = res.data
                  }).catch(e => {
                    console.log('出错：', e)
                  })
              },
              clickBtn (data, index) {
                this.clickIndex = index
                this.clickData = data
              }
            }
        })
    }, 500);    
}