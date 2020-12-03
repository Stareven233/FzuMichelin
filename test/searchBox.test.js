const simulate = require('miniprogram-simulate')
// 不能用import，似乎需要babel配合

test('components/searchBox', () => {
  /**
   * 加载自定义组件
   * 加载后的组件名（tagName）为：searchbox
   * less: 自定义组件的 wxss 是否需要经过 less 编译
   * compiler：wxml编译器类型，传入 official 表示使用官方编译器，传入 simulate 表示使用 js 实现的模拟编译器
  */

  const componetPath = 'F:/CODE/WeChat/FzuMichelin/components/searchBox/searchBox'
  const id = simulate.load(componetPath, 'searchbox', {
    less: true,
    compiler: 'simulate',
  }) // 加载自定义组件，此处必须传入绝对路径
  const comp = simulate.render(id) // 渲染成自定义组件树实例
  // 使用自定义组件封装实例 comp 对象来进行各种单元测试

  // const parent = document.createElement('ppoi') // 创建父亲节点
  // comp.attach(parent) // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

  const input_wrap = comp.querySelector('.input_wrap') // 获取子组件 view
  expect(window.getComputedStyle(input_wrap.dom).color).toBe('rgb(102, 102, 102)') // 测试渲染结果
})
