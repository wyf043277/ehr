<template>
  <el-form ref="roleForm" label-width="120px" :model="form">
    <el-form-item prop="checkedRoles">
      <el-checkbox-group v-model="form.checkedRoles">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    roleList: {
      //所有角色列表
      type: Array,
      default: () => []
    },
    employeeRolesList: {
      //员工角色
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        checkedRoles: []
      }
    }
  },
  watch: {
    employeeRolesList: {
      handler(newValue, oldValue) {
        if (newValue != null) {
          this.$nextTick(() => {
            this.form.checkedRoles = newValue
          })
        }
      }
    }
  }
}
</script>

<style>
</style>
