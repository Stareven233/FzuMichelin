// pages/search/index.js
Page({
  data: {
    histories: ['水煮肉片', '鸡排', '蛋包饭'],
    recommends: [],
  },

  onShow() {
    const recommendDish = wx.getStorageSync('recommendDish')
    const histories = wx.getStorageSync('histories')
    this.setData({ recommends: recommendDish, histories })
  },
})
