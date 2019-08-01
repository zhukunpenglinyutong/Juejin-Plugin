# 掘金插件 - 拓展web端展示功能

此处应该有一段鼓励站长的话（掘金还是得盈利，都为掘金着急呀，因为很喜欢掘金，着急的很）

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/0.%E7%AB%99%E9%95%BF%E5%AE%B6%E7%9A%84%E7%8C%AB.png">

---

## 🎋插件一：用户主页 - 赞文章分类功能（完成度80% 基本能使用）

**详细文档以及安装步骤：[--> 链接]()**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1.%E7%94%A8%E6%88%B7%E4%B8%BB%E9%A1%B5-%E8%B5%9E%E6%96%87%E7%AB%A0%E5%88%86%E7%B1%BB%E5%8A%9F%E8%83%BD/2.%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6%E4%B9%8B%E5%90%8E%E7%AB%99%E9%95%BF%E7%9A%84%E6%95%B0%E6%8D%AE.png" />

---

### 1.分析

- 前置场景（痛点）：掘金每赞一个文章，就会被收集到个人主页中赞的部分，但是这个文章虽好，但是多了确实不利于查找，而且不支持搜索查找，这文章要是多了起来，是真的非常的难受（痛点图下图）
- 解决方案：拿取所有点赞文章数据，处理成具有分类的一种数据结构进行渲染
- 交互形式：如上图

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/github%E5%9B%BE%E7%89%87/Juejin-Plugin/1.%E7%94%A8%E6%88%B7%E4%B8%BB%E9%A1%B5-%E8%B5%9E%E6%96%87%E7%AB%A0%E5%88%86%E7%B1%BB%E5%8A%9F%E8%83%BD/1.%E7%AB%99%E9%95%BF3.7k%E6%95%B0%E6%8D%AE.png" />

---

## 🎋插件二：掘金首页 - 看你想看的内容（预告中... 8.3日开放）

---

### 1.分析

- 前置场景（痛点）：因为首页推荐内容大部分都是前端，导致一些非前端的老哥，看到的并不是自己想要的东西，有些难受
- 解决方案：在跳转到首页 https://juejin.im/timeline 的时候，分析 插件保存的 用户想要进入首页看到的 文章类型
    - 例如我保存到插件中的是 Java，那么当我进到首页的时候，会跳转到 https://juejin.im/timeline/backend/Java
    - 如果我保存的是 android，就会跳转到 https://juejin.im/timeline/android
- 交互形式：采用下拉选择的方式，让用户进入到首页看到的分类，不用让用户写任何东西，就是点点点就行




