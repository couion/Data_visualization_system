<script setup>
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue'
import { getCityRainAPI, getCityPM25API, getCityWSPMAPI } from '@/apis/chart'
//#region 风速
const getCityWSPMRef = ref(null);
const cities = ['Aotizhongxin', 'Changping', 'Dingling', 'Dongsi', 'Guanyuan', 'Gucheng', 'Huairou', 'Nongzhanguan', 'Shunyi', 'Tiantan', 'Wanliu', 'Wanshouxigong'];
const timeData1 = ref([]);
const cityData1 = {};
const loading1 = ref(true); // 初始加载状态为 true
const getCityWSPM = async () => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const res = await getCityWSPMAPI({ city_name: city });
    console.log(res.data.data[0].WSPM);
    const wd = res.data.data[0].WSPM.map(item => item.WD);
    cityData1[city] = wd;
    if (i === 0) {
      timeData1.value = res.data.data[0].WSPM.map(item => item.date);
    }
    if (i === cities.length - 1) {
      // i=0;
    }
    initChart1();
    loading1.value = false
  }
  // initChart();
};

const initChart1 = () => {
  const option = {
    title: {
      text: '城市风速数据',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      },
      textStyle: {
        fontSize: 10 // 设置提示框字体大小
      },

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
        bottom: '0%',
        show: true,
        realtime: true,
        start: 0,
        end: 1,
        xAxisIndex: [0, 1]
      },

    ],
    grid: {
      bottom: '16%',
    },
    xAxis: {
      type: 'category',
      data: timeData1.value
    },
    yAxis: {
      type: 'value',
      name: '风速',
      max: 80
    },
    series: cities.map(city => ({
      name: city,
      type: 'line',
      symbolSize: 1,
      stack: 'Total',
      data: cityData1[city]
    }))
  };

  const myChart = echarts.init(getCityWSPMRef.value);
  myChart.setOption(option);
};

onMounted(getCityWSPM);

//#endregion 
//#region 获取城市PM2.5数据
const cityPM25Ref = ref(null);
const timeData2 = ref([]);
const cityData2 = {};
const loading2 = ref(true); // 初始加载状态为 true
const getCityPM25 = async () => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const res = await getCityPM25API({ city_name: city });
    // console.log(res.data.data[0]["PM2.5"]);
    const precipitations = res.data.data[0]["PM2.5"].map(item => item["PM2.5"]);
    cityData2[city] = precipitations;
    if (i === 0) {
      timeData2.value = res.data.data[0]["PM2.5"].map(item => item.date);
    }
    if (i === cities.length - 1) {
      // i=0;
    }
    initChart();
    loading2.value = false
  }
  // initChart();
};

const initChart = () => {
  const option = {
    title: {
      text: '城市PM2.5数据',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      },
      textStyle: {
        fontSize: 10 // 设置提示框字体大小
      },

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
        bottom: '0%',
        show: true,
        realtime: true,
        start: 0,
        end: 1,
        xAxisIndex: [0, 1]
      },

    ],
    grid: {
      bottom: '16%',
    },
    xAxis: {
      type: 'category',
      data: timeData2.value
    },
    yAxis: {
      type: 'value',
      name: '浓度',
      max: 500
    },
    series: cities.map(city => ({
      name: city,
      type: 'bar',
      symbolSize: 1,
      data: cityData2[city]
    }))
  };

  const myChart = echarts.init(cityPM25Ref.value);
  myChart.setOption(option);
};

onMounted(getCityPM25);


//#endregion 
//#region 城市月度降水量
const precipitationRef = ref(null);
const timeData3 = ref([]);
const cityData3 = {};
const loading3 = ref(true); // 初始加载状态为 true
const getCityRain = async () => {
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const res = await getCityRainAPI({ city_name: city });
    // console.log(res.data.data[0].RAIN);
    const precipitations = res.data.data[0].RAIN.map(item => item.RAIN);
    cityData3[city] = precipitations;
    if (i === 0) {
      timeData3.value = res.data.data[0].RAIN.map(item => item.date);
    }
    if (i === cities.length - 1) {
      // i=0;
    }
    initChart3();
    loading3.value = false
  }
  // initChart();
};

const initChart3 = () => {
  const option = {
    title: {
      text: '城市月度降雨量',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        animation: false
      },
      textStyle: {
        fontSize: 10 // 设置提示框字体大小
      },
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
      data: timeData3.value
    },
    yAxis: {
      type: 'value',
      name: '降水量',
      max: 400
    },
    series: cities.map(city => ({
      name: city,
      type: 'line',
      symbolSize: 1,
      data: cityData3[city]
    }))
  };

  const myChart = echarts.init(precipitationRef.value);
  myChart.setOption(option);
};

onMounted(getCityRain);
//#endregion 

</script>
<template>
  <div class="home1">
    <div class="left">
      <div style="display: flex;align-items: center;">
        <div v-if="loading1" class="loading" style="font-size: 20px;">Loading...</div>

        <div ref="getCityWSPMRef" style="width: 800px; height:500px;"></div>
      </div>
    </div>
    <div class="right">
      <div class="right-top">
        <div style="display: flex;height: 100%;align-items: center;">
          <div v-if="loading2" class="loading" style="font-size: 20px;">Loading...</div>

          <div ref="cityPM25Ref" style="width: 600px; height:330px;"></div>
        </div>
      </div>
      <div class="right-bottom">
        <div style="display: flex;align-items: center;">
          <div v-if="loading3" class="loading" style="font-size: 20px;">Loading...</div>

          <div ref="precipitationRef" style="width: 600px; height:300px;"></div>
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
    height: 80%;
    width: 48%;
    margin: 20px;
    border: #ecedf1 1px solid;
    background-color: white;
  }

  .right {
    height: 100%;
    width: 48%;

    .right-top {
      height: 52%;
      // padding: 10px;
      border: #ecedf1 1px solid;
      background-color: white;
    }

    .right-bottom {
      margin-top: 14px;
      height: 48%;
      padding: 10px;
      border: #ecedf1 1px solid;
      background-color: white;
    }
  }
}

.data-number {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>