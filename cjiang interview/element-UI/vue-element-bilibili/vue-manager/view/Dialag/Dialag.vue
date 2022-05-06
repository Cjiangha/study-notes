<template>
    <div>
        <common-tag></common-tag>
        <a href="javascript:;" @click="show = true">点击</a>
        <Dialag-component :show.sync="show"></Dialag-component>
    </div>
</template>

<script>
/*
    @的作用  表示从/src目录下走

*/ 
import DialagComponent from '../../src/components/DialagComponent.vue'
import CommonTag from '../../src/components/CommonTag.vue'

export default {
    data(){
        return{
            show:false
        }
    },
    components:{
        DialagComponent,
        CommonTag
    }
}
</script>