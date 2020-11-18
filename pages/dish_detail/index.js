// pages/dish_detail/index.js

import { request } from '../../utils/util'

Page({
  data: {
    dish: {},
    comments: [
      {
              "username": "兰杰",
              "commentid": 103,
              "text": "good",
              "picurl": "https://www.jieblue.xyz:8080/static/comment/7094a7a5897446cc9b510effce4d401a202011162047040318025162.jpeg",
              "score": 5.0,
              "time": "2020-11-13",
              "dishid": 2,
              "userid": "031802516",
              "smallpic": "https://www.jieblue.xyz:8080/static/smallcomment/7094a7a5897446cc9b510effce4d401a202011162047040318025162.jpeg"
          },
          {
              "username": "兰杰",
              "commentid": 104,
              "text": "good",
              "picurl": "https://www.jieblue.xyz:8080/static/comment/7094a7a5897446cc9b510effce4d401a202011162047040318025162.jpeg",
              "score": 5.0,
              "time": "2020-11-13",
              "dishid": 2,
              "userid": "031802516",
              "smallpic": "https://www.jieblue.xyz:8080/static/smallcomment/7094a7a5897446cc9b510effce4d401a202011162047040318025162.jpeg"
          }
      ]
      ,
  },

  onLoad: async function(options) {
    const { dishId } = options
    const userInfo = wx.getStorageSync('userInfo') || {}
    // 请求菜品详情
    let url = '/dish/getinfo'
    let data = { dishid: dishId, uid: userInfo.uid || 'anonymous' }
    // uid 0 就作为匿名吧...

    let res = await request({ url, data, method: 'POST' })
    const dish = res.data || {}
    dish.tastes = dish.favor===null ? [] : dish.favor.split(',')
    dish.starNum = Math.round(dish.score)

    // 请求该菜品下的评论
    url = '/dish/getcomment'
    data = { did: dishId }
    // res = await request({ url, data, method: 'POST' })
    // const comments = res.data || []
    const comments = this.data.comments
    comments.map(function(v) {
      v.starNum = Math.round(v.score)
    })

    this.setData({ dish, comments })
  },

})
