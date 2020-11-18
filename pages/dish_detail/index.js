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
    ],
    commentInputFocused: false,
    files: []
  },

  onLoad: async function (options) {
    const { dishId } = options
    const userInfo = wx.getStorageSync('userInfo') || {}
    // 请求菜品详情
    let url = '/dish/getinfo'
    let data = { dishid: dishId, uid: userInfo.uid || 'anonymous' }
    // uid 0 就作为匿名吧...

    let res = await request({ url, data, method: 'POST' })
    const dish = res.data || {}
    dish.tastes = dish.favor === null ? [] : dish.favor.split(',')
    dish.starNum = Math.round(dish.score)

    // 请求该菜品下的评论
    url = '/dish/getcomment'
    data = { did: dishId }
    // res = await request({ url, data, method: 'POST' })
    // const comments = res.data || []
    const comments = this.data.comments
    comments.map(function (v) {
      v.starNum = Math.round(v.score)
    })

    this.setData({ dish, comments })
  },

  commentInputFocus() {
    this.setData({ commentInputFocused: true })
  },

  commentInputblur() {
    // console.log(e)
    this.setData({ commentInputFocused: false })
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['original', 'compressed'],
      // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['album', 'camera'],
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        })
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('some error')
      }, 1000)
    })
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
    console.log('upload success', e.detail)
  }

})
