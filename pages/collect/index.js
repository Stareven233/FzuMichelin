
import { request } from '../../utils/util'
import { showToast } from '../../utils/asyncWx'

Page({
  data: {
    dishes: []
  },

  // 本来用的是onLoad，但onShow才能保证进入详情页取消收藏后退回来能看到对应菜品消失
  async onShow(options) {
    const userInfo = wx.getStorageSync('userInfo') || {}
    const url = `/user/getcollection?uid=${userInfo.uid}`

    const res = await request({ url, method: 'POST' })
    const dishes = res.statusCode===200 ? res.data : []

    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.dishscore = v.dishscore && v.dishscore.toFixed(1)
      v.starNum = Math.round(v.dishscore)
    })
    this.setData({
      dishes
    })
  },

  async handleCollect(e) {
    const { id, idx } = e.currentTarget.dataset
    let { dishes } = this.data
    // 所点击的菜的收藏id及在dishes数组中的索引

    const res = await request({ url: `/user/deletecollection?id=${id}`, method: "post" })
    console.log(res);
    if(res.statusCode!==200) {    
      await showToast({title: '取消收藏失败'})
      return
    }
    dishes.splice(idx, 1)
    this.setData({ dishes })
    await showToast({title: '取消收藏成功'})
  },
  
  handleDishTap(e) {
    const { dishId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/dish_detail/index?dishId=${dishId}`,
    })
  },

})
