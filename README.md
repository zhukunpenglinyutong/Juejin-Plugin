# 掘金插件 - 拓展web端展示功能

---

## 插件一：增加 个人主页 - 赞文章功能 | 文章分类功能（未完成 上班ing 下班看看今天应该可以完成）

### 1.使用

```js
git clone https://github.com/zhukunpenglinyutong/Juejin-Plugin.git

npm i

pm2 start proxyServe // 启动代理

打开 谷歌浏览器 扩展程序

开启开发者模式

点击 加载已解压的扩展程序

选择本仓库src文件夹

刷新页面 (在个人页面刷新才行)
```

**使用演示（视频）**

<video src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1%E5%88%86%E7%B1%BB%E6%8F%92%E4%BB%B6.mp4" controls="controls">
您的浏览器不支持 video 标签。
<a href="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1%E5%88%86%E7%B1%BB%E6%8F%92%E4%BB%B6.mp4">视频展示不了，点击这里</a>
</video>



---

### 2.实现分析（写代码前先分析整个过程，再动手写）

**视图展示形式**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1%E5%88%86%E7%B1%BB%E6%8F%92%E4%BB%B6%E7%A4%BA%E6%84%8F%E5%9B%BE.png" />


**代码实现分析**

- 数据请求：通过接口拿到数据（如果需要多个请求的话，进行一定的异步等待处理）（Node层已经解决跨域问题✅）
- 数据处理：将数据处理成我们想要的格式 ✅
- 视图实现：通过数据 ---> 进行添加DOM方式 ✅

---

### 3.遇到的问题

---

**1️⃣ 数据请求部分遇到跨域问题，无法进行数据请求**

暂时想到的解决方案：采用Node层代理，并返回我想要的格式，这样处理数据的部分就可以放到 后端进行 ✅

---

**2️⃣ 点击第一次分类查看的时候，弹不出来**

- 思考：原因可能是掘金几个文件拿不到，阻塞了
- 再次点击就会出来

---

**3️⃣ 切换普通路由 无法监听到，也就无法增加DOM节点**

- 一种方法是做一个 简易的路由，监听路由变换，但是 这种需要和 onhashchange 事件配合，也就是需要 监听hash变化
- 掘金网址变换不是没有 #，所以能通过 定时器轮询的方式监听，但是这种我是不卡，但是感觉并不好，还不如等大佬指点下呢

---

**4️⃣ 分类菜单部分点击一下图层就会消失（虽然事件触发了，数据更新了，但是这种效果不好）**

---




