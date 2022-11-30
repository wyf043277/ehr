<template>
  <!-- 表单 -->
  <el-form ref="loginSetting" label-width="120px" :model="form" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="form.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" style="width:50%" placeholder="请输入密码" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="update">更 新</el-button>
      <el-button @click="cancel">取 消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    userBasicInfo: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        username: '', // 用户名
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户姓名不能为空',
            trigger: 'blur'
          },
          { min: 1, max: 6, message: '用户姓名为1-6位', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    userBasicInfo: {
      handler(newValue, oldValue) {
        this.form.username = newValue.username
        this.form.password = newValue.password
      }
    }
  },
  methods:{
    cancel(){
      this.$router.back()
    },
    update(){
      this.$refs.loginSetting.validate((valid) => {
        if (valid) {
          this.$emit('update',this.userBasicInfo.id,{...this.userBasicInfo,...this.form})
        }
      })
    }
  }
}
</script>

<style>
</style>
