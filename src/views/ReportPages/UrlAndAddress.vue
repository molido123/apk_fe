<template>
  <el-card class="analysis-card">
    <div class="header">
      <h1>名单过滤以及动态地址提取</h1>
    </div>
    <div class="content">
      <div class="card-item" v-for="item in cardItems" :key="item.title" :style="{ backgroundImage: item.gradient }">
        <div class="card-icon">
          <img :src="item.iconSrc" alt="icon" class="local-icon"/>
        </div>
        <div class="card-info">
          <h3>{{ item.title }}</h3>
          <p v-if="item.description">{{ item.description }}</p>
          <div v-else-if="item.chartData" class="chart-container" ref="chartContainer"></div>
          <ul v-else>
            <li v-for="(desc, index) in item.list" :key="index">{{ desc }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navigation-buttons">
      <el-button type="primary" @click="handlePrevious" class="gradient-button">上一步</el-button>
      <el-button type="primary" @click="handleNext" class="gradient-button">下一步</el-button>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import router from "../../router";
import axios from "axios";

// 定义类型
interface MessageAddress {
  CN: string,
  OU: string,
  O: string,
  L: string,
  ST: string,
  C: string
}

interface FingerPrint {
  Owner: string,
  issuer: string,
  serialNumber: string,
  validData: string,
  Sha256FingerPrint: string
}

interface Url {
  white: number,
  black: number,
  whiteUnMatched: number,
  blackUnMatched: number,
}

interface CardItem {
  title: string;
  iconSrc?: string; // 新增的属性
  description?: string;
  gradient: string;
  list?: string[];
  chartData?: { matched: number; unmatched: number } | null;
}

const messageAddress = ref<MessageAddress | null>(null);
const fingerPrint = ref<FingerPrint | null>(null);
const urlStats = ref<Url | null>(null);

const fetchMessageAddress = async () => {
  try {
    const apkName = localStorage.getItem('apkName');
    const response = await axios.post('http://localhost:8000/getResults/MessageAddress', { apkName });
    messageAddress.value = response.data;
    console.log(messageAddress)
    updateCardItems();
  } catch (error) {
    console.error('Error fetching Message Address:', error);
  }
};

const fetchFingerPrint = async () => {
  try {
    const apkName = localStorage.getItem('apkName');
    const response = await axios.post('http://localhost:8000/getResults/FingerPrint', { apkName });
    fingerPrint.value = response.data;
    console.log(fingerPrint)
    updateCardItems();
  } catch (error) {
    console.error('Error fetching Finger Print:', error);
  }
};

const fetchUrlStats = async () => {
  try {
    const apkName = localStorage.getItem('apkName');
    const response = await axios.post('http://localhost:8000/getResults/UrlStats', { apkName });
    urlStats.value = response.data;

    updateCardItems();
  } catch (error) {
    console.error('Error fetching URL Stats:', error);
  }
};

const cardItems = ref<CardItem[]>([
  {
    title: '黑名单过滤',
    iconSrc: 'src/assets/黑名单.png',
    description: '',
    gradient: 'linear-gradient(45deg, #f3ec78, #af4261)',
    chartData: null
  },
  {
    title: '指纹',
    iconSrc: 'src/assets/指纹.png',
    list: [] as string[],
    gradient: 'linear-gradient(45deg, #f093fb, #f5576c)'
  },
  {
    title: '通联地址',
    iconSrc: 'src/assets/室内定位.png',
    list: [] as string[],
    gradient: 'linear-gradient(45deg, #89f7fe, #66a6ff)'
  },
  {
    title: '白名单过滤',
    iconSrc: 'src/assets/名称.png',
    description: '',
    gradient: 'linear-gradient(145deg, #43e97b, #38f9d7)',
    chartData: null
  }
]);

const updateCardItems = () => {
  if (urlStats.value) {
    cardItems.value[0].chartData = { matched: urlStats.value.black, unmatched: urlStats.value.blackUnMatched };
    cardItems.value[3].chartData = { matched: urlStats.value.white, unmatched: urlStats.value.whiteUnMatched };
  }
  if (fingerPrint.value) {
    cardItems.value[1].list = [
      `所有者: ${fingerPrint.value.Owner}`,
      `签名者: ${fingerPrint.value.issuer}`,
      `序列号: ${fingerPrint.value.serialNumber}`,
      `有效期: ${fingerPrint.value.validData}`,
      `证书指纹: ${fingerPrint.value.Sha256FingerPrint}`
    ];
  }

  if (messageAddress.value) {
    cardItems.value[2].list = [
      `常用名: ${messageAddress.value.CN}`,
      `组织单位: ${messageAddress.value.OU}`,
      `组织: ${messageAddress.value.O}`,
      `城市或区域: ${messageAddress.value.L}`,
      `州或省: ${messageAddress.value.ST}`,
      `国家: ${messageAddress.value.C}`
    ];
  }
};

const handlePrevious = () => {
  router.back();
};

const handleNext = () => {
  router.push('/PredictDataPage');
};

onMounted(() => {
  fetchUrlStats();
  fetchMessageAddress();
  fetchFingerPrint();
  fetchUrlStats();
});

watch(cardItems, (newItems) => {
  newItems.forEach((item, index) => {
    if (item.chartData) {
      let container = document.querySelectorAll('.chart-container')[index];
      if(index==0)
      {
        container = document.querySelectorAll('.chart-container')[0];
      }
      if(index==3){
        container = document.querySelectorAll('.chart-container')[1];
      }
      if (container) {
        const chartContainer = document.createElement('div');
        chartContainer.style.width = '100%';
        chartContainer.style.height = '130px';
        container.innerHTML = '';
        container.appendChild(chartContainer);
        const chart = echarts.init(chartContainer);
        const option = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '匹配比例',
              type: 'pie',
              radius: '70%',
              data: [
                { value: item.chartData.matched, name: '匹配url' },
                { value: item.chartData.unmatched, name: '未匹配URL' }
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        chart.setOption(option);
      }
    }
  });
}, { deep: true });

</script>

<style scoped>
.local-icon {
  width: 30px;  /* 调整宽度 */
  height: 30px;  /* 调整高度 */
}
.analysis-card {
  width: 90%;
  height: 80%;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 10px;
}

.header h1 {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.header p {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 10px;
  font-weight: bold;

}

.card-item {
  flex: 1;
  min-width: 200px;
  background: #f5f7fa;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  background-size: cover;
}

.card-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  margin-bottom: 15px;
}

.card-info h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.card-info p,
.card-info ul {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.card-info ul {
  padding-left: 0;
  list-style: none;
}

.card-info li {
  text-align: left;
  word-wrap: break-word;  /* 允许长单词换行 */
  overflow-wrap: break-word;  /* 允许长单词换行 */
}

.chart-container {
  width: 100%;
  height: 160px;
  margin-top: 20px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.gradient-button {
  background: linear-gradient(45deg, #42a5f5, #478ed1);
  border: none;
  color: #fff;
}

.gradient-button:hover {
  background: linear-gradient(45deg, #478ed1, #42a5f5);
}
</style>
