// 逻辑处理部分（请求数据 && 处理数据）

const axios = require('axios')

/**
 * 拿取数据的函数
 * @param {String} userId 
 */
const getData = (userId) => {
    return new Promise ((resolve, reject) => {
        axios.get(`https://user-like-wrapper-ms.juejin.im/v1/user/${userId}/like/entry?page=0&pageSize=30`, {
            headers: { "X-Juejin-Src": "web" }
        })
        .then(res => { 
            resolve(res.data.d) 
        })
        .catch(e => { 
            reject(e) 
        })
    })
}


module.exports = {
    getData
}