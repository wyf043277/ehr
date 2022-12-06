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
        <el-table border stripe style="width: 100%" :data="permissionList">
          <el-table-column label="序号" type="index" />
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="mobile" />
          <el-table-column label="描述" prop="workNumber" sortable :sort-method="workNumberSort" />>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addPermission">添加</el-button>
              <el-button type="text" size="smal" @click="editPermission">编辑</el-button>
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
  </div>
</template>

<script>
import ActionBox from '@/components/PageTools/ActionBox'
export default {
  components: {
    ActionBox
  },
  data() {
    return {
      permissionList: []
    }
  }

}
</script>

<style>
</style>
