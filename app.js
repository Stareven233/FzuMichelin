//app.js

/* todo: 
0 原型逻辑不自恰(如: 有"编辑资料"按钮却没有相应页面)
0 原型风格不统一，且很难说是美观
0 后端文档混乱，各种接口返回字段名各不相同
0 后端不按照原型设计接口，导致原型有的功能却没有相应接口
0 项目负责人天天想着应付了事，自顾综测
0 事实说明原型真不是随便找个人就能做的，点赞功能跟收藏一模一样，评论区单条评论居然还整个个浏览次数...

// 1 首页未登录时加按钮跳转个人空间
// 2 首页下滑继续加载下一页的推荐菜品，并且推荐都得存入缓存
3 首页与菜品搜索结果页几乎一样，考虑抽成组件
// 4 接口缺少菜品详情页评论的用户头像及评论的浏览次数(浏览次数很傻吊，可以不要)
// 5 接口缺少菜品详情页评论的点赞数
// 6 评论大图用于图片点击放大
// 7 搜索框组件用父组件向其传递placehodler与value，值来自推荐第一个菜品名
// 8 index中onLoad抽成一个函数，在onShow判断，当logined与userInfo不符时(说明刚登录)主动加载数据
// 9 菜品详情页uploadfile接口要求必带文件，于是评论只能必带图片...
// 10 口味加上 香，鲜
// 11 首页今日推荐要能刷新
// 12 菜品详情页评论应显示用户头像
// 13 接口响应慢，或许首页菜品分页每页数据少一些会好一点(不解决)
// 14 收藏、口味详情页的菜品wrap跳转
// 15 request出错要错误处理，让程序能继续往下执行(index.load.hasloaded)
16 添加自动化测试
// 17 dish页面搜索结果的下拉刷新
// 18 收藏失效，及收藏点击同时触发页面跳转问题
// 19 评论页面只有评论，看不到原先是评论哪道菜
// 20 搜索里面的推荐菜品按钮
// 21 个人中心的积分要每次page show就刷新
// 22 评论页面还是没有用户头像，忘了改了，再加上顶部页面名
// 23 支持退出登录、清空历史搜索记录
*/

App({
  onLaunch: function () {
  }
})
