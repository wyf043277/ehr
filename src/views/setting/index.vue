<template>
  <div class="setting-container">
    <div class="app-container">
      <!-- 增加角色弹窗 -->
      <el-dialog
        :title="dialog"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        @close="dialogClose"
      >
        <roleDialog ref="roleDialog" :edit-data="editData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 卡片组件 -->
      <el-card class="box-card">
        <!-- 使用 Tabs 组件完成标签页布局 -->
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first" class="tab-pane">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="addRoles"
              >新增角色</el-button>
            </el-row>
            <!-- 使用 Table 组件实现用户角色的渲染 -->
            <el-table border stripe style="width: 100%" :data="rolesListyhuan">
              <el-table-column type="index" label="序号" width="120" align="center" />
              <el-table-column label="角色名" width="240" prop="name" align="center" />
              <el-table-column label="描述" prop="description" align="center" />
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="small" type="success" @click="setRoles(scope.row)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRoles(scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRoles(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination
              :current-page.sync="query.page"
              :page-sizes="[2, 4, 8, 25]"
              :page-size.sync="query.pagesize"
              :total="total"
              layout="total,sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <el-tab-pane label="公司信息" class="tab-pane">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width:400px" value="江苏WYF股份有限公司" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px" value="江苏省无锡市江阴市" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px" value="2423839638@qq.com" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" :rows="3" disabled style="width:400px" value="仅个人展示" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRolesAPI, addRoleAPI, getRoleByIdAPI, updateRoleByIdAPI,deleteRoleAPI } from '@/api'
import roleDialog from './components/roleDialog.vue'
export default {
  components: {
    roleDialog
  },
  data() {
    return {
      activeName: 'first',
      query: {
        page: 1, // 当前页面
        pagesize: 8 // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total:0,
      dialog: '新增角色', // 弹窗标题 编辑角色 新增角色
      dialogVisible: false,
      editData: {} // 要编辑的角色数据
    }
  },
  computed: {
    rolesListyhuan() {
      let roleTemp = this.rolesList.filter(item => {
        return item.name.indexOf('员') !== -1
      })
      this.total=roleTemp.length
      console.log(roleTemp.length)
      return roleTemp.slice((this.query.page-1)*this.query.pagesize,this.query.page*this.query.pagesize)
      // return roleTemp
    }
  },
  mounted() {
    this.getRoles({
        page: 1, // 当前页面
        pagesize: 100 // 页面显示的条数
      })
  },
  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange() {},

    // 当前页面发生改变时触发
    handleCurrentChange() {},

    addRoles() {
      this.dialogVisible = true
      this.dialog = '新增角色'
    },

    // 设置角色 分配权限
    setRoles() {},

    // 编辑角色
    async editRoles(data) {
      // 数据回显
      try {
        const res = await getRoleByIdAPI(data.id)
        this.editData = res.data
        this.dialogVisible = true
        this.dialog = '编辑角色'
      } catch (e) {
        console.log(e)
      }
    },

    // 删除角色
    delRoles(data) {
          this.$confirm('确认删除？','提示',{
            confirmButtonText: '确认',
            cancelButtonText: '取消',
          })
            .then(async _ => {
              // 调用删除接口
                  const delRoleRes = await deleteRoleAPI(data.id)
                  // 根据状态值, 查看是否删除成功
                  if (!delRoleRes.success) return this.$message.error(delRoleRes.message)
                  // 删除成功需要给用户进行提示
                  this.$message.success(delRoleRes.message)
                  // 删除后需要重新获取当前页面数据
                  this.getRoles({
                      page: 1, // 当前页面
                      pagesize: 100 // 页面显示的条数
                    })
            })
            .catch(_ => {
              this.$message("取消删除")
            })


    },
    async getRoles(params) {
      // 后台获取角色
      try {
        const res = await getRolesAPI(params)
        if (res.success) {
          const data = res.data
          console.log(data)
          this.rolesList = data.rows
        } else {
          this.$message.error(res.message)
        }
      } catch (e) {
        console.log(e)
      }
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
        this.$refs.roleDialog.$refs.roleForm.resetFields()
      })
    },
    dialogCancel() {
      // 弹窗取消按钮触发
      this.dialogVisible = false
    },
    dialogConfirm() {
      // 弹窗确认按钮触发
      this.$refs.roleDialog.$refs.roleForm.validate(async valid => {
        if (valid) {
          try {
            console.log(this.$refs.roleDialog.form)
            if (this.dialog === '新增角色') {
              await addRoleAPI(this.$refs.roleDialog.form)
            } else if (this.dialog === '编辑角色') {
              const res = await updateRoleByIdAPI({ ...this.editData, ...this.$refs.roleDialog.form })
              console.log(res)
            }
            this.getRoles()
            this.dialogVisible = false
            this.$message.success(`${this.dialog}成功`)
          } catch (e) {
            // TODO handle the exception
            console.log(e)
            this.$message.success(`${this.dialog}失败`)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  padding: 10px 30px;
}

.tab-pane {
  padding: 20px;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>
