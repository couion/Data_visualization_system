<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
import { getTemAPI, getMaxMinTemAPI, getContaminantAPI, getLogCountAPI, getCSVCountAPI } from '@/apis/chart'
import { getAdminListAPI } from '@/apis/admin'
import { getUserListAPI } from '@/apis/user'

//获取日志总条数
const LogCount = ref(0)
const getLogCount = async () => {
  const res = await getLogCountAPI()
  LogCount.value = res.data.data.log_all_count
}
getLogCount()
//获取CSV加载数量
const CSVCount = ref(0)
const getCSVCount = async () => {
  const res = await getCSVCountAPI()
  CSVCount.value = res.data.data
}
getCSVCount()
//获取管理员数据
const adminCount = ref()
const getAdminList = async () => {
  const res = await getAdminListAPI()
  adminCount.value=res.data.data.count
}
getAdminList()
//获取用户数据
const userCount = ref()
const getUserList = async () => {
  const res = await getUserListAPI()
  userCount.value=res.data.data.count
}
getUserList()
//#region 气温变化曲线图

const temperatureChangecontainerRef = ref(null);
const cities = ['Aotizhongxin', 'Changping', 'Dingling', 'Dongsi', 'Guanyuan', 'Gucheng', 'Huairou', 'Nongzhanguan', 'Shunyi', 'Tiantan', 'Wanliu', 'Wanshouxigong'];
const timeData = ref([]);
const cityData = {};
const loading1 = ref(true); // 初始加载状态为 true
const getTem = async () => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const res = await getTemAPI({ city_name: city });
    const temps = res.data.data[0].data.map(item => item.temperature);
    cityData[city] = temps;
    if (i === 0) {
      timeData.value = res.data.data[0].data.map(item => item.date);
    }
    if (i === cities.length - 1) {
      // i=0;
    }
    initChart();
    loading1.value = false
  }
  // initChart();
};

const initChart = () => {
  const option = {
    title: {
      text: '气温变化曲线',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      }
    },

    axisPointer: {
      link: [
        {
          xAxisIndex: 'all'
        }
      ]
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100,
        xAxisIndex: [0, 1]
      },

    ],
    xAxis: {
      type: 'category',
      data: timeData.value
    },
    yAxis: {
      type: 'value',
      name: '温度',
      max: 40
    },
    series: cities.map(city => ({
      name: city,
      type: 'line',
      symbolSize: 1,
      data: cityData[city]
    }))
  };

  const myChart = echarts.init(temperatureChangecontainerRef.value);
  myChart.setOption(option);
};

onMounted(getTem);
//#endregion 

//#region 最高最低气温对比
const max_minTemperaturechartDom = ref(null);
const cityMaxTData = [];
const cityMinTData = [];
const loading2 = ref(true); // 初始加载状态为 true

const getMaxMinTem = async () => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const res = await getMaxMinTemAPI({ city_name: city });
    // console.log(res.data.data[0]);
    const max = res.data.data[0].temperature[0].max;
    const min = res.data.data[0].temperature[1].min;
    cityMaxTData.push(max)
    cityMinTData.push(min)
    // console.log(cityMaxTData);
    if (i === cities.length - 1) {
      // i=0;
    }
    initChart2();
    loading2.value = false
  }
  // initChart();
};

const initChart2 = () => {
  const option = {
    title: {
      text: "最高与最低气温对比图"
    },
    tooltip: {
      trigger: 'axis', //坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
      axisPointer: {// 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '10%',
      bottom: '2%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Aotizhongxin', 'Changping', 'Dingling', 'Dongsi', 'Guanyuan', 'Gucheng', 'Huairou', 'Nongzhanguan', 'Shunyi', 'Tiantan', 'Wanliu', 'Wanshouxigong'],
      axisLabel: {//坐标轴刻度标签的相关设置。
        interval: 0,
        rotate: "30"
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: "最高温度",
        data: cityMaxTData,
        type: 'bar',
        itemStyle: {
          color: 'red' // 单一颜色
        }
      },
      {
        name: "最低温度",
        data: cityMinTData,
        type: 'bar'
      },
    ]
  };

  const myChart = echarts.init(max_minTemperaturechartDom.value);
  myChart.setOption(option);
};
onMounted(getMaxMinTem);
//#endregion 

//#region 大气污染物（SO2, NO2, CO, O3）年度平均比较图

const contaminantDom = ref(null);
const SO2Data = ref([]);
const NO2Data = ref([]);
const COData = ref([]);
const O3Data = ref([]);

const checkCity = ref('Aotizhongxin')
const timeData1 = ref()
const handleCity = (city) => {
  checkCity.value = city
  getContaminant()
}
const loading3 = ref(true); // 初始加载状态为 true

const getContaminant = async () => {
  // for (let i = 0; i < cities.length; i++) {
  // const city = cities[0];
  const res = await getContaminantAPI({ city_name: checkCity.value });
  // console.log(res.data.data[0].SO2);
  timeData1.value = res.data.data[0].SO2.map(item => item.date);

  SO2Data.value = res.data.data[0].SO2.map(item => item.SO2);
  NO2Data.value = res.data.data[0].NO2.map(item => item.NO2);
  COData.value = res.data.data[0].CO.map(item => item.CO);
  O3Data.value = res.data.data[0].O3.map(item => item.O3);
  console.log(SO2Data.value);
  // const max = res.data.data[0].temperature[0].max;
  // const min = res.data.data[0].temperature[1].min;
  // cityMaxTData.push(max)
  // cityMinTData.push(min)
  // console.log(cityMaxTData);
  // if (i === cities.length - 1) {
  //   // i=0;
  // }
  initChart3();
  loading3.value = false
  // }
  // initChart();
};

const initChart3 = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    dataZoom: [
      {
        show: true,
        realtime: true,
        start: 0,
        end: 100,
        xAxisIndex: [0]
      },

    ],
    xAxis: [
      {
        bottom: '30%',
        type: 'category',
        // data: ['Aotizhongxin', 'Changping', 'Dingling', 'Dongsi', 'Guanyuan', 'Gucheng', 'Huairou', 'Nongzhanguan', 'Shunyi', 'Tiantan', 'Wanliu', 'Wanshouxigong'],
        data: timeData1.value,
        // axisLabel: {//坐标轴刻度标签的相关设置。
        //   interval: 0,
        //   rotate: "30"
        // }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'SO2',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: SO2Data.value
      },
      {
        name: 'NO2',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: NO2Data.value
      },
      {
        name: 'CO',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: COData.value
      },
      {
        name: 'O3',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: O3Data.value
      },
    ]

  };

  const myChart = echarts.init(contaminantDom.value);
  myChart.setOption(option);
};
onMounted(() => {
  getContaminant();
  // setTimeout(() => {
  //   getContaminant();
  //   // 每隔一秒执行一次getContaminant
  //   setInterval(getContaminant, 1000);
  // }, 1000);
});
// 使用 onMounted 钩子在组件挂载后初始化图表
// setTimeout(()=>{
//   getContaminant()
// },1000)


//#endregion 


</script>
<template>
  <div class="home1">
    <div class="left">
      <div class="left-top">
        <div class="data1-number">
          <div class="number data-number">{{ LogCount }}</div>
          <div class="name" style="color: white;">日志总条数</div>
        </div>
        <div class="data2-number ">
          <div class="number data-number">{{ CSVCount }}</div>
          <div class="name" style="color: white;">CSV加载数量</div>
        </div>
        <div class="user-number ">
          <div class="number data-number">{{userCount}}</div>
          <div class="name" style="color: white;">用户数量</div>
        </div>
        <div class="log-number ">
          <div class="number data-number">{{adminCount}}</div>
          <div class="name" style="color: white;">管理员数据</div>
        </div>
      </div>
      <div class="left-bottom">
        <div style="display: flex;justify-content: center;align-items: center;">
          <div v-if="loading1" class="loading" style="font-size: 20px;">Loading...</div>
          <div ref="temperatureChangecontainerRef" style="width: 600px; height:300px;"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div style="display: flex;justify-content: center;align-items: center;">
          <div v-if="loading2" class="loading" style="font-size: 20px;">Loading...</div>
          <div ref="max_minTemperaturechartDom" style="width: 600px; height:300px;"></div>
        </div>
      </div>
      <div style="font-size: 16px; padding-left: 12px;margin-top: 14px;background-color: white;border: #ecedf1 1px solid;
      border-bottom: none;">
        <h1>大气污染物（SO2, NO2, CO, O3）年度平均比较图</h1>
      </div>
      <div class="right-bottom">
        <el-dropdown>
          <span class="el-dropdown-link">
            城市列表
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu style="max-height: 200px; overflow-y: auto;">
              <el-dropdown-item v-for="city in cities" :key="city" @click="handleCity(city)">{{ city }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div style="display: flex;align-items: center;">
          <div v-if="loading3" class="loading" style="font-size: 20px;">Loading...</div>

          <div ref="contaminantDom" style="width: 600px; height:300px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home1 {
  height: 100%;
  display: flex;

  .left {
    height: 100%;
    width: 48%;
    margin-right: 28px;

    .left-top {
      height: 48%;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      .data1-number {
        width: 42%;
        height: 46%;
        margin: 0 10px;
        background-color: #15c377;
        border: 1px solid #edefef;
        padding: 20px;
        border-radius: 10px;

      }

      .data2-number {
        width: 42%;
        height: 46%;
        margin: 0 10px;
        background-color: #f96868;
        border: 1px solid #edefef;
        padding: 20px;
        border-radius: 10px;

      }

      .user-number {
        width: 42%;
        height: 46%;
        margin: 0 10px;
        background-color: #926dde;
        border: 1px solid #edefef;
        padding: 20px;
        border-radius: 10px;

      }

      .log-number {
        width: 42%;
        height: 46%;
        margin: 0 10px;
        background-color: #33cabb;
        border: 1px solid #edefef;
        padding: 20px;
        border-radius: 10px;

      }
    }

    .left-bottom {
      margin-top: 28px;
      height: 48%;
      padding: 10px;
      border: #ecedf1 1px solid;
      background-color: white;
    }
  }

  .right {
    height: 100%;
    width: 48%;

    .right-top {
      height: 46%;
      padding: 10px;
      border: #ecedf1 1px solid;
      background-color: white;
    }

    .right-bottom {
      height: 50%;
      padding: 10px;
      background-color: white;
      border: #ecedf1 1px solid;
      border-top: none;


    }
  }
}

.data-number {
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 10px;
  color: white;
}
</style>