<script setup>
import { ref } from 'vue'
import { Edit, Delete ,Plus,Minus} from '@element-plus/icons-vue'
import { getAdminListAPI, editAdminAPI, delAdminAPI, updateImgAPI ,passAdminAPI} from '@/apis/admin'
const adminData = ref()
//获取管理员列表
const getAdminList = async () => {
  const res = await getAdminListAPI()
  console.log(res.data.data.results);
  adminData.value = res.data.data.results
}
getAdminList()
//编辑管理员信息
const editAdminFormVisible = ref(false)
const editform = ref({
  admin_id: '',
  username: '',
  request_type: 'admin_info',
  phone: '',
  personal_info: '',
})
const editHandle = (id) => {
  editAdminFormVisible.value = true
  editform.value.admin_id = id
  console.log(editform.value.admin_id);
}
const editAdmin = async () => {
  const res = await editAdminAPI(editform.value)
  editAdminFormVisible.value = false
  alert(res.data.message)
  getAdminList()
}
//删除管理员
const deleteHandle = async (id) => {
  const res = await delAdminAPI(id)
  alert(res.data.message)
  getAdminList()
}
//搜索管理员
const query_keyword = ref()
const searchAdmin = async () => {
  const res = await getAdminListAPI(query_keyword.value)
  alert(res.data.message)
  console.log(res.data.data);
  adminData.value = res.data.data.results
}
//上传头像
const updateImgFormVisible = ref(false)
const updateAdminId = ref()
//点击头像事件
const updateAdminImg = (id) => {
  updateImgFormVisible.value = true
  updateAdminId.value = id
  console.log(id);
}
const fileName = ref(null);
let file = null;
const beforeImageUpload = (fileObj) => {
  fileName.value = fileObj.name;
  file = fileObj;
  return false; // 阻止上传到服务器
};
const changeAdminImg = async () => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('admin_id', updateAdminId.value);
  formData.append('request_type', 'admin_photo_url');
  const res = await updateImgAPI(formData)
  alert(res.data.message)
  fileName.value = ''
  updateImgFormVisible.value = false
  getAdminList()
};
//审核管理员操作
const passForm=ref({
  admin_id:'',
  request_type:'register_status',
  is_passed:''
})
//审核通过
const passHandle=async (id)=>{
  passForm.value.admin_id=id
  passForm.value.is_passed='1'
  const res=await passAdminAPI(passForm.value)
  alert(res.data.message)
  getAdminList()
}
//审核不通过
const notPassHandle=async (id)=>{
  passForm.value.admin_id=id
  passForm.value.is_passed='2'
  const res=await passAdminAPI(passForm.value)
  alert(res.data.message)
  getAdminList()
}
</script>
<template>
  <div>
    <div style="display: flex;">
      <el-form :model="query_keyword" label-width="auto" style="max-width: 600px">
        <el-form-item>
          <el-input v-model="query_keyword" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="searchAdmin"><el-icon>
          <Search />
        </el-icon>搜索管理员</el-button>
    </div>

    <el-table :data="adminData" stripe style="width: 100%">
      <el-table-column prop="admin_id" label="ID" />
      <el-table-column prop="photo_url" label="头像">
        <template v-slot="{ row }">
          <div style="border-radius: 50%; overflow: hidden; width: 50px; height: 50px;"
            @click="updateAdminImg(row.admin_id)">
            <img :src="row.photo_url" alt="头像" style="width: 100%;height: 100%" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="管理员姓名" />
      <el-table-column prop="phone" label="手机号码" />
      <el-table-column prop="personal_info" label="个人简介" />
      <el-table-column prop="register_status" label="账号状态">
        <template #default="{ row }">
          <div class="unreviewed" style="display: flex;" v-if="row.register_status==='0'">
            <el-button type="primary" :icon="Plus" circle
              @click="passHandle(row.admin_id)" />
            <el-button type="danger" @click="notPassHandle(row.admin_id)" :icon="Minus" circle />
          </div>
          <div class="pass" v-if="row.register_status==='1'" >正常</div>
          <div class="not-pass" v-if="row.register_status==='2'" >禁止</div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle @click="editHandle(row.admin_id)" />
          <el-button type="danger" @click="deleteHandle(row.admin_id)" :icon="Delete" circle />
        </template>
      </el-table-column>

    </el-table>
    <!-- 修改管理员信息 -->
    <el-dialog v-model="editAdminFormVisible" title="修改管理员信息" width="500">
      <el-form :model="editform">
        <el-form-item label="管理员姓名" :label-width="formLabelWidth">
          <el-input v-model="editform.username" autocomplete="off" placeholder="请输入管理员姓名" />
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
          <el-button @click="editAdminFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editAdmin">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="updateImgFormVisible" title="修改管理员头像" width="500">
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
</template>



<style lang="scss" scoped></style>