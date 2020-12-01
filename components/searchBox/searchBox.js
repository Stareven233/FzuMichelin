// components/searchBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: "今天吃什么...",
    },
    value: {
      type: String,
      value: "",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputConfirm(e) {
      // console.log(e);
      /*
        currentTarget: {id: "", offsetLeft: 43, offsetTop: 5, dataset: {…}}
        detail: {value: "流量"}
        mark: {}
        mut: false
        target: {id: "", offsetLeft: 43, offsetTop: 5, dataset: {…}}
        timeStamp: 14440
        type: "confirm"
      */
      
      let keyword = e.detail.value
      let histories = wx.getStorageSync('histories') || []

      const kwIndex = histories.findIndex(v => v===keyword)
      if (kwIndex !== -1) {
        histories.splice(kwIndex, 1)
        // 若之前搜索过该kw，则先删再加
      }
      histories.push(keyword)
      wx.setStorageSync('histories', histories)
      wx.navigateTo({
        url: `/pages/dish/index?kw=${keyword}`,
      })
    },
  }
})
