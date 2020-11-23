// pages/comment_history/index.js

import { request } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 请求该菜品下的评论
    const userInfo = wx.getStorageSync('userInfo') || {}
    let url = `/user/getcomment?uid=${userInfo.uid}` 
    let res = await request({ url, method: 'POST' })
    // console.log(res);
    const comments = res.data || []
    comments.map(function (v) {
      v.starNum = Math.round(v.score)
    })
    this.setData({ comments })
  },

})