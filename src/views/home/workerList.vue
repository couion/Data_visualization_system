<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { updateImgAPI } from '@/apis/admin'
import { getUserListAPI, editUserAPI, delUserAPI } from '@/apis/user'

const userData = ref()
//获取用户列表
const getUserList = async () => {
  const res = await getUserListAPI()
  console.log(res.data.data.results);
  userData.value = res.data.data.results
}
getUserList()
//编辑用户信息
const editUserFormVisible = ref(false)
const editform = ref({
  user_id: '',
  username: '',
  request_type: 'user_info',
  phone: '',
  personal_info: '',
})
const editHandle = (id) => {
  editUserFormVisible.value = true
  editform.value.user_id = id
  console.log(editform.value.user_id);
}
const editUser = async () => {
  const res = await editUserAPI(editform.value)
  editUserFormVisible.value = false
  alert(res.data.message)
  getUserList()
}
//删除用户
const deleteHandle = async (id) => {
  const res = await delUserAPI(id)
  alert(res.data.message)
  getUserList()
}
//搜索用户
const query_keyword = ref()
const searchUser = async () => {
  const res = await getUserListAPI(query_keyword.value)
  alert(res.data.message)
  console.log(res.data.data);
  userData.value = res.data.data.results
}
//上传头像
const updateImgFormVisible = ref(false)
const updateUserId = ref()
//点击头像事件
const updateUserImg = (id) => {
  updateImgFormVisible.value = true
  updateUserId.value = id
  console.log(id);
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
  updateImgFormVisible.value = false
  getUserList()
};
</script>
<template>
  <div>
    <div style="display: flex;">
      <el-form :model="query_keyword" label-width="auto" style="max-width: 600px">
        <el-form-item>
          <el-input v-model="query_keyword" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="searchUser"><el-icon>
          <Search />
        </el-icon>搜索用户</el-button>
    </div>

    <el-table :data="userData" stripe style="width: 100%">
      <el-table-column prop="user_id" label="ID" />
      <el-table-column prop="photo_url" label="头像">
        <template v-slot="{ row }">
          <div style="border-radius: 50%; overflow: hidden; width: 50px; height: 50px;"
            @click="updateUserImg(row.user_id)">
            <img :src="row.photo_url" alt="头像" style="width: 100%;height: 100%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户姓名" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="personal_info" label="个人简介" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle @click="editHandle(row.user_id)" />
          <el-button type="danger" @click="deleteHandle(row.user_id)" :icon="Delete" circle />
        </template>
      </el-table-column>

    </el-table>
    <!-- 修改用户信息 -->
    <el-dialog v-model="editUserFormVisible" title="修改用户信息" width="500">
      <el-form :model="editform">
        <el-form-item label="用户姓名" :label-width="formLabelWidth">
          <el-input v-model="editform.username" autocomplete="off" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="editform.phone" autocomplete="off" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="个人简介" :label-width="formLabelWidth">
          <el-input v-model="editform.personal_info" autocomplete="off" placeholder="请输入个人简介" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editUserFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editUser">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="updateImgFormVisible" title="修改用户头像" width="500">
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
          <el-button type="primary" @click="changeUserImg">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>



<style lang="scss" scoped></style>