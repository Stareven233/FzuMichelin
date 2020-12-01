//index.js
//获取应用实例
// const app = getApp()

import { request } from '../../utils/util'
import { showToast } from '../../utils/asyncWx'

Page({
  data: {
    tastes: [{
      taste: '酸',
      color: '#e2e04f'
    }, {
      taste: '甜',
      color: '#f87c5d'
    }, {
    //   taste: '苦',
    //   color: '#2e8b2b'
    // }, {
    // 接口数据里根本就没有这个口味的菜啊！
      taste: '辣',
      color: '#c71f13'
    }, {
      taste: '咸',
      color: '#419bd6'
    }, {
      taste: '清淡',
      color: '#4edf6d'
    }, {
      taste: '重口',
      color: '#582072'
    }, {
      taste: '香',
      color: '#f08d30'
    }, {
      taste: '鲜',
      color: '#f186c8'
    }],
    logined: false,
    dishes: [],
    curPage: 1,
    // 当前该请求的菜品页码
    hasLoaded: false,
  },
  
  async onShow() {
    const userInfo = wx.getStorageSync('userInfo')
    const logined = !!userInfo
    const { hasLoaded, dishes } = this.data

    if(hasLoaded && logined && !dishes.length) {
      // hasLoaded防止第一次打开小程序时加载两次数据，
      // 否则会导致load结束前if条件为真，进来才变为假
      // 有用户信息且没有dishes就说明刚从个人页面登录完回来，需要加载今日推荐
      await this.getNextDishPage("show")
    }
    this.setData({ logined })
  },

  async onLoad() {
    // const userInfo = wx.getStorageSync('userInfo')
    // this.setData({ userInfo })
    await this.getNextDishPage("load")
    this.setData({ hasLoaded: true })
  },

  async onReachBottom() {
    await this.getNextDishPage("reachBottom")
  },

  async onPullDownRefresh() {
    this.setData({
      dishes: [],
      curPage: 1,
    })
    await this.getNextDishPage("PullDown")
  },

  handleDishTap(e) {
    const { dishId } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/dish_detail/index?dishId=${dishId}`,
    })
  },

  async getNextDishPage(entry) {
    // console.log(entry, "触发的加载");
    const userInfo = wx.getStorageSync('userInfo')
    const { curPage } = this.data
    const data = { id: userInfo.uid,  page: curPage }
    if(!data.id) {
      return
    }

    let res = await request({ url: '/dish/recommend', method: 'POST', data })
    let dishes = res.data || []

    if(!dishes.length) {
      await showToast({title: "没有更多菜品了"})
      return
    }

    dishes.map(function(v) {
      v.tastes = v.favor===null ? [] : v.favor.split(',')
      v.starNum = Math.round(v.score)
    })
    // 将返回数据中的口味字符串拆成口味数组，评分取整作为菜品标星数

    dishes = this.data.dishes.concat(dishes)
    // 把这次请求的数据接在已有的后面
    if(curPage === 1) {
      wx.setStorageSync('recommendDish', dishes.slice(0, 10))
    }
    // 第一页的推荐作为搜索页里显示的推荐菜品
    this.setData({
      dishes,
      curPage: curPage+1,
    })
  },

})
