<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card>
        <el-image
          style="width: 100px; height: 100px;border-radius: 50%;"
          :src="basicInfo.staffPhoto"
          fit="contain"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEmployeesBasicInfoAPI } from '@/api'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  data() {
    return {
      basicInfo: {}
    }
  },
  async mounted() {
    const res = await getEmployeesBasicInfoAPI(this.userInfo.userId)
    this.basicInfo = res.data
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
