// 数据请求，处理部分
import axios from 'axios'

// axios配置
let instance = axios.create({
    baseURL: 'https://user-like-wrapper-ms.juejin.im/v1/user/',
    timeout: 30000,
    headers: { "X-Juejin-Src": "web" }
});


/**
 * 请求数据（对外开放）
 * @param {String} userId
 */
export const getData = (userId) => {

    return new Promise (async (resolve, reject) => {
        // 因为现成的掘金接口，一次只能拿到30个数据，如果点赞很多文章的话，我们需要拼接很多次请求才行
        // 思考一：等一个请求返回后，再把page的值增加，直到返回数组为空，不再进行请求，这样是个串行的
        // ✅ 思考二：在发送请求之前，先发送一个 page=0&pageSize=0 这时会返回你有多少点赞的文章数量，根据数量这个就能获取到需要发送的次数，这个是并行的

        // 根据返回的数组，建立对应数量的axios请求
        let totalArr = await getTotal(userId)
        let aixosArr = totalArr.map(item => instance.get(item))


        axios.all(aixosArr)
            .then(axios.spread( function () {
            let arr = []
            for (let i = 0; i < arguments.length; i++) {
                arr.push(arguments[i].data.d.entryList)
            }
            let resData = dataHandle(arr.flat())
            resolve(resData) // 经过处理类处理后的数据
        }));
    })
}


/**
 * 请求page=0&pageSize=0 结果用于生成多次axios请求（原因是掘金接口一次拿不到全部点赞数据，上限是30）
 * （内部使用）
 * @param { String } 用户ID
 * @return { Array } ['请求地址一', '', ...]
 */
export const getTotal = (userId) => {

    return new Promise((resolve, reject) => {

        instance.get(`${userId}/like/entry?page=0&pageSize=0`).then(res => {

            let len = Math.ceil(res.data.d.total/30),
                arr = [];

            for (let i = 0; i < len; i++) {
                arr.push(`${userId}/like/entry?page=${i}&pageSize=30`)
            }
            resolve(arr)
        }).catch(e => {
            reject(e)
        })

    })
}

/**
 * 数据处理函数（内部使用）(此处代码写的不好qwq)
 */
export const dataHandle = (data) => {
    let countedNames = data
    .map( item => item.tags.map(jtem => jtem.title ) )
    .flat(Infinity)
    .reduce((allNames, name) => {
        if (name in allNames) {
            allNames[name]++;
        } else {
            allNames[name] = 1;
        }
        return allNames;
    }, {})
    // ['Vue.js', 'Vue.js', '...', ...] ===> [ { name: 'Vue.js', num: 6}, {'Jquery': 4}, {} ]
    let resArr = []
    for (let prop in countedNames) {
        resArr.push({
            name: prop,
            num: countedNames[prop],
            data: []
        })
    }
    resArr.sort((a, b) =>  b.num - a.num); // 按照数量排序
    // 第二部分：
    // 获取 所有值
    let aaa = data.map( item => {
        return {
            title: item.title,
            originalUrl: item.originalUrl,
            username: item.user.username,
            objectId: `https://juejin.im/user/${item.user.objectId}`,
            tags: item.tags.map( j => j.title )
        }
    })
    // 整成想要的格式
    resArr.forEach( item => {
        aaa.forEach( jtem => {
            jtem.tags.some( j => j === item.name) ? item.data.push(jtem) : ''
        })
    })
    return resArr
}