<template>
  <div class="apkFileList" ref="apkFileList">
    <el-card>
      <div class="table-container">
        <el-table :data="tableData">
          <el-table-column fixed prop="fileName" label="检测文件名" width="200" />
          <el-table-column prop="uploadedTime" label="上传时间" width="200" />
          <el-table-column prop="status" label="状态" width="110">
            <template #default="{ row }">
              <el-tag :type="getTagType(row.status)">{{ row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="completedTime" label="完成时间" width="200" />
          <el-table-column fixed="right" label="操作" min-width="150">
            <template #default="{ row }">
              <el-button link type="primary" size="small" :disabled="row.status !== 'completed'" @click="handleClick(row)">
                查看报告
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bottom-buttons">
        <el-button type="primary" @click="fetchTableData">
          刷新
        </el-button>
        <el-button type="primary" @click="goBack">
          返回
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from "../router";
const tableData = ref([
  {
    fileName: "",
    uploadedTime: "",
    status: "",
    completedTime: ""
  }
]);

const handleClick = (row: any) => {
  ElMessage({
    message: `查看报告: ${row.fileName}`,
    type: 'info',
  });
  localStorage.removeItem('apkName');
  localStorage.setItem("apkName",row.fileName)
  navigate("/EigenvaluePage")
}
const navigate = (url: string) => {
  router.push(url);
};
const fetchTableData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/getResults/fileLists'); // 替换为你的后端 API 端点
    tableData.value = response.data.map((item: any) => ({
      fileName: item.fileName,
      uploadedTime: item.uploadedTime,
      status: item.status,
      completedTime: item.completedTime
    }),
    ElMessage({
          message: `刷新成功`,
          type: 'info',
        })
    );
  } catch (error) {
    console.error('Error fetching table data:', error);
    ElMessage({
      message: '获取数据失败',
      type: 'error',
    });
  }
}

const getTagType = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'processing':
      return 'warning';
    default:
      return 'info';
  }
}

onMounted(() => {
  fetchTableData()
  window.resizeTo(1200,700)

});

const goBack = () => {
  router.push('/')
};
</script>

<style scoped>
.apkFileList {
  padding: 5px;
  box-sizing: border-box;
  height: 80vh;
  width: 80vw;
}

.el-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.table-container {
  flex: 1;
  max-height: calc(80vh - 120px); /* Adjust based on the desired table height */
  overflow-y: auto;
}

.el-table {
  width: 100%;
}

.el-table th,
.el-table td {
  text-align: center;
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: white;
  border-top: 1px solid #ebeef5;
}

.el-button {
  margin-right: 10px;
}
</style>
