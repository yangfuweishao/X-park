// page/index/index.js
var app = getApp()
Page({
  data: {},
  gotoMap: function() {
    // wx.redirectTo({
    //   url: '../map/index',
    // })
  },
  login: function () {
    var that = this
    wx.login({
      success: function(res){
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        that.gotoMap()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLaunch: function() {
    wx.login({
      success: function(res) {
        if (res.code) {
          console.log(res)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    console.log('index show');
    if (e.detail.userInfo) {
      var user = e.detail.userInfo;
      this.setData({
       isShowUserName: true,
       userInfo: e.detail.userInfo,
      })
      user.openid = app.globalData.openid;
      app._saveUserInfo(user);
     } else {
      app._showSettingToast('登陆需要允许授权');
     }
  },
  onReady: function() {
    var that = this
    wx.checkSession({
      success: function(){
        that.gotoMap()
      },
      fail: function(){
        that.login()
      }
    })
  },
  btnclick4:function() {
    wx.navigateTo({
      url: '../map/index'
     })
   },
  onLoad: function () {
  }
})