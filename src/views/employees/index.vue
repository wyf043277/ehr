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
        <span>哈哈哈</span>
      </template>
      <template slot="slot-right">
        <el-button type="danger" size="small">导入excel</el-button>
        <el-button type="success" size="small">导出excel</el-button>
        <el-button type="primary" size="small" @click="addEmployee">新增员工</el-button>
      </template>
    </ActionBox>
    <el-card style="margin-top: 10px;">
            <el-table border stripe style="width: 100%" :data="employeesList">
              <el-table-column label="序号" type="index"/>
              <el-table-column label="姓名" prop="username"/>
              <el-table-column label="头像">
                <template slot-scope="scope" prop="staffPhoto">
                  <img :src="scope.row.staffPhoto" alt="" class="staffPhoto" @error="imgError($event)">
                </template>
              </el-table-column>
              <el-table-column label="手机号" prop="mobile"/>
              <el-table-column label="工号" prop="workNumber" sortable :sort-method="workNumberSort"/>
              <el-table-column label="聘用形式" prop="formOfEmployment">
                <template slot-scope="scope">
                  <span>{{scope.row.formOfEmployment===1?"正式":(scope.row.formOfEmployment===2?"非正式":"未知")}}</span>
                </template>
              </el-table-column>
              <el-table-column label="部门" prop="departmentName"/>
              <el-table-column label="入职时间" prop="timeOfEntry"/>
              <el-table-column label="操作" width="280">
                <template>
                  <el-button type="text" size="small">查看</el-button>
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
import {getEmployeesAPI} from '@/api'
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
        total: 0 ,// 数据总条数
        dialogVisible: false
      }
    },
    beforeMount() {
        this.getEmployees()
    },
    methods: {
      // 每页显示的条数发生改变时触发
      handleSizeChange(newSize) {},

      // 当前页面发生改变时触发
      handleCurrentChange(newPage) {},
      async getEmployees(){
        //获取员工列表
        try{
          let {data:res} =await getEmployeesAPI(this.query)
          this.total=res.total
          this.employeesList=res.rows
          console.log(res)
        }catch(e){
          console.error(e)
        }
      },
      workNumberSort(a,b){
        console.log(a.workNumber-b.workNumber)
        return a.workNumber-b.workNumber
      },
      imgError(e){
        e.target.src="https://project-waimai.oss-cn-hangzhou.aliyuncs.com/blog/IMG_1515.PNG"
      },
      addEmployee(){
        this.dialogVisible=true
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
          this.$refs.employeeDialog.$refs.roleForm.resetFields()
        })
      },
      dialogCancel() {
        // 弹窗取消按钮触发
        this.dialogVisible = false
      },
      dialogConfirm() {}

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
