import request from "@/utils/request";
//用户登录
export const loginAPI=(data)=>request.post('/user/login',data)
//用户注册
export const addUserAPI=({username,password})=>request.post('/user/register',{username,password,request_type:'register'})
//获取用户列表
export const getUserListAPI=(query_keyword)=>request.get('/user/list',{params:{query_keyword}})
//修改用户信息
export const editUserAPI=(data)=>request.put('/user/update/userinfo',data)
//删除用户信息
export const delUserAPI=(user_id)=>request.delete('/user/delete',{params:{user_id}})
//根据id查看用户信息
export const getUserByIdAPI=(user_id)=>request.get('/user/info',{params:{user_id}})
//修改密码
export const updateUserWordAPI=(data)=>request.put('/user/update/password',data)
