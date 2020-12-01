import { showToast } from './asyncWx'

//CommonJS语法，配合 const util = require('../../utils/util.js')
// module.exports = {
//   formatTime: formatTime
// }

// ES6语法，// import { formatTime } from '../../utils/util'
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const request = (params) => {
  const baseUrl = "https://www.jieblue.xyz:8080"

  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  // let header = {...params.header}
  // if(params.url.includes("/my/")) {
  //   header["Authorization"] = wx.getStorageSync("token")
  // }

  wx.showLoading({
    title: '加载中',
    mask: true
  })

  
  return new Promise((resolve, reject) => {
    wx.request({
      timeout: 3000,
      ...params,
      url: baseUrl + params.url,

      success: (res) => {
        resolve(res)
      },
      fail: async (err) => {
        let msg = err.errMsg
        if(err.errMsg.indexOf('fail timeout') >= 0) {
          msg = "请求超时"
        }
        await showToast({
          title: `${msg}\n\n请尝试刷新`,
          duration: 3000
        })
        reject(err)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  })
}
