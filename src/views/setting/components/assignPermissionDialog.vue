<template>
  <div>
        <el-tree ref="tree" :data="permissionList" :props="defaultProps" show-checkbox node-key="id" default-expand-all check-strictly></el-tree>
  </div>
</template>

<script>
  export default {
    props:{
      editData:{
        type:Object,
        default:()=>{}
      },
      permissionList:{
        type:Array,
        default:()=>[]
      }
    },
    data() {
      return {
        form: {
          permissionChecked:[]
        },
        defaultProps:{
          label:'name',
          children:'children'
        }
      }
    },
    watch:{
      editData:{
        immediate:true,
        handler(newValue,oldValue){
          this.$nextTick(()=>{
            this.$refs.tree.setCheckedKeys(newValue.permIds);
          })
        }
      }
    }
  }
</script>

<style>
</style>
