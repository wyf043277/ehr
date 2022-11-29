<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs value="first">
          <el-tab-pane label="登录账户设置" name="first">
            <login-setting :user-basic-info="userBasicInfo" />
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">个人详情</el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">岗位信息</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import userInfo from './components/userInfo.vue'
import loginSetting from './components/loginSetting.vue'
import { getEmployeesBasicInfoAPI } from '@/api'
export default {
  components: {
    userInfo,
    loginSetting
  },
  data() {
    return {
      userBasicInfo: {}
    }
  },
  beforeMount() {
    this.getEmployeesBasicInfo(this.$route.query.id)
  },
  methods: {
    async getEmployeesBasicInfo(id) {
      const res = await getEmployeesBasicInfoAPI(id)
      if (res.success) {
        this.userBasicInfo = res.data
      }
    }
  }
}
</script>
