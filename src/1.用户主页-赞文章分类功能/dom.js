// ============================================================================================
// ========================= DOM生成层，根据数据生成对应的弹出层和交互  =============================
// ============================================================================================

export const createDOM = (res) => {
    
    globalData = res
  
    // 响应式监听属性，响应点击标签时候的视图切换
    let observeData = {
        select: '' // 当前选中的分类名称
    }
  
    renderBasic() // 渲染弹出框基本结构
    defineReactive(observeData, 'select', observeData.select) // 监听响应式
    observeData.select = res[0].name // 初始化，渲染第一个分类中的数据
    createDOMEventBus(observeData) // 启动事件监听
  }
  
  // 渲染弹出框基本结构
  export const renderBasic = () => {
  
    let dialogMianItem = '' // 根据数据，生成底部导航栏结构
    globalData.forEach( item => {
      dialogMianItem += `<div class="dialog-mian-item" style="position: relative;margin-right: 25px;">
                <button class="dialogBtn" style="padding: 9px 15px;font-size: 12px;border-radius: 3px;min-width: 100px;">${item.name}</button>
                <sup style="position: absolute;top: 0;right: 10px;transform: translateY(-50%) translateX(100%);background-color: #f56c6c;border-radius: 10px;color: #fff;display: inline-block;font-size: 12px;height: 18px;line-height: 18px;padding: 0 6px;text-align: center;white-space: nowrap;">
                  ${item.num}
                </sup>
              </div>`
    })
  
  
    // 创建弹出层
    let div = document.createElement('div')
    div.id = 'dialogId'
    // 模板中展示的内容
    div.innerHTML = `
      <div class="dialog"
        style="margin: 15vh auto 50px;width: 60vw;height: 600px;background: #fff;opacity: 1;border-radius: 2px;box-shadow: 0 1px 3px rgba(0,0,0,.3);box-sizing: border-box;">
        <div class="dialog-header" style="padding: 20px 20px 10px;line-height: 24px;font-size: 18px;color: #303133;margin-bottom: 15px;display: flex;justify-content: space-between;">
          <div>文章分类 <input style="margin-left: 10px;" disabled value="搜索功能8.1日开放" /> </div>
          <div id="dialog-close" style="cursor: pointer;">X</div>
        </div>
        <div class="dialog-mian">
          <div class="dialog-mian" style="padding: 0 22px;">
            <div class="dialog-mian-lang" style="display: flex;justify-content: space-between;padding-top: 12px;overflow-y: auto;">${dialogMianItem}</div>
            <div class="dialog-content" style="margin-top: 10px;height: 430px;overflow-y: auto;">
  
            </div>
          </div>
        </div>
      </div>
    `
    let body = document.querySelector('body')
    div.style = `position: fixed;height: 100vh;width: 100vw;top: 0;left: 0;z-index: 1000;`
    body.appendChild(div)
  }
  
  // 生成详细文章列表
  export const createDialogContent = (selectName) => {
  
    let randerData = globalData.filter( item => item.name === selectName)[0].data
    let dialogContent = document.querySelector('.dialog-content')
  
    let dialogContentText = ''; // 具体一行行内容
    // 当前点击展示的内容
    randerData.forEach(item => {
        let aStr = ''
        item.tags.forEach( tag => {
          aStr += `<a href="javascript:;">${tag} · </a>`
        })
        dialogContentText += `
                  <div class="dialog-content_item" style="margin: 18px 0px;border-bottom: 1px solid rgba(178,186,194,.15);">
                     <div class="meta-row">
                        <a href="${item.objectId}">${item.username}</a> · ${aStr}
                     </div>
                     <div class="title" style="margin-top: 6px;"><a href="${item.originalUrl}" style="font-size: 16px;color: #2E3135;">${item.title}</a></div>
                  </div>`
    })
  
    dialogContent.innerHTML = dialogContentText
  }
  
  // 事件总线
  export const createDOMEventBus = (observeData) => {
    // 点击切换事件（采用事件冒泡，进行捕获）
    let btns = document.querySelector('.dialog-mian-lang')
    btns.addEventListener('click', function (e) {
      console.log(e)
      if (e.target.nodeName === 'BUTTON') observeData.select = e.target.textContent;
    })
  
    // 点击关闭按钮
    let dialogClose = document.getElementById('dialog-close')
    let dialogId = document.getElementById('dialogId')
    dialogClose.addEventListener('click', function () {
        console.log('触发')
       dialogId.style.display = 'none'
    })
  }
  