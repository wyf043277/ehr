<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加部门弹窗 -->
      <el-dialog
        :title="isEdit?'编辑部门':'添加子部门'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        @close="dialogClose"
      >
        <departDialog ref="departDialog" :empolyees-simple-list="EmpolyeesSimpleList" :edit-data="editData" :department-flat="departmentFlat" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <el-card>
        <div slot="header">
          <el-tabs value="first">
            <el-tab-pane label="组织导航" name="first" class="tab-pane">

              <div class="department-wrap">
                <!-- 第一列20份 -->
                <div>
                  <i class="el-icon-s-home" />
                  <span class="company">江苏WYF股份有限公司</span>
                </div>
                <!-- 第二列4份 -->
                <div>
                  <!-- 在容器范围里, 一行再分2列 -->
                  <div class="interactive">
                    <div class="interactive-content">负责人</div>
                    <div class="interactive-content">
                      <!-- 这个之前在头部导航右侧下拉菜单讲过 -->
                      <el-dropdown>
                        <!-- 下拉菜单文字 -->
                        <span class="el-dropdown-link">
                          操作<i class="el-icon-arrow-down el-icon--right" />
                        </span>
                        <!-- 下拉项 -->
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item @click.native="add({&quot;id&quot;:&quot;&quot;})">添加子部门</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
              </div>
              <el-tree :props="defaultProps" :data="treeData" node-key="id" default-expand-all expand-on-click-node class="tree">
                <template slot-scope="{node,data}">
                  <div class="department-wrap">
                    <!-- 第一列20份 -->
                    <div>
                      <span>{{ data.name }}</span>
                    </div>
                    <!-- 第二列4份 -->
                    <div>
                      <!-- 在容器范围里, 一行再分2列 -->
                      <div class="interactive">
                        <div class="interactive-content">{{ data.manager }}</div>
                        <div class="interactive-content" @click.stop>
                          <el-dropdown>
                            <!-- 下拉菜单文字 -->
                            <span class="el-dropdown-link">
                              操作<i class="el-icon-arrow-down el-icon--right" />
                            </span>
                            <!-- 下拉项 -->
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item @click.native="add(data)">添加子部门</el-dropdown-item>
                              <el-dropdown-item @click.native="edit(data)">编辑部门</el-dropdown-item>
                              <el-dropdown-item v-if="data && !data.children" @click.native="del(data)">删除部门</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartmentsListAPI, getEmpolyeesSimpleListAPI, addDepartmentAPI, getDepartmentAPI, editDepartmentAPI, delDepartmentAPI } from '@/api'
import departDialog from './components/departDialog.vue'
export default {
  components: {
    departDialog
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      EmpolyeesSimpleList: [],
      pid: '', // 添加部门的父级id
      editData: {}, // 编辑部门复显
      isEdit: false, // 判断是否编辑部门
      departmentFlat: []// 所有部门的扁平化信息
    }
  },
  computed: {
    treeData() {
      const reg = /部$/
      const temp = this.data.filter(item => {
        if (item.name.indexOf('黑马') != -1) {
          return false
        }
        return reg.test(item.name)
      })
      this.departmentFlat = temp
      return this.handleDepart(temp, '')
    }
  },
  beforeMount() {
    this.getDepartmentsList()
    this.getEmpolyeesSimpleList()
  },
  methods: {
    async getDepartmentsList() {
      try {
        const res = await getDepartmentsListAPI()
        this.data = res.data.depts
      } catch (e) {
        this.$message.error('获取组织架构失败')
      }
    },
    handleDepart(arr, pid) {
      // 将扁平数据变得有层级
      const res = []
      arr.forEach((item) => {
        if (item.pid == pid) {
          const children = this.handleDepart(arr, item.id)
          if (children.length != 0) {
            res.push({ ...item, children })
          } else {
            res.push(item)
          }
        }
      })
      return res
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
    add(data) {
      this.dialogVisible = true
      this.pid = data.id
      this.isEdit = false
      this.editData = { pid: data.id }
    },
    async edit(data) {
      try {
        const res = await getDepartmentAPI(data.id)
        this.editData = res.data
        this.dialogVisible = true
        this.isEdit = true
      } catch (e) {
        console.log(e)
      }
    },
    del(data) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async _ => {
          // 调用删除接口
          const delDepartRes = await delDepartmentAPI(data.id)
          // 根据状态值, 查看是否删除成功
          if (!delDepartRes.success) return this.$message.error(delDepartRes.message)
          // 删除成功需要给用户进行提示
          this.$message.success(delDepartRes.message)
          // 删除后需要重新获取当前页面数据
          this.getDepartmentsList()
        })
        .catch(_ => {
          this.$message('取消删除')
        })
    },
    dialogCancel() {
      this.dialogVisible = false
    },
    async dialogConfirm() {
      this.$refs.departDialog.$refs.deptForm.validate(async(valid) => {
        if (valid) {
          if (this.isEdit) {
            const data = { ...this.$refs.departDialog.form, id: this.editData.id }
            const res = await editDepartmentAPI(data)
            if (res.success) {
              this.getDepartmentsList()
              this.dialogVisible = false
              this.$message.success('编辑部门成功')
            } else {
              this.$message.error('编辑部门失败')
            }
          } else {
            const data = { ...this.$refs.departDialog.form, pid: this.pid }
            try {
              const res = await addDepartmentAPI(data)
              if (res.success) {
                this.dialogVisible = false
                this.getDepartmentsList()
                this.$message.success('添加部门成功')
              } else {
                this.$message.success('添加部门失败')
              }
            } catch (e) {
              console.log(e)
            }
          }
        }
      })
    },
    async getEmpolyeesSimpleList() {
      try {
        const res = await getEmpolyeesSimpleListAPI()
        const data = res.data.slice(0, 100)
        this.EmpolyeesSimpleList = data.filter(item => {
          if (item.username) {
            return true
          }
        })
      } catch (e) {
        // TODO handle the exception
        console.log(e)
        console.log('获取用户列表失败')
      }
    },
    dialogClose() {
      // 当弹窗关闭时，清空表单
      this.$nextTick(() => {
        this.$refs.departDialog.$refs.deptForm.resetFields()
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .box-card {
    padding: 10px 30px;
  }

  .tab-pane {
    padding: 20px 80px;

    .company {
      margin-left: 12px;
      font-weight: bold;
      font-size: 14px;
    }

    .department-header {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }
  }
  .tree{
    margin-top:12px;
  }
  .department-wrap{
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .interactive{
      display: flex;
      .interactive-content{
        margin-right:45px;
      }
    }
  }
</style>
