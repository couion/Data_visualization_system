<template>
    <div style="display: flex;">
      <div ref="chartDom" style="width: 600px; height: 400px;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as echarts from 'echarts';
  import { getTemAPI } from '@/apis/chart';
  
  const chartDom = ref(null);
  const cities = ['Aotizhongxin', 'Changping', 'Dingling', 'Dongsi', 'Guanyuan', 'Gucheng', 'Huairou', 'Nongzhanguan', 'Shunyi', 'Tiantan', 'Wanliu', 'Wanshouxigong'];
  const timeData = ref([]);
  const cityData = {};
  
  const getTem = async () => {
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const res = await getTemAPI({ city_name: city });
      const temps = res.data.data[0].data.map(item => item.temperature);
      cityData[city] = temps;
      if (i === 0) {
        timeData.value = res.data.data[0].data.map(item => item.date);
      }
      if (i === cities.length-1) {
        // i=0;
      }
      initChart();
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
      toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
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
                start: 30,
                end: 70,
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
  
    const myChart = echarts.init(chartDom.value);
    myChart.setOption(option);
  };
  
  onMounted(getTem);
  </script>
  
  <style scoped></style>
  