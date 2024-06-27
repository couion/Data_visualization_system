<template>
  <div style="height: 86vh;">
    <!-- <div ref="ldavisContainer" v-html="htmlUrl"></div> -->
    <!-- <div v-html="loadedHTML"></div> -->
    <div v-if="htmlUrl===''" style="height: 500px;line-height: 500px;font-size: 20px;">loading...</div>
    <iframe :src="htmlUrl" width="100%" height="100%" v-else>
    
    </iframe>
    <p v-if="htmlUrl">本数据来源于公开数据集，用于展示LDA主题特征提取。</p>
    <!-- <object :data="htmlUrl" type="text/html" width="100%" height="auto"></object> -->

  </div>
</template>

<script setup>
import {  onMounted ,ref} from 'vue';
import {getLDAHtmlAPI} from '@/apis/chart' 
// import onMounted from 'vue';

// const loadedHTML = ref('');

const htmlUrl = ref('');
// const htmlContent = ''

const getLDAHtml=async ()=>{
  const res=await getLDAHtmlAPI()
  htmlUrl.value=res.data.data.url
}
getLDAHtml()
onMounted(async () => {
  try {
    // const response = await fetch('http://localhost:8000/media/uploads/test.html');
    // htmlContent.value = await response.text();
    // LDA页面的地址  http://localhost:8000/media/uploads/test.html
    
    // const html = await response.text();
    console.log(htmlUrl);
    // loadedHTML.value = html;
  } catch (error) {
    console.error('Failed to load HTML:', error);
  }
});
</script>