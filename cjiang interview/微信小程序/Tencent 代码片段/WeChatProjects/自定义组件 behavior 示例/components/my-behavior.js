// my-behavior.js

/*
behavior 的定义 
    properties   同组件的属性	
    data         同组件的数据	
    methods      同自定义组件的方法	
    behaviors    引入其它的 behavior	

    生命周期 
    created
    attached
    ready
    moved
    detached
*/ 


module.exports = Behavior({
  behaviors: [],
  properties: {
    myBehaviorProperty: {
      type: String
    }
  },
  data: {
    myBehaviorData: 'my-behavior-data'
  },
  created: function () {
    console.log('[my-behavior] created')
  },
  attached: function () {
    console.log('[my-behavior] attached')
  },
  ready: function () {
    console.log('[my-behavior] ready')
  },

  methods: {
    myBehaviorMethod: function () {
      console.log('[my-behavior] log by myBehaviorMehtod')
    },
  }
})