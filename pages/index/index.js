//index.js
//获取应用实例
// const app = getApp()

import { request } from '../../utils/util'

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
    // dishes: [],
    dishes: [
      {
          "id": 10,
          "name": "双拼烤肉+烤鸭饭",
          "score": 3.95,
          "commentnumber": 2,
          "price": 17.0,
          "favor": "咸",
          "category": null,
          "restaurantname": "墨西哥烤肉饭",
          "restaurantlocation": "玫瑰园二楼",
          "picurl": null
      },
      {
          "id": 6,
          "name": "黑椒茶油烤鸭饭",
          "score": 3.0,
          "commentnumber": 1,
          "price": 16.0,
          "favor": "甜",
          "category": null,
          "restaurantname": "墨西哥烤肉饭",
          "restaurantlocation": "玫瑰园二楼",
          "picurl": null
      },
      {
          "id": 7,
          "name": "酸梅茶油烤鸭饭",
          "score": 3.0,
          "commentnumber": 1,
          "price": 16.0,
          "favor": "酸",
          "category": null,
          "restaurantname": "墨西哥烤肉饭",
          "restaurantlocation": "玫瑰园二楼",
          "picurl": null
      },
      {
          "id": 8,
          "name": "虎邦辣酱茶油烤鸭饭",
          "score": 3.0,
          "commentnumber": 1,
          "price": 17.0,
          "favor": "咸,辣,重口味",
          "category": null,
          "restaurantname": "墨西哥烤肉饭",
          "restaurantlocation": "玫瑰园二楼",
          "picurl": null
      }
    ],
  },
  
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({logined: !!userInfo})
  },

  onLoad: async function() {
    const userInfo = wx.getStorageSync('userInfo')
    const data = { id: userInfo.uid,  page: 1 }
    let res = await request({ url: '/dish/recommend', method: 'POST', data })
    let dishes = res.data
    // let dishes = this.data.dishes

    // dishes[1].favor = '酸,甜,可口'
    // dishes[1].score = 3.2
    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.starNum = Math.round(v.score)
    })
    this.setData({
      dishes
    })
  }
})
