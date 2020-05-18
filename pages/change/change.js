const app = getApp();

Page({
 //页面的初始数据
 data: {
  username: '',
  phone: '',
  zhuohao: '',
  renshu: '',
  isShowComment: false, 
  list: [
     
  ],
  cartime:[

  ],
 },
 
 bindinputusername: function(e) {
  this.setData({
   username: e.detail.value
  })
 },

 bindinputphone: function(e) {
  this.setData({
   phone: e.detail.value
  })
 },

 bindinputzhuohao: function(e) {
  this.setData({
   zhuohao: e.detail.value
  })
 },
 bindinputrenshu: function(e) {
  this.setData({
   renshu: e.detail.value
  })
 },


 

 //生命周期函数--监听页面加载
 onLoad: function(options) {
  let that=this
  let userInfo = app.globalData.userInfo;

  
 
  console.log(app.globalData.userInfo)
  console.log(app.globalData.baseUrl)
  console.log(app.globalData.userInfo.nickName)
    //请求
  wx.request({
   url: 'http://47.110.81.10:8082/parking/feedback/list',
   data:{
    nickname: app.globalData.userInfo.nickName,
   },
   success: function(res) {
     console.log(res)
    
     let dataList = res.data.result;
     console.log(res.data.result)
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
},
  //弹起评论框
  formSubmit(event) {
   // let orderId = event.currentTarget.dataset.orderid;
   let userInfo = app.globalData.userInfo;
   this.setData({
     isShowComment: true,
    // orderId: orderId
    })
   },
   //隐藏评论框
   cancelComment() {
    this.setData({
     isShowComment: false
    })
   },
    //获取评论内容
 setValue(input) {
   this.setData({
    comment: input.detail.value
   })
  },
 //提交
 submitComment() {
    let that = this;
    that.cancelComment();
    let content = that.data.comment;
    let orderId = that.data.orderId;
    if (!content) {
     wx.showToast({
      title: '反馈内容为空',
     })
     return;
    }
  
    wx.request({
     url:  'http://47.110.81.10:8082/parking/feedback/create',
    

     data: {
      nickname: app.globalData.userInfo.nickName,
      contest: content
     },
     success: function(res) {
        console.log(res)
      that.getMyOrderList();
      wx.showToast({
       title: '发布成功',
      })
     }
    })
   },
   //获取
   getMyOrderList() {
    let that = this;
      wx.request({
         url: 'http://47.110.81.10:8082/parking/feedback/list',
         data:{
          nickname: app.globalData.userInfo.nickName,
         },
         success: function(res) {
          if (res && res.data && res.data.data && res.data.data.length > 0) {
           let dataList = res.data.data;
           console.log(dataList)
           that.setData({
            list: dataList
           })
      } else {
       that.setData({
        list: []
       })
      }
     }
    })
   }
})