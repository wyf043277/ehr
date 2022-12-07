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
        <permissionDialog ref="departDialog" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogCancel">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <ActionBox>
        <template slot="slot-left">
          <span>共10条权限</span>
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
              <el-button type="text" size="small" @click="addPermission(scope.row.id)">添加</el-button>
              <el-button type="text" size="smal" @click="editPermission">编辑</el-button>
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
  components: {
    ActionBox,
    permissionDialog
  },
  data() {
    return {
      permissionList: [],
      isEdit: false,
      dialogVisible: false
    }
  },
  beforeMount() {
    this.getPermission()
  },
  methods: {
    addPermission(pid) {
      // 添加权限
      this.isEdit = false
      console.log(pid)
      this.dialogVisible = true
    },
    editPermission() {
      // 编辑权限
      this.isEdit = true
      this.dialogVisible = true
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

    },
    dialogCancel() {
      this.dialogVisible = false
    },
    dialogConfirm() {

    }
  }
}
</script>

<style>
</style>
