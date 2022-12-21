<template>
  <section class="app-main">
    <div class="tabs">
      <span class="tabs-view-item" v-for="item in includeRouter" :key="item.path">
        {{item.name}}
        <span class="el-icon-close"></span>
      </span>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
  import mapGetters from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    ...mapGetters(['includes','includeRouter'])
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.tabs{
  width: 100%;
  height: 36px;
  background-color: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  line-height: 36px;
  .tabs-view-item{
    display: inline-block;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color:#495060;
    background-color: #fff;
    padding: 0 8px;
    font-size: 12px;
  }
  .tabs-view-item:first-of-type{
    margin-left: 15px;
  }
  .tabs-view-item:last-of-type{
    margin-right: 15px;
  }
}
</style>
