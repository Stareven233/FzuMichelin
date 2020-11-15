// pages/user/index.js

import { request } from '../../utils/util'
import { login } from '../../utils/asyncWx'

Page({
  data: {
    userInfo: {},
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({userInfo})
  },

  handleGetUserInfo: async function (e) {
    // 登录
    const { code } = await login()
    console.log(code)
    
    // {errMsg: "login:ok", code: "053Xj20w3AOGjV23Zq2w3d67w74Xj20A"}
    const { userInfo } = e.detail

    let res = await request({ url: '/getOpenid', method: 'POST', data: { code, nickname: userInfo.nickName } })
    console.log(res)

    wx.setStorageSync('userInfo', userInfo)
    this.setData({userInfo})
  },
})
