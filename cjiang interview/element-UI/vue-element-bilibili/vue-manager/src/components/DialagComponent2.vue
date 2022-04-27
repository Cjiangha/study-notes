<template>
  <el-dialog :visible.sync="currentShow" append-to-body="true"></el-dialog>
</template>

<script>
export default {
  props:['show'],
  computed:{
      currentShow:{
          get(){
              return this.show
          },
          set(val){
              this.$emit("update:show",val)
          }
      }
  }
}
</script>