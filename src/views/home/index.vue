<script setup>
import { useUserStore } from '@/stores/user'
import { useAdminStore } from '@/stores/admin'
import { getUserByIdAPI } from '@/apis/user'
import { getAdminByIdAPI } from '@/apis/admin'


import { ref } from 'vue'
//用户信息
const userStore = useUserStore()
const userInfo = ref({})
// 
const getUserById = async () => {
  const res = await getUserByIdAPI(userStore.userInfo.user_id)
  userInfo.value = res.data.data
}
getUserById()
//管理员信息
const adminStore = useAdminStore()
const adminInfo = ref({})

const getAdminById = async () => {
  const res = await getAdminByIdAPI(adminStore.adminInfo.admin_id)
  adminInfo.value = res.data.data
}
getAdminById()
// 退出登录
const logout = async () => {
  await userStore.clearUserInfo()
  await adminStore.clearAdminInfo()
  window.location.reload();
}

</script>
<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <div class="logo">
            <img src="https://gd-hbimg.huaban.com/c046f4f7f9bf38d2b93ab146138126142e8d14931e930-adLhbn_fw236" alt="">
            <!-- <div class="name" style="width: 50px;">基于Web的日志分析系统</div> -->
          </div>
          <el-col :span="50">
            <el-menu :router="true" default-active="/home1" class="el-menu-vertical-demo"
              style="border-right: none ;height: 78vh;">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <House />
                  </el-icon>
                  <span>首页</span>
                </template>
                <el-menu-item index="/home1">数据分析1</el-menu-item>
                <el-menu-item index="/home2">数据分析2</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="/lda">
                <el-icon>
                  <Aim />
                </el-icon>
                <span>LDA数据</span>
              </el-menu-item>
              <el-menu-item index="/logList">
                <el-icon>
                  <Tickets />
                </el-icon>
                <span>日志列表</span>
              </el-menu-item>
              <el-menu-item index="/personal">
                <el-icon>
                  <UserFilled />
                </el-icon>
                <span>个人中心</span>
              </el-menu-item>
              <el-menu-item index="/workerList" v-if="adminInfo.username">
                <el-icon>
                  <User />
                </el-icon>
                <span>员工列表</span>
              </el-menu-item>
              <el-menu-item index="/adminList" v-if="adminInfo.username">
                <el-icon>
                  <Avatar />
                </el-icon>
                <span>管理员列表</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-container>
          <el-header>
            <div style="font-size: 18px;padding-right: 800px;">基于Web的日志分析系统</div>
            <div v-if="userInfo.username" style="display: flex;align-items: center;flex-direction: row-reverse;">

              <div class="logout" style="padding-top: 20px;">
                <el-icon style="font-size: 24px;cursor:pointer" @click="logout" title="退出登录">
                  <SwitchButton />
                </el-icon></div>
              <div class="photo"><img :src=userInfo.photo_url alt="">
              </div>
              <div class="name">{{ userInfo.username }}</div>
            </div>
            <div v-else-if="adminInfo.username" style="display: flex;align-items: center;flex-direction: row-reverse;">

              <div class="logout"  style="padding-top: 20px;">
                <el-icon style="font-size: 24px;cursor:pointer;" @click="logout" title="退出登录">
                  <SwitchButton />
                </el-icon>
              </div>
              <div class="photo"><img :src=adminInfo.photo_url alt="">
              </div>
              <div class="name">{{ adminInfo.username }}</div>
            </div>
            <div v-else style="display: flex;align-items: center;flex-direction: row-reverse;">

              <router-link to="/login" style="margin-top: 20px;margin-right: 100px;font-size: 16px;">请登录</router-link>
            </div>


          </el-header>
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  background-color: #f5f6fa;

  .el-container {
    height: 100%;

    .el-aside {
      height: 100%;
      background-color: white;
      border-right: 1px solid #ecedf1;

      .logo {
        background-color: white;
        margin: 20px auto;
        height: 16vh;
        width: 16vh;
      }
    }

    .el-container {
      height: 100%;

      .el-header {
        background-color: white;
        display: flex;
        line-height: 60px;
        border-bottom: #ecedf1 1px solid;

        .photo {
          height: 50px;
          width: 50px;
          margin: 0 20px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50px;
          }
        }
      }
    }
  }
}
</style>