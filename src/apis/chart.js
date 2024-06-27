import request from "@/utils/request";
//获取气温
export const getTemAPI=({city_name})=>request.get('/api/getCityTemp',{params:{city_name}})
//获取最低最高气温
export const getMaxMinTemAPI=({city_name})=>request.get('/api/getCityTempMaxMin',{params:{city_name}})
//获取污染物
export const getContaminantAPI=({city_name})=>request.get('/api/getCitySO2',{params:{city_name}})
//获取城市月度降水量
export const getCityRainAPI=({city_name})=>request.get('/api/getCityRain',{params:{city_name}})
//获取城市PM2.5数据
export const getCityPM25API=({city_name})=>request.get('/api/getCityPM25',{params:{city_name}})
//获取城市风速
export const getCityWSPMAPI=({city_name})=>request.get('/api/getCityWSPM',{params:{city_name}})
//获取日志总条数
export const getLogCountAPI=()=>request.get('/api/getLogCount',)
//获取读取CSV数量
export const getCSVCountAPI=()=>request.get('/api/getCSVCount',)
//请求lda数据
export const getLDAHtmlAPI=()=>request.get('/api/getLDAHtml',)




