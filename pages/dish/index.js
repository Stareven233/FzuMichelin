// pages/dish/index.js

import { request } from '../../utils/util'

Page({
  data: {
    dishes: [],
    query: "",
  },

  onLoad: async function (options) {
    const { kw, favor } = options
    let url = ''
    let data = {}

    if(kw) {
      url = '/dish/search'
      data = { word: kw, page: 0 }
    }
    else if(favor) {
      url = '/dish/favor'
      data = { favor: [favor], page: 0 }
    }
    else {
      return
    }
    // 而'/dish/recommend'page从1开始...

    const res = await request({ url, data, method: 'POST' })
    const dishes = res.statusCode===200 ? res.data : []
    
    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.starNum = Math.round(v.score)
    })
    this.setData({
      dishes,
      // dishes: this.data.dishes.concat(dishes)
      // todo 下拉加载新数据
      query: kw || favor,
    })
  },
  
  handleDishTap(e) {
    const { dishId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/dish_detail/index?dishId=${dishId}`,
    })
  },
})
