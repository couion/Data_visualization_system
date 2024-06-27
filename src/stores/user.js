import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { ref } from "vue";
export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  //登陆
  const getUserInfo = async ({ username, password }) => {
    const res = await loginAPI({ username, password ,request_type:'login'})
    userInfo.value = res.data.data
    alert(res.data.message)
  }
  //退出清除信息
  const clearUserInfo=()=>{
    userInfo.value ={}
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},
{
  persist: true,
})