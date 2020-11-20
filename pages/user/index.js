// pages/user/index.js

import { request } from '../../utils/util'
import { login, showToast } from '../../utils/asyncWx'

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
    // {errMsg: "login:ok", code: "053Xj20w3AOGjV23Zq2w3d67w74Xj20A"}
    let { userInfo } = e.detail
    console.log(e);
    const { data } = await request({ url: '/getOpenid', method: 'POST', data: { code, nickname: userInfo.nickName } })
    
    if(data) {
      userInfo.uid = data
      wx.setStorageSync('userInfo', userInfo)
      this.setData({userInfo})
    }
    else {
      await showToast({title: '登录失败，请重试'})
    }
  },
})
