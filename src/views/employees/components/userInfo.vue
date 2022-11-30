<template>
  <div>
    <el-card shadow="always">
      <el-form ref="loginSetting" label-width="120px" :model="form">
        <div class="left">
          <el-form-item label="工号" prop="workNumber">
            <el-input v-model="form.workNumber" style="width:50%" />
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input v-model="form.username" style="width:50%" />
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile" style="width:80%" placeholder="请输入手机" />
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="入职时间" prop="timeOfEntry">
            <el-input v-model="form.timeOfEntry" style="width:50%" />
          </el-form-item>
          <el-form-item label="部门" prop="departmentName">
            <el-input v-model="form.departmentName" style="width:50%" />
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <el-input v-model="form.formOfEmployment" style="width:80%" />
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        mobile: '',
        workNumber: ''
      }
    }
  }
}
</script>

<style scoped>
  .el-card{
    border: none;
  }
  .el-form{
    display: flex;
    justify-content:space-between;
  }
  .left{
    width: 50%;
  }
  .right{
    width: 50%;
  }
</style>
