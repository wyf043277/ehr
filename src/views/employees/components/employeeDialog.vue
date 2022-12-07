<template>
  <!-- 表单 -->
  <el-form ref="employeeForm" label-width="120px" :model="form" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input v-model="form.username" style="width:50%" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="form.mobile" style="width:50%" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="入职时间" prop="timeOfEntry">
      <el-date-picker v-model="form.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
    </el-form-item>
    <el-form-item label="聘用形式" prop="formOfEmployment">
      <el-select v-model="form.formOfEmployment" style="width:50%" placeholder="请选择" value="">
        <el-option
          label="正式"
          :value="1"
        />
        <el-option
          label="非正式"
          :value="2"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="工号" prop="workNumber">
      <el-input v-model="form.workNumber" style="width:50%" placeholder="请输入工号" />
    </el-form-item>
    <el-form-item label="部门" prop="departmentName">
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
    <el-form-item label="转正时间" prop="correctionTime">
      <el-date-picker v-model="form.correctionTime" style="width:50%" placeholder="请选择转正时间" />
    </el-form-item>
  </el-form>
</template>

<script>
import { getDepartmentsListAPI } from '@/api'
import {handleTree} from '@/utils'
export default {
  data() {
    return {
      departmentData: [], // 部门信息
      form: {
        username: '', // 用户名
        mobile: '', // 手机
        password: '', // 密码
        timeOfEntry: '', // 入职日期
        departmentName: '', // 部门名
        workNumber: '', // 工号
        correctionTime: '', // 转正时间
        formOfEmployment: ''// 聘用新式
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ]
      }
    }
  },
  beforeMount() {
    this.getDepartmentsList()
  },
  methods: {
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
        console.log(this.departmentData)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
