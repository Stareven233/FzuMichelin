// pages/dish/index.js

import { request } from '../../utils/util'

Page({
  data: {
    dishes: []
  },

  onLoad: async function (options) {
    const { kw } = options
    const data = { word: kw, page: 0 }
    // 而'/dish/recommend'page从1开始...
    const res = await request({ url: '/dish/search', method: 'POST', data })
    const dishes = res.data || []
    
    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.starNum = Math.round(v.score)
    })
    this.setData({
      dishes
      // dishes: this.data.dishes.concat(dishes)
      // todo 下拉加载新数据
    })
  },

})
