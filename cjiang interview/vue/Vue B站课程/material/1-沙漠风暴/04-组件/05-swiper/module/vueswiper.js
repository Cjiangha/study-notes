Vue.component("swiperItem",{
    template:`
      <div class="swiper-slide">
        <slot></slot>
      </div>
    `
  })
  Vue.component("swiper",{
    props:{
        loop:{
            type:Boolean,
            default:true
        }
    },
    template:`
      <div class="swiper-container kerwin">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
        <div class="swiper-pagination"></div>
      </div>`,

    mounted(){
      // console.log("mounted")
      new Swiper(".kerwin", {
          // direction:"vertical", //垂直
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
          },
          loop: this.loop,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          }
        })
    },
    destroyed(){
      // console.log("destroy")

      //
    }
  })