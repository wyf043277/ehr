<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <div class="center">
      <el-button type="primary" round @click="importEmployees">上传</el-button>
    </div>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;" stripe>
      <el-table-column v-for="item of tableHeader" :key="item" :prop="userRelations[item]" :label="item" />
      <el-table-column label="操作" width="280" v-if="tableData.length>0">
        <template slot-scope="scope">
          <el-button type="danger" round size="small" @click="deleteEmployee(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import {importEmployeesAPI} from '@/api'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      userRelations:{
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传超过1M的文件.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    this.tableData =results.map((item)=>{
      let obj={}
      for(let key in item){
        obj[this.userRelations[key]]=item[key]
      }
      return obj
    })
    },
    deleteEmployee(scope){
      this.tableData.splice(scope.$index,1)
    },
    async importEmployees(){
      try{
        let res = await importEmployeesAPI(this.tableData)
        this.$message.success(res.message)
        this.$router.back()
      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>
<style scoped>
  .center{
    display:flex;
    justify-content: center;
    padding-top:15px;
  }
</style>
