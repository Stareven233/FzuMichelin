// pages/search/index.js
Page({
  data: {
    histories: ['水煮肉片', '鸡排', '蛋包饭'],
    recommends: [],
    recDishName: ""
  },

  onShow() {
    const recommendDish = wx.getStorageSync('recommendDish')
    const histories = wx.getStorageSync('histories')
    const recDishName = (recommendDish[0] && recommendDish[0].name) || "暂无推荐"
    this.setData({ recommends: recommendDish, histories, recDishName })
  },
})
