<template>
  <!-- 表单 -->
  <el-form label-width="120px" ref="employeeForm">
    <el-form-item label="姓名">
      <el-input style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机">
      <el-input style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间">
      <el-date-picker style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式">
      <el-select style="width:50%" placeholder="请选择" value="" />
    </el-form-item>
    <el-form-item label="工号">
      <el-input style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门">
      <el-input style="width:50%" placeholder="请选择部门" />
    </el-form-item>
    <el-form-item label="转正时间">
      <el-date-picker style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
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
        username: '',
        mobile: '',
        password:'',
        timeOfEntry:'',
        departmentName:'',
        workNumber:'',
        timeOfEntry:''
      },
      rules: {
        username: [
          { required: true, message: '角色不能为空', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
