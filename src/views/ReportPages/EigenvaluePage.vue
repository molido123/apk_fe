<template>
    <el-card class="analysis-card">
      <div class="card-header">
        <h2>APK特征值分析结果</h2>
      </div>
      <div class="card-content">
        <div class="card-item" v-for="item in cardItems" :key="item.title" :style="{ backgroundColor: item.color }">
          <div class="card-icon">
            <el-avatar :icon="item.icon" />
          </div>
          <div class="card-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div class="table-container">
        <el-table :data="tableData" border stripe>
          <el-table-column prop="attribute" label="特征" />
          <el-table-column prop="value" label="具体" />
        </el-table>
      </div>
      <div class="navigation-buttons">
        <el-button type="primary" @click="handlePrevious">
          上一步
        </el-button>
        <el-button type="primary" @click="handleNext">
          下一步
        </el-button>
      </div>
    </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { ElAvatar } from 'element-plus';
import router from "../../router";
import axios from "axios";

// 定义APK数据的类型
interface ApkData {
  apk_name: string;
  api_calls: string;
  permissions: string;
  suspicious_resources: string;
  entropy: string;
  version: string;
  storage: string;
  base_name_length: string;
  top_level_domain_match: string;
  sensitive_api_count: string;
  md5_value: string;
}

const apkData = ref<ApkData | null>(null);

const fetchApkEigenValue = async () => {
  try {
    const apkName = localStorage.getItem('apkName');
    const response = await axios.post('http://localhost:8000/getResults/eigenValueInfo', { apkName });
    apkData.value = response.data;

    // 更新 cardItems 和 tableData
    updateCardItems();
    updateTableData();
  } catch (error) {
    console.error('Error fetching APK EigenValue:', error);
  }
};

const cardItems = ref([
  { icon: 'el-icon-document', title: '应用程序名称', description: '', color: '#cbd3df' },
  { icon: 'el-icon-data-analysis', title: '应用程序包大小', description: '', color: '#76dbe8' },
  { icon: 'el-icon-lock', title: '应用程序版本号', description: '', color: '#e5e6e6' },
  { icon: 'el-icon-s-check', title: 'apk的MD5', description: '', color: '#ede7e6' }
]);

const tableData = ref([
  { attribute: '包名', value: '' },
  { attribute: '包长度', value: '' },
  { attribute: '版本号', value: '' },
  { attribute: '信息熵', value: '' },
  { attribute: 'api数量', value: '' },
  { attribute: '权限数量', value: '' },
  { attribute: '顶级域名匹配', value: '' },
  { attribute: '敏感API数量', value: '' },
  { attribute: '资源文件数量', value: '' }
]);

const updateCardItems = () => {
  if (apkData.value) {
    cardItems.value[0].description = apkData.value.apk_name;
    cardItems.value[1].description = `${apkData.value.storage} MB`;
    cardItems.value[2].description = apkData.value.version;
    cardItems.value[3].description = apkData.value.md5_value;
  }
};

const updateTableData = () => {
  if (apkData.value) {
    tableData.value = [
      { attribute: '包名', value: apkData.value.apk_name },
      { attribute: '包长度', value: apkData.value.base_name_length },
      { attribute: '版本号', value: apkData.value.version },
      { attribute: '信息熵', value: apkData.value.entropy },
      { attribute: 'api数量', value: apkData.value.api_calls },
      { attribute: '权限数量', value: apkData.value.permissions },
      { attribute: '顶级域名匹配', value: apkData.value.top_level_domain_match ? '是' : '否' },
      { attribute: '敏感API数量', value: apkData.value.sensitive_api_count },
      { attribute: '资源文件数量', value: apkData.value.suspicious_resources }
    ];
  }
};

const handlePrevious = () => {
  router.back();
};

const handleNext = () => {
  router.push('/UrlAndAddress')
};
function animateResizeTo(targetWidth, targetHeight, duration) {
  const startTime = performance.now();
  const startWidth = window.innerWidth;
  const startHeight = window.innerHeight;
  const startX = window.screenX + window.outerWidth / 2;
  const startY = window.screenY + window.outerHeight / 2;

  function animate(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const newWidth = startWidth + (targetWidth - startWidth) * progress;
    const newHeight = startHeight + (targetHeight - startHeight) * progress;

    const newX = startX - newWidth / 2;
    const newY = startY - newHeight / 2;

    window.moveTo(newX, newY);
    window.resizeTo(newWidth, newHeight);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
onMounted(() => {
  animateResizeTo(900, 900, 40); // 目标尺寸和动画持续时间
  fetchApkEigenValue();
});
</script>


<style scoped>

.analysis-card {
  width: 90%;
  height: 90%;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: #ffffff;
}

.card-header {
  text-align: center;
  margin-bottom: 10px;
}

.card-header h2 {
  font-size: 15px;
  color: #333;
  margin: 0;
}

.card-header p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.card-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
}

.card-item {
  flex: 1;
  min-width: 190px;
  background: #f5f7fa;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s;
}

.card-item:hover {
  transform: translateY(-5px);
}

.card-icon {
  margin-bottom: 5px;
}

.card-info h3 {
  font-size: 18px;
  color: #333;
  margin: 0;

}

.card-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
  word-wrap: break-word;  /* 允许长单词换行 */
  overflow-wrap: break-word;  /* 允许长单词换行 */
}

.table-container {
  margin-top: 10px;
}

.el-table {
  width: 100%;
}

.el-avatar {
  background-color: #409eff;
  color: #fff;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
