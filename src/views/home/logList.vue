<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { getLogListAPI, addLogListAPI, editLogAPI, delLogAPI } from '@/apis/admin'
const logList = ref([])
//根据信息搜索日志
const searchFrom = ref({
  log_status: '',
  log_type: '',
  logger: '',
  message: '',
  log_level: '',
})
//获取日志列表
const getLogList = async () => {
  const res = await getLogListAPI(
    {
      log_status: searchFrom.value.log_status,
      log_type: searchFrom.value.log_type,
      logger: searchFrom.value.logger,
      message: searchFrom.value.message,
      log_level: searchFrom.value.log_level
    }
  )
  logList.value = res.data.data.results
  console.log();
}
getLogList()

//新增日志
const addLogFormVisible = ref(false)
//新增日志数据
const addform = ref({
  log_status: '',
  log_type: '',
  logger: 'admin',
  message: '',
  log_level: '',
})
const addHandle = () => {
  addLogFormVisible.value = true
}
const addLog = async () => {
  const res = await addLogListAPI(addform.value)
  alert(res.data.message)
  addLogFormVisible.value = false
  getLogList()
}
//修改日志
//修改日志数据
const editLogFormVisible = ref(false)
const editform = ref({
  log_id: '',
  log_status: '',
  log_type: '',
  logger: 'admin',
  message: '',
  log_level: '',
})
const editHandle = (id) => {
  editform.value.log_id = id
  editLogFormVisible.value = true
}
const editLog = async () => {
  const res = await editLogAPI(editform.value)
  alert(res.data.message)
  editLogFormVisible.value = false
  getLogList()
}
//删除日志
const deleteHandle = async (log_id) => {
  // console.log(log_id);
  const res = await delLogAPI(log_id)
  alert(res.data.message)
  getLogList()
}

const searchLog = async () => {
  const res = await getLogList({
    log_status: searchFrom.value.log_status,
    log_type: searchFrom.value.log_type,
    message: searchFrom.value.message,
    log_level: searchFrom.value.log_level,
  })
  console.log(res);

}
</script>
<template>
  <div>
    <div style="display: flex;">
      <el-form :model="searchFrom" label-width="auto" style="max-width: 800px;display: flex;flex-wrap: wrap;">
        <el-form-item label="日志状态" >
          <el-input v-model="searchFrom.log_status" />
        </el-form-item>
        <el-form-item label="日志类型">
          <el-input v-model="searchFrom.log_type" />
        </el-form-item>

        <el-form-item label="日志信息">
          <el-input v-model="searchFrom.message" />
        </el-form-item>
        <el-form-item label="日志等级">
          <el-input v-model="searchFrom.log_level" />
        </el-form-item>
        <el-button type="primary" @click="searchLog" style="margin-left: 10px;"><el-icon>
            <Search />
          </el-icon>搜索日志</el-button>
      </el-form>

    </div>
    <div style="text-align: center;">
      <el-table :data="logList" stripe style="width: 100%; text-align: center; ">
        <el-table-column prop="log_id" label="日志id" width='70' />
        <el-table-column prop="log_status" label="日志状态" width='100'/>
        <el-table-column prop="log_type" label="日志类型" width='100'/>
        <el-table-column prop="logger" label="日志创建人" width='100' />
        <el-table-column prop="message" label="日志信息" width='400'/>
        <el-table-column prop="log_level" label="日志等级" />
        <el-table-column prop="created_at" label="创建时间" width="200" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" :icon="Edit" circle @click="editHandle(row.log_id)" />
            <el-button type="danger" @click="deleteHandle(row.log_id)" :icon="Delete" circle />
          </template>
        </el-table-column>
        <el-table-column>
          <template #header>
            <el-button typ="primary" @click="addHandle">新增</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增日志 -->
    <el-dialog v-model="addLogFormVisible" title="新增日志" width="500">
      <el-form :model="addform">
        <el-form-item label="日志状态" :label-width="formLabelWidth">
          <el-input v-model="addform.log_status" autocomplete="off" placeholder="请输入日志状态" />
        </el-form-item>
        <el-form-item label="日志类型" :label-width="formLabelWidth">
          <el-input v-model="addform.log_type" autocomplete="off" placeholder="请输入日志类型" />
        </el-form-item>

        <el-form-item label="日志信息" :label-width="formLabelWidth">
          <el-input v-model="addform.message" autocomplete="off" placeholder="请输入日志信息" />
        </el-form-item>
        <el-form-item label="日志等级" :label-width="formLabelWidth">
          <el-input v-model="addform.log_level" autocomplete="off" placeholder="请输入日志等级" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addLogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addLog">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 修改日志 -->
    <el-dialog v-model="editLogFormVisible" title="修改日志" width="500">
      <el-form :model="editform">
        <el-form-item label="日志状态" :label-width="formLabelWidth">
          <el-input v-model="editform.log_status" autocomplete="off" placeholder="请输入日志状态" />
        </el-form-item>
        <el-form-item label="日志类型" :label-width="formLabelWidth">
          <el-input v-model="editform.log_type" autocomplete="off" placeholder="请输入日志类型" />
        </el-form-item>

        <el-form-item label="日志信息" :label-width="formLabelWidth">
          <el-input v-model="editform.message" autocomplete="off" placeholder="请输入日志信息" />
        </el-form-item>
        <el-form-item label="日志等级" :label-width="formLabelWidth">
          <el-input v-model="editform.log_level" autocomplete="off" placeholder="请输入日志等级" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editLogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="editLog">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>



<style lang="scss" scoped></style>