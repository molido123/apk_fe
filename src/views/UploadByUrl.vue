<template>
    <el-form
        ref="formRef"
        class="upload-form"
        :model="form"
        label-width="70px"
    >
      <h2 class="form-title">Upload URL</h2>
      <el-form-item
          prop="url"
          label="URL"
          :rules="[
          { required: true, message: '请输入URL', trigger: 'blur' },
          { type: 'url', message: '请输入正确的URL', trigger: ['blur', 'change'] },
        ]"
      >
        <el-input v-model="form.url" placeholder="请输入URL" />
      </el-form-item>
      <el-form-item class="form-actions">
        <el-button type="primary" @click="submitForm(formRef)">提交</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :visible.sync="dialogVisible" title="Success">
      <div class="dialog-content">
        <span>URl上传成功！</span>
      </div>

    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const form = reactive({
  url: '',
})
const dialogVisible = ref(false)

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios.post('http://127.0.0.1:8000/upload/uploadUrl', form)
          .then(() => {
            ElMessage.success('URL uploaded successfully!')
            dialogVisible.value = true
          })
          .catch(error => {
            console.error(error)
            ElMessage.error('Failed to upload URL')
          })
    } else {
      console.log('error submit!')
    }
  })
}

const goBack = () => {
  window.history.back()
}
</script>

<style scoped>


.upload-form {
  width: 100%;
  background: #fff;
  align-items: flex-start;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
  color: #333;
}

.form-actions {
  text-align: center;
}

.el-input__inner {
  border-radius: 5px;
}

.dialog-content {
  text-align: center;
  font-size: 16px;
}

.dialog-footer {
  text-align: center;
}

.el-button {
  margin: 0 5px;
}
</style>
