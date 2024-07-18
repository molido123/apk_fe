<template>
  <div class="back">
    <el-button class="back-button" @click="goBack">返回</el-button>
  </div>
  <h2 class="header">请选择上传方式</h2>
  <div class="container">
    <el-row :gutter="30">
      <el-col :span="8">
        <CustomButton
            image-src="src/assets/文件.png"
            buttonText="本地上传"
            redirectUrl="/apkFileUpload"
            shadowType="light"
            backgroundColor="linear-gradient(135deg, #42a5f5, #478ed1)"
            @click="navigate"
        />
      </el-col>
      <el-col :span="8">
        <CustomButton
            image-src="src/assets/二维码 (1).png"
            buttonText="二维码上传"
            redirectUrl="/qrcode-upload"
            shadowType="lighter"
            backgroundColor="linear-gradient(135deg, #66bb6a, #43a047)"
            @click="navigate"
        />
      </el-col>
      <el-col :span="8">
        <CustomButton
            image-src="src/assets/URL.png"
            buttonText="url上传"
            redirectUrl="/url-upload"
            shadowType="dark"
            backgroundColor="linear-gradient(135deg, #ffa726, #fb8c00)"
            @click="navigate"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import CustomButton from '../components/CustomButton.vue';
import { onMounted } from 'vue';

const router = useRouter();

const navigate = (url: string) => {
  router.push(url);
};
const goBack = () => {
  router.back();
};
onMounted(() => {
  window.resizeTo(800, 600);
});
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif; /* 使用更现代的字体 */
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh; /* 使容器占满整个视口高度 */
  padding: 10px;
}

.back {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}
.header {
  margin: 10px;
  padding: 10px 0;
  font-size: 2rem; /* 更大的字体大小 */
}

.button-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: 30px;
}

.back-button {
  transition: background-color 0.3s, transform 0.3s;
}

.back-button:hover {
  background-color: #e0e0e0; /* 悬停时改变背景颜色 */
  transform: translateY(-2px); /* 悬停时上移 */
}
.el-col {
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease; /* 添加过渡效果 */
}

.el-col:hover {
  transform: translateY(-5px); /* 鼠标悬停时上移 */
}
</style>
