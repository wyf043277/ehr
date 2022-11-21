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
      <roleDialog ref="roleDialog"></roleDialog>
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
            <el-table border stripe style="width: 100%" :data="rolesListyhuan" >
              <el-table-column type="index" label="序号" width="120" align="center"/>
              <el-table-column label="角色名" width="240" prop="name" align="center"/>
              <el-table-column label="描述" prop="description" align="center"/>
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
              :current-page="query.page"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="query.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
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
                <el-input disabled style="width:400px" value="江苏WYF股份有限公司"/>
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px"  value="江苏省无锡市江阴市"/>
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
  import {getRolesAPI} from '@/api'
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
        pagesize: 10 // 页面显示的条数
      },
      rolesList: [], // 角色列表
      total: 0 ,// 角色数据总条数
      dialog:"新增角色",//弹窗标题 编辑角色 新增角色
      dialogVisible:false
    }
  },
  computed: {
    rolesListyhuan() {
      return this.rolesList.filter(item=>{
        return item.name.indexOf('员')!=-1
      })
    }
  },
  methods: {
    // 每页显示的条数发生改变时触发
    handleSizeChange() {},

    // 当前页面发生改变时触发
    handleCurrentChange() {},

    addRoles(){
      this.dialogVisible=true
    },

    // 设置角色
    setRoles() {},

    // 编辑角色
    editRoles() {},

    // 删除角色
    delRoles() {},
    async getRoles(params){
      try{
        let res = await getRolesAPI(params)
        if(res.success){
          let data=res.data
          console.log(data)
          this.total=data.total
          this.rolesList=data.rows
        }else{
          this.$message.error(res.message)
        }
      }catch(e){
        console.log(e)
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    dialogClose(){
      //当弹窗关闭时，清空表单
      this.$nextTick(() => {
        this.$refs.roleDialog.$refs.roleForm.resetFields()
      })
    },
    dialogCancel(){
      this.dialogVisible=false
    },
    dialogConfirm(){
      this.$refs.roleDialog.$refs.roleForm.validate(async valid =>{
        if(valid){
          this.dialogVisible=false
        }
      })
    }
  },
  mounted() {
    this.getRoles(this.query)
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
