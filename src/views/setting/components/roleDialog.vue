<template>
  <div>
    <el-form ref="roleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="角色描述" prop="introduction">
        <el-input v-model="form.introduction" style="width: 80%;" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const validName = (rule, value, callback) => {
      if (value.indexOf('员') == -1) {
        callback(new Error(`角色名称中需要含有“员”`))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        introduction: ''
      },
      rules: {
        name: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>
</style>
