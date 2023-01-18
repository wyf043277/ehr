<template>
  <section class="app-main">
    <div class="tabs">
      <span class="tabs-view-item" :class="{active:isActive(item)}" v-for="item in includeRouter" :key="item.path" @click="changeTab(item)">
        {{item.meta.title}}
        <span class="el-icon-close closeTab" @click.prevent.stop="closeTab(item)"></span>
      </span>
    </div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="includes">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    ...mapGetters(['includes','includeRouter'])
  },
  methods:{
    closeTab(item){
      this.$store.commit('router/REMOVE_INCLUDES',item)
      console.log(this.$store.getters.includes)
      console.log(this.$store.getters.includeRouter)
      this.$router.replace({name:this.$store.getters.includeRouter.slice(-1).name})
    },
    changeTab(item){
      this.$router.replace({name:item.name})
      console.log(this.$store.getters.includes)
      console.log(this.$store.getters.includeRouter)
    },
    isActive(item){
      return this.$route.name==item.name
    }
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
    margin-left: 5px;
  }
  .tabs-view-item:first-of-type{
    margin-left: 15px;
  }
  .tabs-view-item:last-of-type{
    margin-right: 15px;
  }
  .closeTab{
    display: inline-block;
    width: 12px;
    height: 12px;
    cursor:pointer;
  }
  .closeTab:hover{
    background-color: #d8dce5;
    border-radius: 50%;
  }
  .active{
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
  }
  .active:before{
    content: "";
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }
}
</style>
