<template>
  <div class="header">
    <el-button class="back-button" @click="goBack">返回</el-button>
  </div>
  <div class="upload-container">
    <el-upload
        class="upload-demo"
        drag
        action="http://127.0.0.1:8000/upload/uploadApkFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="true"
        multiple
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          only Apk File
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import router from "../router";
import {onMounted} from "vue";

const goBack = () => {
  router.back();
};

const handleSuccess = (response: any) => {
  console.log(response);
  ElMessage.success('文件上传成功');
};

const handleError = (response: any) => {
  console.log(response);
  ElMessage.error('文件上传失败');
};
onMounted(() => {
  window.resizeTo(800,600)
});
</script>

<style scoped>
.back-button {
  position: absolute; /* 绝对定位 */
  top: 20px; /* 距离顶部20px */
  right: 20px; /* 距离右侧20px */
}
</style>
