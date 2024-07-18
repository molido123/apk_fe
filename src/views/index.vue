<template>
  <div class="container">
    <h2 class="header">导航页面</h2>
    <el-row :gutter="30" class="button-row">
      <el-col :span="8">
        <CustomButton
            image-src="src/assets/云上传.png"
            buttonText="上传APK"
            redirectUrl="/uploadIndex"
            shadowType="light"
            backgroundColor="linear-gradient(135deg, #42a5f5, #478ed1)"
            @click="navigate"
        />
      </el-col>
      <el-col :span="8">
        <CustomButton
            image-src="src/assets/winfo-icon-查看报告.png"
            buttonText="查看分析报告"
            redirectUrl="/ResultsQueryPage"
            shadowType="light"
            backgroundColor="linear-gradient(123deg, #66bb6a, #43a047)"
            @click="navigate"
        />
      </el-col>
      <el-col :span="8">
        <CustomButton
            image-src="src/assets/关于.png"
            buttonText="关于"
            redirectUrl="/ShowModels"
            shadowType="light"
            backgroundColor="linear-gradient(200deg, #ffa726, #fb8c00)"
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
  min-height: 60vh; /* 使容器占满整个视口高度 */
  padding: 20px;
}

.header {
  margin: 0;
  padding: 10px 0;
  font-size: 2rem; /* 更大的字体大小 */
}

.button-row {
  display: flex;
  justify-content: center;
  align-items: stretch;
  margin-top: 30px;
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
