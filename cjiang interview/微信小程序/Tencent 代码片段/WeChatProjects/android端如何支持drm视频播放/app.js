App({
  onLaunch: function () {
    wx.request({
      url: 'https://api.weixin.qq.com/shop/ecaftersale/acceptrefund?access_token=55_Q6xxfE2glsEUDao40sUM32jtRPG9gGN8VW3WJ5kLM1phgHFMP9Tbb65PlF_0hfhvWG5zriIf-hNCN5ll6z9oR9Qm4uhpn9aZ2e8Fa2EbBi7lx0fzfAnwQleUQ5esYsAllqwtvNJLSKNyCYeMGEQiAGABZL',
      data:{"aftersale_id": 4000000001404012}
      ,
      complete(e){
        console.log(e)
      }
      /*
      7.同意退款=>失败
https://api.weixin.qq.com/shop/ecaftersale/acceptrefund?access_token=55_Q6xxfE2glsEUDao40sUM32jtRPG9gGN8VW3WJ5kLM1phgHFMP9Tbb65PlF_0hfhvWG5zriIf-hNCN5ll6z9oR9Qm4uhpn9aZ2e8Fa2EbBi7lx0fzfAnwQleUQ5esYsAllqwtvNJLSKNyCYeMGEQiAGABZL
{"aftersale_id": 4000000001404012}
返回：{"errcode": 9700209,"errmsg": "同意退款失败 退款失败 "}
      
      */ 
    })
  }
})
