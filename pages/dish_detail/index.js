// pages/dish_detail/index.js

import { request } from '../../utils/util'
import { compressImage } from '../../utils/asyncWx'

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
    fileUrl: '',
    commentScore: 3,
    commentFullScore: 5,
    dishUserId: {},
    commentText: '',
  },

  onLoad: async function (options) {
    const { dishId } = options
    const userInfo = wx.getStorageSync('userInfo') || {}
    // 请求菜品详情
    let url = '/dish/getinfo'
    let data = { dishid: dishId, uid: userInfo.uid || 'anonymous' }
    this.setData({ dishUserId: data })
    // 之后提交评论的表单需要这两项数据

    let res = await request({ url, data, method: 'POST' })
    const dish = res.data || {}
    dish.tastes = !dish.favor ? [] : dish.favor.split(',')
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

    this.setData({
      dish,
      comments,
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
  })
  },

  commentInputFocus() {
    this.setData({ commentInputFocused: true })
  },

  commentInputblur() {
    this.setData({ commentInputFocused: false })
  },

  handleStarchange(e) {
    // console.log(e)
    const staridx = e.target.dataset.staridx + 1
    if(!staridx) {
      return
    }
    this.setData({
      commentScore: staridx
    })
  },

  handleInputChange(e) {
    // console.log(e)
    this.setData({ commentText: e.detail.value })
  },

  handleCommentSubmit(e) {
    const { dishid, uid } = this.data.dishUserId
    const formData = {
      uid,
      did: parseInt(dishid),
      score: parseFloat(this.data.commentScore),
      text: this.data.commentText,
    }
    console.log(formData);
    wx.uploadFile({
      filePath: this.data.fileUrl,  // 要上传文件资源的路径 (本地路径)
      name: 'file',
      url: 'https://www.jieblue.xyz:8080/comment/docomment',
      formData: formData,
      // header: {'content-type':'multipart/form-data;charset=UTF-8'},
      timeout: 3000,
      success: (result) => {console.log(result);},
      fail: (res) => {console.log(res);},
      complete: (res) => {console.log(res);},
    })
  },

  // chooseImage: function(e) {
  //   var that = this;
  //   wx.chooseImage({
  //     // 可以指定是原图还是压缩图，默认二者都有
  //     sizeType: ['original', 'compressed'],
  //     // 可以指定来源是相册还是相机，默认二者都有
  //     sourceType: ['album', 'camera'],
  //     success: function(res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths)
  //       })
  //     }
  //   })
  // },

  // previewImage: function (e) {
  //   wx.previewImage({
  //     current: e.currentTarget.id, // 当前显示图片的http链接
  //     urls: this.data.files // 需要预览的图片http链接列表
  //   })
  // },

  selectFile(files) {
    // console.log('files', files)
    // 返回false可以阻止某次文件上传
  },

  // 文件上传的函数，返回一个Promise，其中callback里面必须resolve({urls})表示成功，否则表示失败
  // return new Promise((resolve, reject) => {
  //   resolve({ urls: files.tempFilePaths })
  // })
  uplaodFile(files) {
    // console.log('upload files', files)
    return compressImage({ src: files.tempFilePaths[0], quality: 30 })
    // 本想不断检测压缩后图片size是否合适再按情况返回...
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
    this.setData({
      fileUrl: e.detail.urls[0]
    })
    console.log('upload success', e.detail)
  }

})
