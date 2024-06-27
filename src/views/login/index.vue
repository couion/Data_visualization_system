<script setup>
// import { loginAPI} from '@/api/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { addUserAPI } from '@/apis/user'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const isRegister = ref(true)
//表单校验数据
const formModel = ref({
  username: '',
  password: '',
})
//表单校验规则
//trigger为触发时机
//pattern正则
//自定义校验=>
//validator:(rule,value,callback)
//rule当前校验规则相关信息
//value所校验规则表单值
//callback=>callback()校验成功
//callback(new Error(错误信息))校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名为5-10位字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{2,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
}
//提交前先进行校验
const form = ref() //通过ref获取表单组件


//切换的时候表单重置
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
  }
})
//登录前先校验
const userStore = useUserStore()
const router = useRouter()
//登陆
const login = async () => {
  await form.value.validate()
  await userStore.getUserInfo(formModel.value)
  router.push('/')
}
// //注册
const register = async () => {
  await form.value.validate()
  const res = await addUserAPI(formModel.value)
  isRegister.value = false
  alert(res.data.message)
  //   // ElMessage.success('注册成功')
}
</script>

<template>
  <!-- el-row表示一行，一行分为24份 -->
  <el-row class="login-page" style="background-image: url('https://pic4.zhimg.com/v2-1a4bf896da7f339819087f545f82aefc_r.jpg?source=1940ef5c'); background-size: cover;background-position: center; ">
    <!-- el-col表示列， -->
    <!-- ：span=12表示一行占12列 
      ：span=6表示一行占:6列
      :offset="3" 表示左侧margin3份 -->
    <el-col :span="6" :offset="9" class="form">
      <!-- el-form 整个表单 
        el-form-item表示一行
      -->
      <!-- 注册相关form -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister" style="background-color: rgba(255, 255, 255, 0.8); border: 1px solid #ebeef5;padding: 10px;">
        <!-- 校验相关 
        1.el-form=>:model="ruleForm" 绑定整个form的数据对象
        2.1.el-form=>:rules="rules" 绑定整个rules的规则对象
        3.prop配置生效的是哪个校验规则（和rules字段相对应）
        -->

        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登陆相关form -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else style="background-color: rgba(255, 255, 255, 0.8); border: 1px solid #ebeef5;padding: 10px;">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
            v-model="formModel.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
    
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
