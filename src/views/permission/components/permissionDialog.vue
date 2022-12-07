<template>
  <div>
    <el-form ref="permissionForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="form.code" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="form.description" style="width: 80%;" />
      </el-form-item>
      <el-form-item label="开启" prop="enVisible">
        <el-switch
          v-model="form.enVisible"
          active-value="1"
          inactive-value="0"
        />
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
    return {
      form: {
        name: '',
        code: '',
        description: '',
        enVisible: '0'
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' }
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
