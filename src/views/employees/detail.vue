<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs value="first">
          <el-tab-pane label="登录账户设置" name="first">
            <login-setting :user-basic-info="userBasicInfo" @update="updateEmployeesBasicInfo" />
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <userInfo :personal-info="personalInfo" @updatePersonalInfo="updateEmployeesPersonInfo" :user-basic-info="userBasicInfo" @update="updateEmployeesBasicInfo"/>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">岗位信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import userInfo from './components/userInfo.vue'
import loginSetting from './components/loginSetting.vue'
import { getEmployeesBasicInfoAPI, updateEmployeesBasicInfoAPI,getEmployeesPersonInfoAPI,updateEmployeesPersonInfoAPI} from '@/api'
export default {
  components: {
    userInfo,
    loginSetting
  },
  data() {
    return {
      userBasicInfo: {},//基本信息,
      personalInfo:{}//个人信息
    }
  },
 async beforeMount() {
    await this.getEmployeesPersonInfo(this.$route.query.id)
    await this.getEmployeesBasicInfo(this.$route.query.id)
  },
  methods: {
    async getEmployeesBasicInfo(id) {
      const res = await getEmployeesBasicInfoAPI(id)
      if (res.success) {
        this.userBasicInfo = res.data
      }
    },
    async getEmployeesPersonInfo(id) {
      const res = await getEmployeesPersonInfoAPI(id)
      if (res.success) {
        this.personalInfo = res.data
      }
    },
    async updateEmployeesBasicInfo(id, userInfo) {
      console.log("updateEmployeesBasicInfo",id, userInfo)
      const res = await updateEmployeesBasicInfoAPI(id, userInfo)
      if (res.success) {
        this.$message.success('更新成功')
      }
    },
    async updateEmployeesPersonInfo(id, userInfo) {
      console.log("updateEmployeesPersonInfo",id, userInfo)
      const res = await updateEmployeesPersonInfoAPI(id, userInfo)
      if (res.success) {
        this.$message.success('更新成功')
      }
    },
  }
}
</script>
