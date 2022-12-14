<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card>
        <div class="headInfo">
          <div class="staffPhoto">
            <el-image
              style="width: 100px; height: 100px;border-radius: 50%;vertical-align: middle;"
              :src="basicInfo.staffPhoto"
              fit="contain"
            />
          </div>
          <div class="welcomeInfo">
            <p class="firstchild">早安，{{ userInfo.username }}，祝你开心每一天！</p>
            <p class="lastchild">{{ userInfo.username }} |江苏WYF股份有限公司</p>
          </div>
        </div>
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
  async beforeMount() {
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
.headInfo{
  display:flex;
}
.staffPhoto{
  width: 100px;
  height: 100px;
}
.welcomeInfo{
  margin-left: 20px;
  padding-top: 25px;
  line-height: 25px;
   .firstchild{
     font-size: 24px;
     margin: 0;
   }
   .lastchild{
     font-size: 20px;
     color: #7f8c8d;
     margin: 0;
   }
}

</style>
