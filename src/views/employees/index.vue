<template>
  <div class="dashboard-container">
    <div class="app-container" />
    <ActionBox>
      <template slot="slot-left">
        <span>哈哈哈</span>
      </template>
      <template slot="slot-right">
        <el-button type="danger" size="small">导入excel</el-button>
        <el-button type="success" size="small">导出excel</el-button>
        <el-button type="primary" size="small">新增员工</el-button>
      </template>
    </ActionBox>
  </div>
</template>

<script>
import ActionBox from '@/components/PageTools/ActionBox'
export default {
  components: {
    ActionBox
  }
}
</script>

<style>
</style>
