<template>
  <div class="dashboard-container">
    <div class="app-container" />
    <!-- 增加员工弹窗 -->
    <el-dialog
      title="新增员工"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      @close="dialogClose"
    >
      <employeeDialog ref="employeeDialog" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <ActionBox>
      <template slot="slot-left">
        <span>共{{ total }}条记录</span>
      </template>
      <template slot="slot-right">
        <el-button type="danger" size="small" @click="$router.push('/excel')">导入excel</el-button>
        <el-button type="success" size="small" @click="exportEmployees">导出excel</el-button>
        <el-button type="primary" size="small" @click="addEmployee">新增员工</el-button>
      </template>
    </ActionBox>
    <el-card style="margin-top: 10px;">
      <el-table border stripe style="width: 100%" :data="employeesList">
        <el-table-column label="序号" type="index" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="头像">
          <template slot-scope="scope" prop="staffPhoto">
            <img :src="scope.row.staffPhoto" alt="" class="staffPhoto" @error="imgError($event)">
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="mobile" />
        <el-table-column label="工号" prop="workNumber" sortable :sort-method="workNumberSort" />
        <el-table-column label="聘用形式" prop="formOfEmployment">
          <template slot-scope="scope">
            <span>{{ +scope.row.formOfEmployment===1?"正式":(+scope.row.formOfEmployment===2?"非正式":"未知") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" sortable />
        <el-table-column label="入职时间" prop="timeOfEntry" />
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push({name:'EmployeesDetail',query:{id:scope.row.id,formOfEmployment:scope.row.formOfEmployment}})">查看</el-button>
            <el-button type="text" size="small">分配角色</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <!-- 分页区域 -->
        <el-pagination
          :current-page="query.page"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="query.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import ActionBox from '@/components/PageTools/ActionBox'
import { getEmployeesAPI, addEmployeesAPI } from '@/api'
import employeeDialog from './components/employeeDialog.vue'
export default {
  components: {
    ActionBox,
    employeeDialog
  },
  data() {
    return {
      query: {
        page: 1, // 页码
        size: 10 // 每页条数
      },
      employeesList: [], // 员工列表
      total: 0, // 数据总条数
      dialogVisible: false,
      downloading: false
    }
  },
  beforeMount() {
    this.getEmployees(this.query)
  },
  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange(newSize) {},

    // 当前页面发生改变时触发
    handleCurrentChange(newPage) {},
    async getEmployees(query) {
      // 获取员工列表
      try {
        const { data: res } = await getEmployeesAPI(query)
        this.total = res.total
        this.employeesList = res.rows
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
    workNumberSort(a, b) {
      console.log(a.workNumber - b.workNumber)
      return a.workNumber - b.workNumber
    },
    imgError(e) {
      e.target.src = 'https://project-waimai.oss-cn-hangzhou.aliyuncs.com/blog/IMG_1515.PNG'
    },
    addEmployee() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    dialogClose() {
      // 当弹窗关闭时，清空表单
      this.$nextTick(() => {
        this.$refs.employeeDialog.$refs.employeeForm.resetFields()
      })
    },
    dialogCancel() {
      // 弹窗取消按钮触发
      this.dialogVisible = false
    },
    async dialogConfirm() {
      // 弹窗确认按钮触发
      console.log(1)
      this.$refs.employeeDialog.$refs.employeeForm.validate(async valid => {
        if (valid) {
          const res = await addEmployeesAPI(this.$refs.employeeDialog.form)
          if (res.success) {
            this.getEmployees()
            this.dialogVisible = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        }
      })
    },
    exportEmployees() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(async excel => {
        const tHeader = ['序号', '姓名', '手机号', '工号', '聘用形式', '部门', '入职时间']
        const res = await getEmployeesAPI({ page: 1, size: this.total })
        const allList = res.data.rows
        const data = allList.map((item, index) => {
          return [index, item.username, item.mobile, item.workNumber, +item.formOfEmployment === 1 ? '正式' : (+item.formOfEmployment === 2 ? '非正式' : '未知'), item.departmentName, item.timeOfEntry]
        })
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '员工列表',
          autoWidth: true,
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .staffPhoto{
    width:50%;
    height:50%;
    border-radius:50%
  }
</style>
