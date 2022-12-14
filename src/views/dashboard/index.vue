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
      <div class="mainInfo">
        <div class="mainInfo-left">
          <el-card class="box-card">
            <div slot="header">
              <span>工作日历</span>
            </div>
            <el-calendar>
              <template
                slot="dateCell"
                slot-scope="{date, data}"
              >
                <span :class="data.isSelected ? 'text is-selected' : 'text'">{{ formatDate(date) }}</span>
                <span v-if="restDay(date)" class="rest">休</span>
              </template>
            </el-calendar>
          </el-card>
        </div>
        <div class="mainInfo-right">
          <el-card class="box-card">
            <div slot="header">
              <span>绩效指数</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ '列表内容 ' + o }}
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getEmployeesBasicInfoAPI } from '@/api'
import moment from 'moment'
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
  },
  methods: {
    formatDate(date) {
      return moment(date).format('D')
    },
    restDay(date) {
      if (moment(date).weekday() === 6 || moment(date).weekday() === 0) {
        return true
      }
    }
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
.mainInfo{
  display:flex;
  .box-card{
    padding:5px 10px;
    margin-top:20px;
  }
  .mainInfo-left{
    width: 54%;
    padding-right: 26px;
    flex: 1;
    .is-selected{
      display: inline-block;
      border-radius: 50%;
      background-color: #409eff;
      color: #fff;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
    }
    .text{
      width: 20px;
      height: 20px;
      display: inline-block;
    }
    .rest{
      width: 20px;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      color: #fff;
      border-radius: 50%;
      background-color: #fa7c4d;
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .mainInfo-right{
    width: 46%;
    flex: 1;
  }
}

/* 去除边框 */
::v-deep .el-calendar-table tr td:first-child{
  border: none;
}
// ::v-deep .el-calendar-table tr:first-child td{
//   border: none;
// }
::v-deep .el-calendar-table__row td{
  border: none;
}

::v-deep .el-calendar-day{
  text-align: center;
  font-size: 14px;
  height: auto;
}
::v-deep .el-calendar-table thead th {
    padding: 0;
    font-size: 16px;
    color: #606266;
    font-weight:400;
}
::v-deep .el-calendar__header{
  display: none;
}
</style>
