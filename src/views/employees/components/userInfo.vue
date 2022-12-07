<template>
  <div>
    <el-card>
      <el-form ref="personal" label-width="120px" :model="form" class="userInfo">
        <div class="left">
          <el-form-item label="工号" prop="workNumber">
            <el-input v-model="form.workNumber" style="width:50%" />
          </el-form-item>
          <el-form-item label="姓名" prop="username">
            <el-input v-model="form.username" style="width:50%" />
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="form.mobile" style="width:80%" placeholder="请输入手机" readonly/>
          </el-form-item>
          <el-form-item label="员工头像" prop="staffPhoto">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request='uploadStaffPhoto'
              :show-file-list="false"
              >
             <img v-if="form.staffPhoto" :src="form.staffPhoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <el-progress type="circle" :percentage="percentage" v-if="showProgress" class="progress" color="#"></el-progress>
            </el-upload>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="入职时间" prop="timeOfEntry">
            <!-- <el-input v-model="form.timeOfEntry" style="width:50%" /> -->
            <el-date-picker
              v-model="form.timeOfEntry"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="部门" prop="departmentName">
            <!-- <el-input v-model="form.departmentName" style="width:50%" /> -->
            <el-cascader
              v-model="form.departmentName"
              :options="departmentData"
              :props="{ expandTrigger: 'hover',value:'name',label:'name',emitPath:false}"
              placeholder="请选择部门"
              style="width:50%"
              :show-all-levels="false"
              filterable
            />
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <!-- <el-input v-model="form.formOfEmployment" style="width:80%" />
             -->
             <el-select v-model="form.formOfEmployment" style="width:20%">
               <el-option
                 v-for="item in formOfEmploymentList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="updateBasicInfo">保存更新</el-button>
          <el-button @click="cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <div slot="header" class="itemTitile">
        <span>基础信息</span>
      </div>
      <el-form label-width="120px" ref="userBasic" :model="form">
        <el-form-item label="最高学历" prop="theHighestDegreeOfEducation">
          <el-select v-model="form.theHighestDegreeOfEducation" style="width:25%">
                <el-option
                  v-for="item in education"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工照片" prop="staffPhoto">
            <el-upload
              class="avatar-uploader"
              action=""
              list-type="picture-card"
              :show-file-list="false">
             <img v-if="form.staffPhoto" :src="form.staffPhoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="国家/地区" prop="nationalArea">
          <el-select v-model="form.nationalArea" style="maxWidth:15%">
            <el-option
              v-for="item in area"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="护照号" prop=" passportNo">
          <el-input v-model="form.passportNo" style="width:20%" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="form.idNumber" style="width:20%" />
        </el-form-item>
        <el-form-item label="籍贯" prop="nativePlace">
          <el-input v-model="form.nativePlace" style="width:20%" />
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input v-model="form.nation" style="width:20%" />
        </el-form-item>
        <el-form-item label="婚姻状况" prop="maritalStatus">
          <el-select v-model="form.maritalStatus" style="width:20%">
            <el-option
              v-for="item in marry"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-input v-model="form.birthday" style="width:20%" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" style="width:20%" />
        </el-form-item>
        <el-form-item label="星座" prop="constellation">
          <el-select v-model="form.constellation" style="width:20%">
            <el-option
              v-for="item in constellation"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="血型" prop="bloodType">
          <el-select v-model="form.bloodType" style="width:20%">
            <el-option
              v-for="item in bloodType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现居住地" prop="placeOfResidence" style="width:40%">
          <el-input v-model="form.placeOfResidence" />
        </el-form-item>
        <el-form-item label="政治面貌" prop="politicalOutlook" style="width:40%">
          <el-input v-model="form.politicalOutlook" />
        </el-form-item>
        <el-form-item label="入党时间" prop="timeToJoinTheParty" style="width:20%">
          <el-date-picker
            v-model="form.timeToJoinTheParty"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="update">保存更新</el-button>
          <el-button @click="cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getDepartmentsListAPI } from '@/api'
  import {uploadToCos} from '@/cors'
  import {handleTree} from '@/utils'
export default {
  props: {
    personalInfo: {
      type: Object
    },
    userBasicInfo: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        username: '',//姓名
        mobile: '',//手机
        workNumber: '',//工号
        timeOfEntry:'',//入职时间
        departmentName:'',//部门
        formOfEmployment:+this.$route.query.formOfEmployment===1?"正式":(+this.$route.query.formOfEmployment===2?"非正式":"未知"),//聘用形式
        staffPhoto:'',//员工头像
        theHighestDegreeOfEducation:'',//最高学历
        nationalArea:'',//国家/地区
        passportNo:'',//护照号
        idNumber:'',//身份证号
        nativePlace:'',//籍贯
        nation:'',//民族，
        maritalStatus:'',//婚姻状况
        birthday:'',//生日
        age:'',//年龄
        constellation:'',//星座
        placeOfResidence:'',//现居住地
        timeToJoinTheParty:''//入党时间
      },
      education:['初中','高中','中专','大专','本科','硕士','博士','其他'],
      area:['中国大陆','港澳台国外'],
      marry:['未婚','已婚','离异'],
      constellation:['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座','天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
      bloodType:['A型','B型','O型','AB型'],
      formOfEmploymentList:[{
        value:1,
        label:"正式"
      },{
        value:2,
        label:"非正式"
      }],
      departmentData:[],
      showProgress:false,
      percentage:0
    }
  },
  beforeMount() {
    this.getDepartmentsList()
  },
  methods:{
    async getDepartmentsList() {
      try {
        const res = await getDepartmentsListAPI()
        const reg = /部$/
        const temp = res.data.depts.filter(item => {
          if (item.name.indexOf('黑马') != -1) {
            return false
          }
          return reg.test(item.name)
        })
        this.departmentData = handleTree(temp, '')
      } catch (e) {
        console.log(e)
      }
    },
      cancel(){
        this.$router.back()
      },
      update(){
        this.$refs.personal.validate((valid) => {
          if (valid) {
            this.$emit('updatePersonalInfo',this.userBasicInfo.id,{...this.personalInfo,...this.form})
          }
        })
      },
      updateBasicInfo(){
        this.$refs.userBasic.validate((valid) => {
          if (valid) {
            this.$emit('update',this.userBasicInfo.id,{...this.userBasicInfo,...this.form})
          }
        })
      },
      async uploadStaffPhoto({file}){
        try{
          this.showProgress=true
          let res = await uploadToCos(file.name,file,(processData)=>{
            this.percentage=parseInt(processData.percent*100)
          })
          this.form.staffPhoto="http://"+res.Location
          this.showProgress=false
        }catch(e){
          console.log(e)
        }
      }
  },
  watch: {
    personalInfo: {
      handler(newValue, oldValue) {
        for(let item in this.form){
          if(newValue[item]){
            this.form[item]=newValue[item]
          }
        }
      }
    },
    userBasicInfo: {
      handler(newValue, oldValue) {
        for(let item in this.form){
          if(newValue[item]){
            this.form[item]=newValue[item]
          }
        }
      }
    }
  },
}
</script>

<style scoped="scoped">
  .el-card{
    border: none;
  }
  .userInfo{
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
  .itemTitile{
    margin-left:10px
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .progress{
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    background: #e4e4e4;
    border-radius: 50%;
    opacity: 0.9;
  }
</style>
