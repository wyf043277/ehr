<template>
  <div class="dashboard-container">
    <div class="app-container">
      <ActionBox>
        <template slot="slot-left">
          <span>共10条权限</span>
        </template>
        <template slot="slot-right">
          <el-button type="primary" size="small" @click="addPermission">添加权限</el-button>
        </template>
      </ActionBox>
      <el-card style="margin-top: 10px;">
        <el-table border style="width: 100%" :data="permissionList" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addPermission">添加</el-button>
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
import {getPermissionAPI,addPermissionAPI,deletePermissionAPI,getPermissionByIdAPI,updatePermissionByIdAPI} from '@/api'
import {handleTree} from '@/utils'
export default {
  components: {
    ActionBox
  },
  data() {
    return {
      permissionList: []
    }
  },
  beforeMount() {
    this.getPermission()
  },
  methods:{
    addPermission(){
      //添加权限
    },
    editPermission(){
      //编辑权限
    },
    async deletePermission(id){
      //删除权限
      let res = await deletePermissionAPI(id)
      console.log(res)
      this.getPermission()
    },
    async getPermission(){
      let res =await getPermissionAPI()
      if(res.success){
        let data =res.data.filter(item=>{
          return item.pid!=undefined
        })
        this.permissionList=handleTree(data,"0")
      }
    }
  }
}
</script>

<style>
</style>
