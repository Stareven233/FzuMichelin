// pages/dish/index.js

import { request } from '../../utils/util'
import { showToast } from '../../utils/asyncWx'

Page({
  data: {
    dishes: [],
    query: "",
    req: {},
    curPage: 0,
  },

  async onLoad(options) {
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

    this.setData({
      req: { url, data, method: 'POST' },
      query: kw || favor,
    })
    // 这里有两种可能的连接，但之后加载的都一样，要先存下构造好的请求供getNextDishPage使用

    // const res = await request(req)
    // const dishes = res.statusCode===200 ? res.data : []
    
    // dishes.map(function(v) {
    //   v.tastes = v.favor===null ? [] : v.favor.split(',')
    //   v.starNum = Math.round(v.score)
    // })
    await this.getNextDishPage("load")
  },

  async onReachBottom() {
    await this.getNextDishPage("reachBottom")
  },
  
  handleDishTap(e) {
    const { dishId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/dish_detail/index?dishId=${dishId}`,
    })
  },

  async getNextDishPage(entry) {
    // console.log(entry, "触发的加载");
    let { req } = this.data
    if(!req.url) {
      return
    }
    req.data.page = this.data.curPage
    const res = await request(req)
    let dishes = res.statusCode===200 ? res.data : []

    if(!dishes.length) {
      await showToast({title: "没有更多菜品了"})
      return
    }

    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.score = v.score && v.score.toFixed(1)
      v.starNum = Math.round(v.score)
    })
    // 将返回数据中的口味字符串拆成口味数组，评分取整作为菜品标星数

    dishes = this.data.dishes.concat(dishes)
    // 把这次请求的数据接在已有的后面
    this.setData({
      dishes,
      curPage: req.data.page+1,
    })
  },

})
