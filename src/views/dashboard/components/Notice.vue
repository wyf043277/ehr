<template>
  <div class="notice">
    <img src="http://ihrm.itheima.net/static/img/img.0615818f.jpeg" alt="">
    <div>
      <p>{{notice}}</p>
      <p>{{date}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      notice:{
        type:String,
        default:()=>{}
      },
      date:{
        type:String,
        default:()=>{}
      }
    }
  }
</script>

<style lang="less" scoped>
  .notice{
    display:flex;
    justify-content:flex-start;
    border-bottom:1px solid #ccc;
    padding:18px 0 10px;
    line-height:1.15;
    img{
      width:56px;
      height:56px;
      border-radius:50%;
      margin-right:10px;
    }
    p{
      padding:0 0 8px;
      font-size:16px;
    }
  }

</style>
