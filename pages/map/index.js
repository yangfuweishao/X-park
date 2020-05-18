// page/map/index.js
var app = getApp()
Page({
  data: {
    info:{
      
    },
    topstatus:0,
    hasLocaton: false,
    location: {
      latitude: 23.114155,
      longitude: 113.318977
    },
    
    markers: []
  },
  markertap(e) {
    console.log("nishishui")
   // var location = this.data.markers[e.markerId]
  
     let that=this;

    console.log(e);
    var url1= 'http://47.110.81.10:8082/parking/net/parking_info'+'?parkId='+e.markerId;
    wx.request({
      url: url1,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
       console.log(res)
       
       var  infor= res.data.result
       console.log(infor)
       console.log(that.info)
       that.setData({
        info: infor,
        topstatus:1
      })
      console.log(that.info)
    
      }
     })
  //   console.log(this.data.markers)
  //   console.log(location)
  //  console.log(location)
    
    
  },
  btn1(e){
   // this;
    console.log(e)
    let that =this;
    console.log(e.currentTarget.dataset.id)
    var url1= 'http://47.110.81.10:8082/parking/net/parking_info'+'?parkId='+e.currentTarget.dataset.id;
    wx.request({
      url: url1,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var  infot= res.data.result
        wx.openLocation({
          latitude: Number(infot.latitude),
          longitude: Number(infot.longitude),
          scale: 15,
          name: infot.name,
          address: infot.address,
          success:function(r){
            console.log(r)
          }
        })
      }
    })
      // var  infor= res.data.result
   // console.log(that.loaction)
   
  
  },
  btn2(e){
    // this;
     console.log(e)
     let that =this;
     //随机生成车位
     let region=Math.floor(Math.random()*35 + 1);
     let ya=['A','B','C','D'];
     let yan=Math.floor(Math.random()*3);
     let port=ya[yan];
     console.log(e.currentTarget.dataset.id)
     wx.showModal({
      title: '提示',
      content: '是否预约该停车位',
      showCancel: false, //去掉取消按钮
      success: function(res) {
        var url3= 'http://47.110.81.10:8082//parking/park/book'+'?parkId='+e.currentTarget.dataset.id+'&nickname='+app.globalData.userInfo.nickName+'&region='+port+'&port='+region;
     wx.request({
       url: url3,
       header: {
         'content-type': 'application/json'
       },
       success: function(res) {
         let success1=res.data.status
         console.log(res)
         console.log(success1)
         if(success1==403){
          wx.showModal({
            title: '提示',
            content: "你已预约过车位了，请处理后再预约",
            showCancel: false, //去掉取消按钮
           })
         }else{
          wx.showModal({
            title: '提示',
            content: "预约成功，请十分钟内前往停车",
            showCancel: false, //去掉取消按钮
           })
         }
        
        console.log("cdbsai")
       }
     })
      }
     })
   },
  controltap(e) {
    var keywords = ''
    if (e.controlId == 0) {
      keywords = ''
    } else if (e.controlId == 1) {
      keywords = ''
    }
    this.getGasLocation(this.data.location.latitude, this.data.location.longitude, keywords)
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('map')
    this.mapCtx.moveToLocation()
  },
  onLoad: function () {
    this.getMyLocation()
  },
  //取消
  cancel(){
    this.setData({
      topstatus:0
    })
  },
  getGasLocation: function (latitude, longitude, keywords) {
    console.log(latitude,longitude,keywords)
    var that = this;
    var url = 'http://47.110.81.10:8082/parking/net/near_list'+'?latitude='+latitude+'&longitude='+longitude;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var pois = res.data.result
        console.log(pois)
        var markers = []
        for (var i = 0; i < pois.length; i++) {
        //  var loc = pois[i].location
        //  var point = loc.split(',')
          markers[i] = {
            id: pois[i].parkId,
            latitude: pois[i].latitude,
            longitude: pois[i].longitude,
            title: pois[i].name,
            iconPath: '/image/location.png',
            address: pois[i].address,
            width: 50,
            height: 50
          }
        }
        that.setData({
          markers: markers
        })
      }
    })
  },

    //移动选点
    onChangeAddress: function() {
      var _page = this;
      wx.chooseLocation({
        success: function(res) {
          console.log(res)
          var location1 = {
            latitude: res.latitude,
            longitude: res.longitude
          }
           console.log(location1)   
          _page.setData({
            chooseAddress: res.name,
            location: location1
          } )
        },
        fail: function(err) {
          console.log(err)
        },
        complete: function () {
          console.log("2geidao")
          // complete
      
          _page.getGasLocation(_page.data.location.latitude, _page.data.location.longitude, '')
         
        }
      })
    },

  getMyLocation: function () {
    
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log("geidao")
        var latitude = res.latitude
        var longitude = res.longitude
        
        that.setData({
          hasLocaton: true
        })

        var location = {
          latitude: latitude,
          longitude: longitude
        }
         console.log(location)
        that.setData({
          location: location
        })
      },
      fail: function () {
        console.log("geidao")
        // fail
      },
      complete: function () {
        console.log("geidao")
        // complete
        if (that.data.hasLocaton) {
          that.getGasLocation(that.data.location.latitude, that.data.location.longitude, '')
        }
      }
    })
  }
})