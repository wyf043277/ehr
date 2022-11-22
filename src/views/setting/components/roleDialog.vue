<template>
  <div>
    <el-form ref="roleForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description" style="width: 80%;" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const validName = (rule, value, callback) => {
      if (value.indexOf('员') === -1) {
        callback(new Error(`角色名称中需要含有“员”`))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    editData: {
      handler(newValue, oldValue) {
        if (newValue != null && newValue.name) {
          this.$nextTick(() => {
            for (const item in this.form) {
              this.form[item] = newValue[item]
            }
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style>
</style>
