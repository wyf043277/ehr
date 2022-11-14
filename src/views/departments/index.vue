<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <div slot="header">
          <el-tabs value='first' @tab-click="handleClick">
              <el-tab-pane label="组织导航" name="first" class="tab-pane">

                            <el-row type="flex" justify="space-between" align="middle" class="department-header">
                              <!-- 第一列20份 -->
                              <el-col :span="20">
                                <i class="el-icon-s-home" />
                                <span class="company">江苏WYF股份有限公司</span>
                              </el-col>
                              <!-- 第二列4份 -->
                              <el-col :span="4">
                                <!-- 在容器范围里, 一行再分2列 -->
                                <el-row type="flex" justify="end">
                                  <el-col>负责人</el-col>
                                  <el-col>
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
                                  </el-col>
                                </el-row>
                              </el-col>
                            </el-row>
                          </el-tab-pane>
            </el-tabs>
        </div>
        <el-tree :props="defaultProps" :data="data"  node-key="id" default-expand-all :expand-on-click-node="false" indent=2>
          <template slot-scope="{node,data}">
            <el-row type="flex" justify="space-between" align="middle" class="department-header" style="height: 40px; width: 100%;">
              <!-- 第一列20份 -->
              <el-col :span="20">
                <span class="company">{{node.label}}</span>
              </el-col>
              <!-- 第二列4份 -->
              <el-col :span="4">
                <!-- 在容器范围里, 一行再分2列 -->
                <el-row type="flex" justify="end">
                  <el-col>负责人</el-col>
                  <el-col>
                    <el-dropdown>
                      <!-- 下拉菜单文字 -->
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right" />
                      </span>
                      <!-- 下拉项 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>添加子部门</el-dropdown-item>
                        <el-dropdown-item>编辑部门</el-dropdown-item>
                        <el-dropdown-item>删除部门</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data:[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
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
</style>
