<script setup>
import { useUserStore } from '@/stores/user'
import { useAdminStore } from '@/stores/admin'
import {editUserAPI,getUserByIdAPI,updateUserWordAPI} from '@/apis/user'
import {updateImgAPI,getAdminByIdAPI,editAdminAPI ,updateAdminWordAPI} from '@/apis/admin'


import { ref } from 'vue'
//用户信息
const userStore = useUserStore()
const userInfo = ref({})
const getUserById=async ()=>{
  const res =await getUserByIdAPI(userStore.userInfo.user_id)
  userInfo.value = res.data.data
}
getUserById()
//管理员信息
const adminStore = useAdminStore()
const adminInfo = ref({})
const getAdminById=async ()=>{
  const res =await getAdminByIdAPI(adminStore.adminInfo.admin_id)
  adminInfo.value = res.data.data
}
getAdminById()
//编辑用户信息
const updateUserform = ref({
  user_id: '',
  request_type: 'user_info',
  username: '',
  phone: '',
  personal_info: '',
})
const updateUserFormVisible = ref(false)
const editUser = () => {
  updateUserFormVisible.value = true
  updateUserform.value.user_id = userInfo.value.user_id
}
const updateUserInfo = async () => {
  const res = await editUserAPI(updateUserform.value)
  alert(res.data.message)
  updateUserFormVisible.value=false
  window.location.reload();
  // getUserById()
}
//修改用户密码
const updateUserPassword = ref({
  user_id: '',
  request_type: 'user_password',
  password: '',
  new_password: '',
})
const updateUserPasswordVisible=ref(false)
const editUserPassword=()=>{
  updateUserPasswordVisible.value=true
  updateUserPassword.value.user_id=userInfo.value.user_id
}
const submitUpdateUserPassword=async()=>{
  const res=await updateUserWordAPI(updateUserPassword.value)
  alert(res.data.message)
  updateUserPasswordVisible.value=false
}
//用户上传头像
//上传头像
const updateUserImgFormVisible = ref(false)
const updateUserId = ref()
//点击头像事件
const handelUpdateUserImg = () => {
  updateUserImgFormVisible.value = true
  updateUserId.value = userInfo.value.user_id
}
const fileName = ref(null);
let file = null;
const beforeImageUpload = (fileObj) => {
  fileName.value = fileObj.name;
  file = fileObj;
  return false; // 阻止上传到服务器
};
const changeUserImg = async () => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', updateUserId.value);
  formData.append('request_type', 'user_photo_url');
  const res = await updateImgAPI(formData)
  alert(res.data.message)
  fileName.value = ''
  updateUserImgFormVisible.value = false
  window.location.reload();
};


//编辑管理员信息
const updateAdminform = ref({
  admin_id: '',
  request_type: 'admin_info',
  adminname: '',
  phone: '',
  personal_info: '',
})
const updateAdminFormVisible = ref(false)
const editAdmin = () => {
  updateAdminFormVisible.value = true
  updateAdminform.value.admin_id = adminInfo.value.admin_id
}
const updateAdminInfo = async () => {
  const res = await editAdminAPI(updateAdminform.value)
  alert(res.data.message)
  updateAdminFormVisible.value=false
  window.location.reload();
  // getAdminById()
}
//修改管理员密码
const updateAdminPassword = ref({
  admin_id: '',
  request_type: 'admin_password',
  password: '',
  new_password: '',
})
const updateAdminPasswordVisible=ref(false)
const editAdminPassword=()=>{
  updateAdminPasswordVisible.value=true
  updateAdminPassword.value.admin_id=adminInfo.value.admin_id
}
const submitUpdateAdminPassword=async()=>{
  const res=await updateAdminWordAPI(updateAdminPassword.value)
  alert(res.data.message)
  updateAdminPasswordVisible.value=false
}
//管理员上传头像
//上传头像
const updateAdminImgFormVisible = ref(false)
const updateAdminId = ref()
//点击头像事件
const handelUpdateAdminImg = () => {
  updateAdminImgFormVisible.value = true
  updateAdminId.value = adminInfo.value.admin_id
}
// const fileName = ref(null);
// let file = null;
// const beforeImageUpload = (fileObj) => {
//   fileName.value = fileObj.name;
//   file = fileObj;
//   return false; // 阻止上传到服务器
// };
const changeAdminImg = async () => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('admin_id', updateAdminId.value);
  formData.append('request_type', 'admin_photo_url');
  const res = await updateImgAPI(formData)
  alert(res.data.message)
  fileName.value = ''
  updateAdminImgFormVisible.value = false
  window.location.reload();
};
</script>
<template>
  <div>
    <!-- user -->
    <div class="container" v-if="userInfo.username">
      <div class="img-name">
        <img :src=userInfo.photo_url alt="">
        <div class="user-info">
          <div class="user-name">{{ userInfo.username }}</div>
          <div class="user-personal-info">{{ userInfo.personal_info }}</div>
          <div class="user-phone">手机号码：{{ userInfo.phone }}</div>
        </div>

      </div>
      <div class="handle">
        <div class="changImg"><el-button round @click="handelUpdateUserImg">修改头像</el-button></div>
        <div class="update-user-info"><el-button type="primary" plain @click="editUser">编辑信息</el-button></div>
        <div class="update-user-password"><el-button type="primary" plain @click="editUserPassword">修改密码</el-button>
        </div>
      </div>
      <!-- 编辑用户信息 -->
      <el-dialog v-model="updateUserFormVisible" title="编辑用户信息" width="500">
        <el-form :model="updateUserform">
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="updateUserform.username" autocomplete="off" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="updateUserform.phone" autocomplete="off" oninput="value=value.replace(/^\d{12}$/,'')"
              placeholder="请输入11位手机号码" />
          </el-form-item>
          <el-form-item label="个人简介" :label-width="formLabelWidth">
            <el-input v-model="updateUserform.personal_info" autocomplete="off" placeholder="请输入个人简介" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="updateUserFormVisible = false">取消</el-button>
            <el-button type="primary" @click="updateUserInfo">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 编辑用户密码 -->
      <el-dialog v-model="updateUserPasswordVisible" title="修改用户密码" width="500">
        <el-form :model="updateUserPassword">
          <el-form-item label="原密码" :label-width="formLabelWidth">
            <el-input v-model="updateUserPassword.password" autocomplete="off" placeholder="请输入原密码" />
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="updateUserPassword.new_password" autocomplete="off" placeholder="请输入新密码" />
          </el-form-item>

        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="updateUserPasswordVisible = false">取消</el-button>
            <el-button type="primary" @click="submitUpdateUserPassword">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 修改用户头像 -->
      <el-dialog v-model="updateUserImgFormVisible" title="修改用户头像" width="500">
        <el-upload class="dl-avatar-uploader-min square" :action="uploadUrl" :show-file-list="false"
          :on-success="handleUpImage" :before-upload="beforeImageUpload" list-type="picture" accept="image/*">
          <template v-if="!fileName">
            <el-icon>
              <Plus />
            </el-icon>
          </template>
          <div v-else>{{ fileName }}</div>
          <template #tip>
            <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过10MB</div>
          </template>
        </el-upload>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="updateUserImgFormVisible = false">取消</el-button>
            <el-button type="primary" @click="changeUserImg">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>

    </div>
    <!-- admin -->
    <div class="container" v-if="adminInfo.username">
      <div class="img-name">
        <img :src=adminInfo.photo_url alt="">
        <div class="user-info">
          <div class="user-name">{{ adminInfo.username }}</div>
          <div class="user-personal-info">{{ adminInfo.personal_info }}</div>
          <div class="user-phone">手机号码：{{ adminInfo.phone }}</div>
          <div class="user-banner">账号状态：
            <div
              style="width: 60px;text-align: center; display: inline-block; background-color: #e8ffe8; border-radius: 4px;"
              v-if="adminInfo.register_status === '1'">正常</div>
            <div
              style="width: 60px;text-align: center; display: inline-block; background-color: #808080;color: white; border-radius: 4px;"
              v-if="adminInfo.register_status === '2'">禁止</div>
            <div
              style="width: 60px;text-align: center; display: inline-block; background-color: yellow;color: white; border-radius: 4px;"
              v-if="adminInfo.register_status === '0'">未审核</div>
          </div>

        </div>

      </div>
      <div class="handle">
        <div class="changImg"><el-button round @click="handelUpdateAdminImg">修改头像</el-button></div>
        <div class="update-user-info"><el-button type="primary" plain @click="editAdmin">编辑信息</el-button></div>
        <div class="update-user-password"><el-button type="primary" plain @click="editAdminPassword">修改密码</el-button>
        </div>
      </div>
      <!-- 编辑管理员信息 -->
      <el-dialog v-model="updateAdminFormVisible" title="编辑管理员信息" width="500">
        <el-form :model="updateAdminform">
          <el-form-item label="管理员名称" :label-width="formLabelWidth">
            <el-input v-model="updateAdminform.username" autocomplete="off" placeholder="请输入管理员名称" />
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="updateAdminform.phone" autocomplete="off" oninput="value=value.replace(/^\d{12}$/,'')"
              placeholder="请输入11位手机号码" />
          </el-form-item>
          <el-form-item label="个人简介" :label-width="formLabelWidth">
            <el-input v-model="updateAdminform.personal_info" autocomplete="off" placeholder="请输入个人简介" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="updateAdminFormVisible = false">取消</el-button>
            <el-button type="primary" @click="updateAdminInfo">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 编辑管理员密码 -->
      <el-dialog v-model="updateAdminPasswordVisible" title="修改管理员密码" width="500">
        <el-form :model="updateAdminPassword">
          <el-form-item label="原密码" :label-width="formLabelWidth">
            <el-input v-model="updateAdminPassword.password" autocomplete="off" placeholder="请输入原密码" />
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="updateAdminPassword.new_password" autocomplete="off" placeholder="请输入新密码" />
          </el-form-item>

        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="updateAdminPasswordVisible = false">取消</el-button>
            <el-button type="primary" @click="submitUpdateAdminPassword">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 修改管理员头像 -->
      <el-dialog v-model="updateAdminImgFormVisible" title="修改管理员头像" width="500">
        <el-upload class="dl-avatar-uploader-min square" :action="uploadUrl" :show-file-list="false"
          :on-success="handleUpImage" :before-upload="beforeImageUpload" list-type="picture" accept="image/*">
          <template v-if="!fileName">
            <el-icon>
              <Plus />
            </el-icon>
          </template>
          <div v-else>{{ fileName }}</div>
          <template #tip>
            <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过10MB</div>
          </template>
        </el-upload>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="updateImgFormVisible = false">取消</el-button>
            <el-button type="primary" @click="changeAdminImg">
              提交
            </el-button>
          </div>
        </template>
      </el-dialog>

    </div>
  </div>

</template>

<style lang="scss" scoped>
.container {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 20px;
  margin-top: 20px;
  display: block;

  .img-name {
    display: flex;

    img {
      width: 100px;
      height: 100px;
    }

    .user-info {
      color: rgb(118, 116, 116);
      margin-left: 20px;
      // line-height: 180px;
      font-size: 18px;

      .user-name {
        font-weight: 600;
      }

      .user-personal-info {
        font-size: 16px;
      }
    }
  }

  .handle {
    margin-top: 10px;
    display: flex;

    .changImg {
      padding-left: 4px;
      padding-right: 20px;
    }
  }
}
</style>