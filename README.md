# 掘金插件 - 拓展web端展示功能

此处应该有一段鼓励站长的话

---

## 🎋插件一：个人主页 - 赞文章分类功能（完成度80% 基本能使用）

---

### 1.tampermonkey插件使用（油猴🔥🔥🔥）

**油猴怎么安装，懂的人无需多言 [链接](https://www.baidu.com/s?ie=UTF-8&wd=%E6%B2%B9%E7%8C%B4%E5%AE%89%E8%A3%85)**

**[掘金点赞文章分类插件 油猴地址](https://greasyfork.org/zh-CN/scripts/388044-%E6%8E%98%E9%87%91%E6%8F%92%E4%BB%B6)**

**[实现代码链接](https://github.com/zhukunpenglinyutong/Juejin-Plugin/blob/master/%E6%8F%92%E4%BB%B6%E4%B8%80%EF%BC%9A%E8%B5%9E%E6%96%87%E7%AB%A0%E5%88%86%E7%B1%BB%E5%8A%9F%E8%83%BD/tampermonkey%E7%89%88%E6%9C%AC%EF%BC%88%E6%B2%B9%E7%8C%B4%EF%BC%89/index.js)**

- 此版本插件，没有跨域问题，提高速度 50%+（站长3.7k的点赞文章，也能在8-20s左右处理完成，我点赞文章100+，基本上1s左右，甚至更短）
- 此版本插件，采用原生JS写法构建展示效果，不依赖 element.ui，简化了需要下载的文件
- 此版本插件，采用 我自己写的简单数据劫持 实现数据响应，优化DOM部分操作的代码，代码更清晰

---

### 2.谷歌浏览器插件版本使用（有跨域问题，待解决，现在没办使用，推荐使用油猴安装）

```sh

```

**使用演示（视频）**

<video src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1%E5%88%86%E7%B1%BB%E6%8F%92%E4%BB%B6.mp4" controls="controls">
您的浏览器不支持 video 标签。
<p><a href="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1%E5%88%86%E7%B1%BB%E6%8F%92%E4%BB%B6.mp4">视频展示不了，点击这里（视频中演示的目录和现在目录不一样，目录变更为 插件一：赞文章分类功能/谷歌浏览器插件版本）</a></p>
</video>


---

### 3.实现分析（写代码前先分析整个过程，再动手写）

**视图展示形式**

<img style="width:500px;" src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1%E5%88%86%E7%B1%BB%E6%8F%92%E4%BB%B6%E7%A4%BA%E6%84%8F%E5%9B%BE.png" />


**代码实现分析**

- 数据请求：通过接口拿到数据（如果需要多个请求的话，进行一定的异步等待处理）（Node层已经解决跨域问题✅）
- 数据处理：将数据处理成我们想要的格式 ✅
- 视图实现：通过数据 ---> 进行添加DOM方式 ✅

---

### 4.遇到的问题

---

**1️⃣ 数据请求部分遇到跨域问题，无法进行数据请求（谷歌插件问题）**

- 暂时想到的解决方案：采用Node层代理，并返回我想要的格式，这样处理数据的部分就可以放到 后端进行 ✅
- 采用油猴没有跨域问题，谷歌浏览器插件跨域问题待解决

---

**2️⃣ 点击第一次分类查看的时候，弹不出来（谷歌插件问题）✅**

- 思考：原因可能是掘金几个文件拿不到，阻塞了
- 再次点击就会出来
- 解决：原生JS重写 ✅

---

**3️⃣ 切换普通路由 无法监听到，也就无法增加DOM节点（谷歌插件问题）**

- 一种方法是做一个 简易的路由，监听路由变换，但是 这种需要和 onhashchange 事件配合，也就是需要 监听hash变化
- 掘金网址变换不是没有 #，所以能通过 定时器轮询的方式监听，但是这种我是不卡，但是感觉并不好，还不如等大佬指点下呢

---

**4️⃣ 分类菜单部分点击一下图层就会消失（虽然事件触发了，数据更新了，但是这种效果不好）（谷歌插件问题）✅**

- 解决：原生JS重写

---

**5️⃣ 遇到1k点赞的内容，需要加载15s左右，遇到更高的加载速度更慢，此处可以进行优化，优化不了的，提示不建议使用此插件✅**

- 原生JS重写（3.7k 20s之内加载出来）

---

### 5.近期规划（2019.7.29 - 2019.8.4）

**1️⃣ 将谷歌插件的形式转为 油猴形式 ✅**


**2️⃣ 修复样式展示问题，并增加优化体验 ✅**

- 🔧修复 非刷新情况下 插件操作DOM加载不出来的问题（主要原因是触发函数监听的是 window.onload ）
- 🔧修复 点击分类查看 出现黑色遮罩层，但是不显示内容的问题（现在是还需要再点一下赞的那个下拉才正常）✅
- 🔧修复 点击切换类型的时候 弹出层消失的这一体验不好的问题 ✅
- 🔥增加搜索功能（除了选择一个标签之外，还支持模糊化查询的功能，查询的是全部内容的文章标题名）
- 🔥优化 分类标签滚动效果，现在是需要手动的进行拖拽滚动，马上会实现 鼠标滚轮滚动的功能，优化使用体验
- 🔥~~增加多选标签功能（有些文章由多个标签组成，此功能可以筛选出符合多选标签规则的内容）（再考虑）~~
- ......


---

### 6.其他说明





