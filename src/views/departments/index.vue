<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加部门弹窗 -->
      <el-dialog
        title="添加子部门"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
      <departDialog ref="departDialog"></departDialog>
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
                          <el-dropdown-item>添加子部门</el-dropdown-item>
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
                              <el-dropdown-item @click.native="del(data)">删除部门</el-dropdown-item>
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
import { getDepartmentsListAPI } from '@/api'
import departDialog from './components/departDialog.vue'
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false
    }
  },
  components:{
    departDialog
  },
  computed: {
    treeData() {
      const reg = /部$/
      const temp = this.data.filter(item => {
        return reg.test(item.name)
      })
      return this.handleDepart(temp, '')
    }
  },
  beforeMount() {
    this.getDepartmentsList()
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
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    add(data) {
      this.dialogVisible = true
    },
    edit(data) {},
    del(data) {},
    dialogCancel(){
      this.dialogVisible=false
      console.log(this.$refs.departDialog.form)
    },
    dialogConfirm(){
      this.dialogVisible=false
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
