<template>
  <div class="upload-container">
    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action="http://127.0.0.1:8000/upload/uploadQR"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-error="handleError"
        list-type="picture"
    >
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png文件，仅能上传二维码图片
        </div>
      </template>
    </el-upload>
    <el-button type="danger" @click="handleReset">返回</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import type { UploadProps, UploadUserFile } from 'element-plus'
import router from '../router';

const fileList = ref<UploadUserFile[]>([

])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

const handleError: UploadProps['onError'] = (err, file, fileList) => {
  ElMessage.error(`File ${file.name} upload failed.`)
}

const handleReset = () => {
  router.back()
}
</script>

<style scoped>
.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.upload-demo {
  margin-bottom: 10px;
}

.el-upload__tip {
  color: #909399;
  font-size: 12px;
}

.el-button {
  width: 150px;
}
</style>
