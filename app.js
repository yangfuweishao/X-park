App({
//创建towxml对象，供小程序页面使用
  globalData: {
    userInfo: null,
    openid: null,
    baseUrl: 'http://47.110.81.10:8082' //真机调试
    // baseUrl: 'http://127.0.0.0:8082' //本地调试
   },
  onLaunch: function () {
    var app = this;
    wx.getUserInfo({ //从网络获取最新用户信息
     success: function(res) {
      var user = res.userInfo;
      user.openid = app.globalData.openid;
      app.globalData.userInfo = user;
      console.log('请求获取user成功')
      console.log(user)
      console.log(app.globalData.userInfo)
      console.log(app.globalData.baseUrl)
      wx.request({
          url: 'http://47.110.81.10:8082/parking/user/setUserInfo',
          data: {
              nickname: app.globalData.userInfo.nickName,
              avatarUrl: app.globalData.userInfo.avatarUrl
          },
          success: function(res) {
           console.log('suuce')
          }
         })
     // app._saveUserInfo(user);
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (app.userInfoReadyCallback) {
       app.userInfoReadyCallback(res)
      }
     },
     fail: function(res) { //请求网络失败时，再读本地数据
      console.log('请求获取user失败')
      var userStor = wx.getStorageSync('user');
      if (userStor) {
       console.log('本地获取user')
       app.globalData.userInfo = userStor;
        wx.request({
      url: app.globalData.baseUrl + '/user/getLoginInfo',
      data: {
          nickname: app.globalData.userInfo.nickName,
          city: app.globalData.userInfo.city
      },
      success: function(res) {
       console.log('suuce')
      }
     })
      }
     }
    })
  },
  onShow: function () {
    var app = this;
    console.log('App Show')
    console.log(app.globalData.userInfo)
    console.log(app.globalData.userInfo)
    
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  },
// 获取用户信息，如果用户没有授权，就获取不到
_getUserInfo: function() {
  var app = this;
  wx.getUserInfo({ //从网络获取最新用户信息
   success: function(res) {
    var user = res.userInfo;
    user.openid = app.globalData.openid;
    app.globalData.userInfo = user;
    console.log('请求获取user成功')
    console.log(user)
    wx.request({
        url: app.globalData.baseUrl + '/parking/user/setUserInfo',
        data: {
            nickname: app.globalData.userInfo.nickName,
            city: app.globalData.userInfo.city
        },
        success: function(res) {
         console.log('suuce')
        }
       })
    app._saveUserInfo(user);
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (app.userInfoReadyCallback) {
     app.userInfoReadyCallback(res)
    }
   },
   fail: function(res) { //请求网络失败时，再读本地数据
    console.log('请求获取user失败')
    var userStor = wx.getStorageSync('user');
    if (userStor) {
     console.log('本地获取user')
     app.globalData.userInfo = userStor;
      wx.request({
    url: app.globalData.baseUrl + '/user/getLoginInfo',
    data: {
        nickname: app.globalData.userInfo.nickName,
        city: app.globalData.userInfo.city
    },
    success: function(res) {
     console.log('suuce')
    }
   })
    }
   }
  })
 },

})
