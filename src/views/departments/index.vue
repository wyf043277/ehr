<template>
  <div class="dashboard-container">
    <div class="app-container">
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
              <el-tree :props="defaultProps" :data="data" node-key="id" default-expand-all :expand-on-click-node="false" class="tree">
                <template slot-scope="{node,data}">
                  <div class="department-wrap">
                    <!-- 第一列20份 -->
                    <div>
                      <span>{{ node.label }}</span>
                    </div>
                    <!-- 第二列4份 -->
                    <div>
                      <!-- 在容器范围里, 一行再分2列 -->
                      <div class="interactive">
                        <div class="interactive-content">负责人</div>
                        <div class="interactive-content">
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
export default {
  data() {
    return {
      data: [{
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
    margin-top:15px;
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
