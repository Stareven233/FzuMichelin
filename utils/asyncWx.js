/**
 * promise 形式  login
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}

/**
 * promise 形式  getUserInfo
 */
export const getUserInfo = (params) => {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      ...params,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * promise 形式  getSetting
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    });
  })
}
/**
 * promise 形式  chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 * promise 形式  openSetting
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 * promise 形式  showModal
 * @param {object} param0 参数
 */
export const showModal = ({ content }) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}

/**
 *  promise 形式  showToast
 * @param {object} param0 参数
 */
export const showToast = ({ title }) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}

/**
 *  promise 形式  compressImage，用于配合 mp-uploader 的 upload
 * @param {object} param0 参数
 */
export const compressImage = (param) => {
  return new Promise((resolve, reject) => {
    wx.compressImage({
      src: param.src,
      quality: param.quality,
      success: (res) => {
        // wx.getImageInfo({
        //   src: res.tempFilePath,
        //   success: (result) => {
        //     console.log('imgInfo', result)
        //   },
        //   fail: (res) => {},
        //   complete: (res) => {},
        // })
        // console.log(res)
        resolve({ urls: [res.tempFilePath] })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
// 错误写法：
  // wx.compressImage({
  //   src: files.tempFilePaths[0],
  //   quality: 60,
  //   success: res => {
  //     return new Promise((resolve, reject) => {
  //       resolve({ urls: [res.tempFilePath] })
  //     })
  //   },
  //   fail: err => {
  //     return new Promise((resolve, reject) => {
  //       reject({ err })
  //     })
  //   }
  // })
