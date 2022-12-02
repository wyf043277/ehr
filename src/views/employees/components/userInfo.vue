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
          <el-form-item label="手机" prop="mobile">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false">
             <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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

        <el-form-item>
          <el-button type="primary" @click="">保存更新</el-button>
          <el-button @click="">返回</el-button>
        </el-form-item>
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

<style scoped="scoped">
  .el-card{
    border: none;
  }
  .el-form{
    display: flex;
    justify-content:space-between;
    flex-wrap:wrap;
  }
  .left{
    width: 50%;
  }
  .right{
    width: 50%;
  }
    .avatar-uploader ::v-deep  .el-upload{
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
</style>
