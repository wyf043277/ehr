<template>
  <el-form ref="roleForm" label-width="120px" :model="form">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="form.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
  </el-form>
</template>

<script>
  export default{
    props: {
      roleList: {
        type: Object
      },
    },
    data() {
      return {
        form: {
          checkedRoles:[]
        }
      }
    },
  }
</script>

<style>
</style>
