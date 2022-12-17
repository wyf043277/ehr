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
               <el-select v-model="year" placeholder="请选择" @change="yearChange" style="width=120px">
                  <el-option
                    v-for="item in yearList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="month" placeholder="请选择" @change="monthChange">
                  <el-option
                    v-for="item in 12"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
            <el-calendar v-model="date">
              <template
                slot="dateCell"
                slot-scope="{date, data}"
              >
                <span :class="data.isSelected ? 'text is-selected' : 'text'">{{ formatDate(date) }}</span>
                <span v-if="restDay(date)" class="rest">休</span>
              </template>
            </el-calendar>
          </el-card>
          <el-card class="box-card noticeInfo">
            <div slot="header">
              <span>公告</span>
            </div>
            <Notice v-for="item in notice" :key="item.notice" :notice="item.notice" :date="item.date"></Notice>
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
import Notice from './components/Notice.vue'
export default {
  name: 'Dashboard',
  components: {
    Notice
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    yearList(){
      //可选年份
      let res=[]
      let now = moment(new Date()).year()
      for(let i=now-3;i<now+3;i++){
        res.push({value:i,label:i})
      }
      console.log(res)
      return res
    }
  },
  data() {
    return {
      basicInfo: {},
      date:new Date(),
      year:moment(new Date()).year(),
      month:moment(new Date()).month(),
      notice:[{notice:'第1期“大讲堂”互动讨论获奖名单公布',date:'2022-07-21 15:21:38'},{notice:'公司元旦放假安排',date:'2022-07-19 15:18:25'},{notice:'欢迎各位领导莅临指导',date:'2022-06-15 14:19:38'}]
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
    },
    yearChange(year){
      this.date=new Date(this.date.setFullYear(year))
    },
    monthChange(month){
      this.date=new Date(this.date.setMonth(month-1))
    }
  }
}
</script>

<style lang="scss" scoped>
  .noticeInfo ::v-deep .el-card__body{
    padding-top:0;    
  }
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
