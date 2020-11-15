//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    tastes: [{
      taste: '酸',
      color: 'orange'
    }, {
      taste: '甜',
      color: 'orange'
    }, {
      taste: '苦',
      color: 'orange'
    }, {
      taste: '辣',
      color: 'orange'
    }, {
      taste: '咸',
      color: 'orange'
    }, {
      taste: '清淡', 
      color: 'orange'
    }, { 
      taste: '重口', 
      color: 'orange' 
    }],
    logined: false,
  },
  
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({logined: !!userInfo})
  },
})
