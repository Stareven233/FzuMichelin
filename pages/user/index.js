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

  async onShow() {
    let { userInfo } = this.data
    if(!userInfo.uid) {
      return
    }
    const res = await request({ url: `/user/integral?uid=${userInfo.uid}`, method: 'POST' })
    userInfo.credit = res.data || 0
    this.setData({ userInfo })
  },

  async handleGetUserInfo(e) {
    // 登录
    const { code } = await login()
    // {errMsg: "login:ok", code: "053Xj20w3AOGjV23Zq2w3d67w74Xj20A"}
    let { userInfo } = e.detail
    const rdata = { code, nickname: userInfo.nickName, url: userInfo.avatarUrl }
    let res = await request({ url: '/getOpenid', method: 'POST', data: rdata })

    if(res.data) {
      userInfo.uid = res.data
    }
    else {
      await showToast({title: '登录失败，请重试'})
      return
    }

    res = await request({ url: `/user/integral?uid=${userInfo.uid}`, method: 'POST' })
    userInfo.credit = res.data || 0
    wx.setStorageSync('userInfo', userInfo)
    this.setData({userInfo})
  },

  handleLogout() {
    wx.clearStorage();
    this.setData({ userInfo: {} })
  },

})
