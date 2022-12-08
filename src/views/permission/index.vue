<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加权限弹窗 -->
      <el-dialog
        :title="isEdit?'编辑权限':'添加权限'"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        @close="dialogClose"
      >
        <permissionDialog ref="permissionDialog" :editData="editData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <ActionBox>
        <template slot="slot-left">
          <span>共{{total}}条权限</span>
        </template>
        <template slot="slot-right">
          <el-button type="primary" size="small" @click="addPermission('0')">添加权限</el-button>
        </template>
      </ActionBox>
      <el-card style="margin-top: 10px;">
        <el-table border style="width: 100%" :data="permissionList" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" v-if="scope.row.type!==2" @click="addPermission(scope.row.id)">添加</el-button>
              <el-button type="text" size="smal" @click="editPermission(scope.row.id)">编辑</el-button>
              <el-button type="text" size="small" @click="deletePermission(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import ActionBox from '@/components/PageTools/ActionBox'
import permissionDialog from './components/permissionDialog.vue'
import { getPermissionAPI, addPermissionAPI, deletePermissionAPI, getPermissionByIdAPI, updatePermissionByIdAPI } from '@/api'
import { handleTree } from '@/utils'
export default {
  computed: {
    type() {
      //是否是叶子节点
      return this.pid==='0'?1:2
    }
  },
  components: {
    ActionBox,
    permissionDialog
  },
  data() {
    return {
      permissionList: [],
      isEdit: false,
      dialogVisible: false,
      pid:'0' ,//当前要添加权限的父级
      editData:{},
      total:0
    }
  },
  beforeMount() {
    this.getPermission()
  },
  methods: {
    addPermission(pid) {
      // 添加权限
      this.isEdit = false
      this.dialogVisible = true
      this.pid=pid
    },
    async editPermission(id) {
      // 编辑权限
      let res =await getPermissionByIdAPI(id)
      if(res.success){
        this.isEdit = true
        this.dialogVisible = true
        this.editData=res.data
      }
    },
    async deletePermission(id) {
      // 删除权限
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(async _ => {
          // 调用删除接口
          const delPermission = await await deletePermissionAPI(id)
          // 根据状态值, 查看是否删除成功
          if (!delPermission.success) return this.$message.error(delPermission.message)
          // 删除成功需要给用户进行提示
          this.$message.success(delPermission.message)
          // 删除后需要重新获取当前页面数据
          this.getPermission()
        })
        .catch(_ => {
          this.$message('取消删除')
        })
    },
    async getPermission() {
      const res = await getPermissionAPI()
      if (res.success) {
        const data = res.data.filter(item => {
          return item.pid !== undefined
        })
        this.total=data.length
        this.permissionList = handleTree(data, '0')
        console.log(this.permissionList)
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
        this.$refs.permissionDialog.$refs.permissionForm.resetFields()
      })
    },
    dialogCancel() {
      this.dialogVisible = false
    },
    dialogConfirm() {
      // 弹窗确认按钮触发
      this.$refs.permissionDialog.$refs.permissionForm.validate(async valid => {
        if (valid) {
          if(this.isEdit){
            const res = await updatePermissionByIdAPI(this.$refs.permissionDialog.form.id,{...this.$refs.permissionDialog.form})
            if (res.success) {
              this.getPermission()
              this.dialogVisible = false
              this.$message.success('添加成功')
            } else {
              this.$message.error('添加失败')
            }

          }else{
            const res = await addPermissionAPI({...this.$refs.permissionDialog.form,type:this.type,pid:this.pid})
            if (res.success) {
              this.getPermission()
              this.dialogVisible = false
              this.$message.success('添加成功')
            } else {
              this.$message.error('添加失败')
            }
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
