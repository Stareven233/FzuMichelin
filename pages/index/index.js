//index.js
//获取应用实例
// const app = getApp()

import { request } from '../../utils/util'

Page({
  data: {
    tastes: [{
      taste: '酸',
      color: '#e2e04f'
    }, {
      taste: '甜',
      color: '#fc8769'
    }, {
      taste: '苦',
      color: '#2e8b2b'
    }, {
      taste: '辣',
      color: '#c71f13'
    }, {
      taste: '咸',
      color: '#419bd6'
    }, {
      taste: '清淡', 
      color: '#36d658'
    }, { 
      taste: '重口', 
      color: '#582072' 
    }, { 
      taste: '香', 
      color: '#e48227' 
    }, { 
      taste: '鲜', 
      color: '#ec78c0' 
    }],
    logined: false,
    dishes: [],
  },
  
  onShow: async function () {
    const userInfo = wx.getStorageSync('userInfo')
    const logined = !!userInfo
    if(!logined && !this.data.dishes) {
      // 有用户信息且没有dishes就说明刚从个人页面登录完回来，需要加载今日推荐
      await this.onLoad()
      // console.log(!logined, !this.data.dishes)
    }
    this.setData({ logined })
  },

  onLoad: async function() {
    const userInfo = wx.getStorageSync('userInfo')
    const data = { id: userInfo.uid,  page: 1 }
    let dishes = []
    if(data.id) {
      let res = await request({ url: '/dish/recommend', method: 'POST', data })
      dishes = res.data || []
    }
    // let dishes = this.data.dishess

    // dishes[1].favor = '酸,甜,可口'
    // dishes[1].score = 3.2
    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.starNum = Math.round(v.score)
    })

    this.setData({
      dishes
    })
    wx.setStorageSync('recommendDish', dishes)
  },

  handleDishTap(e) {
    // console.log(e);
    const { dishId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/dish_detail/index?dishId=${dishId}`,
    })
  },

})
