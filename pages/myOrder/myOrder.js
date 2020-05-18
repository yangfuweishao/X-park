//JS
var app = getApp()
let orderStatus = 1;
Page({
 data: {
     
  // 顶部菜单切换
  navbar: ["已停车", "已预约"],
  // 默认选中菜单
  currentTab: 0,
  isShowComment: false, 
  list: []
 },
 //顶部tab切换
 navbarTap: function(e) {
  let index = e.currentTarget.dataset.idx;
  this.setData({
   currentTab: index
  })


  if (index == 1) {
   orderStatus = 2;
  } else if (index == 2) {
   orderStatus = 3;
  } else if (index == 3) {
   orderStatus = 4;
  } else {
   orderStatus = 1;
  }
  this.getMyOrderList();
 },

 onShow: function() {
  this.getMyOrderList();
 },

 getMyOrderList() {
  let that = this;
  let openid = app.globalData.userInfo.nickName;
  if (!openid) {
   return;
  }
  //请求自己后台获取用户openid
    this.yang()
 },
 //停车
 goCommentPage1(e) {
    let that = this;
    wx.request({
        url: 'http://47.110.81.10:8082/parking/park/in',
        data: {
         nickname: app.globalData.userInfo.nickName,
         parkId: e.currentTarget.dataset.parkid
        },
        success: function(res) {
            that.yang()
        }
       })
 },
 //取消
 goCommentPage2(e) {
     let that = this;
     console.log(e.currentTarget.dataset.parkid)
    wx.request({
        url: 'http://47.110.81.10:8082/parking/park/cancel_record',
        data: {
         nickname: app.globalData.userInfo.nickName,
         parkId: e.currentTarget.dataset.parkid
        },
        success: function(res) {
            that.yang()
        }
       })
   },
   //取车
   goCommentPage3(e) {
    let that = this;
    console.log('3')
    console.log(e.currentTarget.dataset.parkid)
   wx.request({
       url: 'http://47.110.81.10:8082/parking/park/out',
       data: {
        nickname: app.globalData.userInfo.nickName,
        parkId: e.currentTarget.dataset.parkid
       },
       success: function(res) {
           that.yang()
       }
      })
  },
  //删除记录
  goCommentPage4(e) {
    let that = this;
    console.log('4')
    console.log(e.currentTarget.dataset.parkid)
   wx.request({
       url: 'http://47.110.81.10:8082/parking/park/delete',
       data: {
        nickname: app.globalData.userInfo.nickName,
        parkId: e.currentTarget.dataset.parkid,
        out_time:e.currentTarget.dataset.outtime
       },
       success: function(res) {
           that.yang()
       }
      })
  },
  //获取列表
yang(){
    let that=this
    console.log(app.globalData.userInfo.nickName)
    wx.request({
     url: 'http://47.110.81.10:8082/parking/park/list',
     data: {
      nickname: app.globalData.userInfo.nickName,
      status: orderStatus
     },
     success: function(res) {
      console.log(res.data.result);
       let dataList = res.data.result;
       console.log(dataList)
       that.setData({
        list: dataList
       })
     }
    })
},
 formatDate(date){
    console.log("zhixinl")
    let that=this;
   date = new Date(date);
   var y=date.getFullYear();
   var m=date.getMonth()+1;
   var d=date.getDate();
   var h=date.getHours();
   var m1=date.getMinutes();
   var s=date.getSeconds();
   m = m<10?("0"+m):m;
   d = d<10?("0"+d):d;
   let yang = y+"-"+m+"-"+d+" "+h+":"+m1+":"+s;
   console.log(yang)
  // this.date.cartime.push(yang)
  that.setData({
   cartime:yang
  })
   return yang;
}
})