<template>
  <div>
    <el-form ref="deptForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" style="width: 80%;" placeholder="2-10个字符"/>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="form.code" style="width: 80%;" placeholder="1-20个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="form.manager" style="width: 80%;" placeholder="必填">
         <el-option v-for="item in EmpolyeesSimpleList" :key="item.id" :value="item.username"/>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="form.introduce" style="width: 80%;" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props:{
    EmpolyeesSimpleList:{
      type:Array,
      default:()=>[]
    },
    editData:{
      type:Object,
      default:{}
    },
    departmentFlat:{
      //所有部门扁平信息
      type:Array,
      default:()=>[]
    }
  },
  data() {
    const validCode=(rule,value,callback)=>{
      let res=this.departmentFlat.filter((item)=>{
        if(item.code==value&&this.editData.id!=item.id){
          return true
        }
      })
      res.length >0 ?callback(new Error(`部门编码${value}已存在`)):callback()
    }
    const validName=(rule,value,callback)=>{
      let res=this.departmentFlat.filter((item)=>{
        if(this.editData.id){
          //编辑部门
          if(item.name==value&&item.pid==this.editData.pid&&item.id!=this.editData.id){
            console.log(item.id,this.editData.id)
            console.log(this.editData)
            console.log(this.departmentFlat)
            return true
          }
        }else{
          //新增部门
          console.log('新增部门')
          if(item.name==value&&item.pid==this.editData.pid){
            return true
          }
        }
      })
      res.length >0 ?callback(new Error(`部门${value}已存在`)):callback()
    }
    return {
      form: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: ''// 部门介绍
      },
      rules:{
        name: [
                { required: true, message: '部门名称不能为空', trigger: 'blur'},
                { min: 2, max: 10, message: '部门名称要求2-10个字符', trigger:'blur'},
                { validator: validName, trigger: 'blur' }
        ],
        code: [
                { required: true, message: '部门编码不能为空', trigger: 'blur'},
                { min: 1, max: 20, message: '部门编码要求1-20个字符', trigger: 'blur'},
                { validator: validCode, trigger: 'blur' }
        ],
        manager: [
                { required: true, message: '部门负责人不能为空', trigger: 'change'}
        ],
        introduce: [
                { required: true, message: '部门介绍不能为空', trigger:'blur'},
                { min: 1, max: 300, message: '部门介绍要求1-300个字符', trigger: 'blur'}
        ]
      }
    }
  },
  watch: {
    editData:{
      handler(newValue, oldValue) {
        if(newValue!=null&&newValue.name){
          this.$nextTick(()=>{
            for(let item in this.form){
              this.form[item]=newValue[item]
            }
          })
        }
      },
      immediate:true
    }
  },
}
</script>

<style>
</style>
