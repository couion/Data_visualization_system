import request from "@/utils/request";
//管理员登陆
export const loginAPI=(data)=>request.post('/api/admin/login',data)
//管理员注册
export const addAdminAPI=({username,password})=>request.post('/api/admin/register',{username,password,request_type:'register'})
//查看日志
export const getLogListAPI=({log_status, log_type,logger,message,log_level})=>request.get('/api/getLogsList',{params:{log_status, log_type,logger,message,log_level}})
//新增日志
export const addLogListAPI=(data)=>request.post('/api/addLog',data)
//修改日志
export const editLogAPI=(data)=>request.put('/api/updateLogById',data)
//删除日志
export const delLogAPI=(log_id)=>request.delete('/api/updateLogById',{params:{log_id}})
//获取管理员列表
export const getAdminListAPI=(query_keyword)=>request.get('/api/admin/list',{params:{query_keyword}})
//修改管理员信息
export const editAdminAPI=(data)=>request.put('/api/admin/update/userinfo',data)
//删除管理员信息
export const delAdminAPI=(admin_id)=>request.delete('/api/admin/delete',{params:{admin_id}})
//搜索管理员信息
export const getAdminByIdAPI=(admin_id)=>request.get('/api/admin/info',{params:{admin_id}})
//修改头像
export const updateImgAPI=(data)=>request.post('/file/upload',data)
//管理员审核
export const passAdminAPI=(data)=>request.put('/api/admin/update/isPassed',data)
//修改密码
export const updateAdminWordAPI=(data)=>request.put('/api/admin/update/password',data)





