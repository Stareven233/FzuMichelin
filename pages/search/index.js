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

  handleMenuClick(e) {
    const searchBox = this.selectComponent('.searchBox')
    searchBox.handleInputConfirm({ detail: { value: e.currentTarget.dataset.kw } })
    // 本该传递个点击事件，不过子组件只需要里面一个值，就传个一般对象就好了...
  },

})
