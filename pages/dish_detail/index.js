// pages/dish_detail/index.js

import { request } from '../../utils/util'
import { compressImage, showToast } from '../../utils/asyncWx'

Page({
  data: {
    dish: {},
    comments: [],
    commentInputFocused: false,
    fileUrl: '',
    files: [], // 实际指的是uploader中的图片
    commentScore: 3,
    commentFullScore: 5,
    dishUserId: {}, // { dishid: dishId, uid: userInfo.uid || 'anonymous' }
    commentText: '',
    canComment: true,
    collectId: null, // 被收藏后才有的收藏id
  },

  initCommentData() {
    this.setData({
      commentInputFocused: false,
      fileUrl: '',
      files: [],
      commentScore: 3,
      commentText: '',
    })
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

    // 查询该菜品是否已收藏
    url = '/user/iscollected'
    res = await request({ url, data: this.data.dishUserId, method: 'POST' })
    if(typeof res.data === 'number') {
      this.setData({ collectId: res.data })
    }

    // 请求该菜品下的评论
    url = `/dish/getcomment?did=${dishId}` 
    // const comments = this.data.comments
    res = await request({ url, method: 'POST' })
    const comments = res.data || []
    comments.map(function (v) {
      v.starNum = Math.round(v.score)
    })

    // 查询该用户能否评论该道菜
    url = '/comment/cancomment'
    data = { dishid: dishId, uid: userInfo.uid || 'anonymous' }
    res = await request({ url, data, method: 'POST' })
    const canComment = res.data
    let commentText = ''
    switch (canComment) {
      case 'error1':
        commentText = '您已被管理员限制评论'
        break
      case 'error2':
        commentText = '当日评论次数已尽，提升等级可获取更多次数'
        break
      case 'error3':
        commentText = '同一菜品只可评论一次'
        break
      default:
        break
    }

    this.setData({
      dish,
      comments,
      canComment,
      commentText,
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
  })
  },

  commentInputFocus() {
    if(this.data.canComment === true) {
      this.setData({ commentInputFocused: true })
    }
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
    // console.log(formData)
    // uploadfile接口要求必带文件，于是评论只能必带图片...
    wx.uploadFile({
      filePath: this.data.fileUrl,  // 要上传文件资源的路径 (本地路径)
      name: 'file',
      url: 'https://www.jieblue.xyz:8080/comment/docomment',
      formData: formData,
      // header: {'content-type':'multipart/form-data;charset=UTF-8'},
      timeout: 3000,
      success: async (result) => {
        console.log(result)
        await showToast({title: '评论成功'})
        this.initCommentData()
      },
      fail: async (res) => {
        await showToast({title: '评论失败，可能是没带上图片？'})
        console.log(res)
      },
      complete: (res) => {console.log(res)},
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
    return compressImage({ src: files.tempFilePaths[0], quality: 20 })
    // 本想不断检测压缩后图片size是否合适再按情况返回...
    // 原本压缩质量定为30，可感觉加载还是太慢了
  },

  uploadError(e) {
    console.log('upload error', e.detail)
  },

  uploadSuccess(e) {
    const url = e.detail.urls[0]
    this.setData({
      fileUrl: url,
      files: [{url: url}]
    })
    console.log('upload success', e.detail)
  },

  async handleCollect(e) {
    if(this.data.collectId) {
      const res = await request({ url: `/user/deletecollection?id=${this.data.collectId}`, method: "POST" })
      // console.log(res);
      if(res.data === true) {
        this.setData({ collectId: null })
        await showToast({title: '取消收藏'})
      }
    }
    else {
      const data = this.data.dishUserId
      const res = await request({ url: '/user/addcollection', data, method: "POST" })
      // console.log(res);
      if(typeof res.data === 'number' && res.data !== -1) {
        this.setData({ collectId: res.data })
        await showToast({title: '收藏成功'})
      }
      else {        
        await showToast({title: '收藏失败或重复收藏'})
      }
    }
  },

  handleImgPreview(e) {
    const { url } = e.currentTarget.dataset
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
})
