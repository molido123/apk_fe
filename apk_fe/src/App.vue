<template>
  <div class="container">
    <h2>导航页面</h2>
    <p>这里写上简介，检测apk类型</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <CustomButton
            image-src="src/assets/apkUpload.png"
            buttonText="上传apk"
            redirectUrl="/upload"
            shadowType="light"
            @click="navigate"
        />
      </el-col>
      <el-col :span="6">
        <CustomButton
            image-src="src/assets/QRDownload.png"
            buttonText="apk二维码下载"
            redirectUrl="/qrcode-download"
            shadowType="lighter"
            @click="navigate"
        />
      </el-col>
      <el-col :span="6">
        <CustomButton
            image-src="src/assets/urlDownload.png"
            buttonText="url下载"
            redirectUrl="/url-download"
            shadowType="dark"
            @click="navigate"
        />
      </el-col>
      <el-col :span="6">
        <CustomButton
            image-src="src/assets/about.png"
            buttonText="关于"
            redirectUrl="/about"
            shadowType=""
            @click="navigate"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CustomButton from './components/CustomButton.vue';

const router = useRouter();

const navigate = (url: string) => {
  router.push(url);
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.container {
  text-align: center;
  padding: 20px;
}

.header {
  margin-top: 0; /* 确保标题没有顶部外边距 */
  padding-top: 0; /* 确保标题没有顶部内边距 */
}

.button-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: 20px; /* 确保按钮行与标题之间有一些间距 */
}


</style>
