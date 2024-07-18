<template>
  <el-card class="radar-card">
    <div class="card-header">
      <el-header>预测结果</el-header>
      <p>每个方向分别为 white, black, scam, gamble 和 sex 的概率</p>
    </div>
    <div class="card-content">
      <v-chart :option="radarChartOption" class="radar-chart"></v-chart>
    </div>
    <div class="final-result" v-if="predictData">
      <el-divider>最终结果</el-divider>
      <p class="result-text">预测结果是 {{ predictData.predicted_label }}</p>
    </div>
  </el-card>
  <div class="bottom-buttons">
    <el-button type="primary" @click="goBack">
      上一页
    </el-button>
    <el-button type="success" @click="handleNext">
      结束查看
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { RadarChart } from 'echarts/charts';
import { TooltipComponent, TitleComponent, LegendComponent } from 'echarts/components';
import router from '../../router';
import axios from "axios";

use([CanvasRenderer, RadarChart, TooltipComponent, TitleComponent, LegendComponent]);

interface PredictData {
  predicted_label: string;
  predicted_probabilities: {
    black: number;
    gamble: number;
    scam: number;
    sex: number;
    white: number;
  };
}

interface SeriesData {
  name: string;
  type: string;
  data: {
    value: number[];
    name: string;
    symbol: string;
    symbolSize: number;
    lineStyle: {
      width: number;
    };
    itemStyle: {
      color: string;
    };
    areaStyle: {
      opacity: number;
    };
  }[];
}

const predictData = ref<PredictData | null>(null);

const radarChartOption = ref({
  tooltip: {
    trigger: 'item',
  },
  radar: {
    shape: 'circle',
    indicator: [
      { name: 'white', max: 1 },
      { name: 'black', max: 1 },
      { name: 'scam', max: 1 },
      { name: 'gamble', max: 1 },
      { name: 'sex', max: 1 },
    ],
    splitLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.2)',
      },
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(0, 0, 0, 0.2)',
      },
    },
    splitArea: {
      areaStyle: {
        color: ['#f7f7f7', '#e9e9e9'],
      },
    },
  },
  series: [] as SeriesData[],
});

const fetchApkEigenValue = async () => {
  try {
    const apkName = localStorage.getItem('apkName');
    const response = await axios.post('http://localhost:8000/getResults/predictValueInfo', { apkName });
    predictData.value = response.data;
  } catch (error) {
    console.error('Error fetching APK EigenValue:', error);
  }
};

watch(predictData, (newVal) => {
  if (newVal) {
    radarChartOption.value.series = [
      {
        name: '标签对比',
        type: 'radar',
        data: [
          {
            value: [
              newVal.predicted_probabilities.white,
              newVal.predicted_probabilities.black,
              newVal.predicted_probabilities.scam,
              newVal.predicted_probabilities.gamble,
              newVal.predicted_probabilities.sex,
            ],
            name: newVal.predicted_label,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 2,
            },
            itemStyle: {
              color: '#ff6f61',
            },
            areaStyle: {
              opacity: 0.2,
            },
          },
        ],
      },
    ] as SeriesData[];
  }
});

const goBack = () => {
  router.back();
};

const handleNext = () => {
  router.push('/ResultsQueryPage');
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
.radar-card {
  width: 90%;
  max-width: 1000px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: #ffffff;
  padding: 20px;
  transition: transform 0.3s;
}

.radar-card:hover {
  transform: translateY(-5px);
}

.card-header {
  text-align: center;
  margin-bottom: 20px;
}

.card-header h2 {
  font-size: 24px;
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
  flex-direction: column;
  align-items: center;
}

.radar-chart {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
}

.final-result {
  text-align: center;
  margin-top: 20px;
}

.result-text {
  font-size: 16px;
  color: #333;
}

.bottom-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.el-button {
  border-radius: 20px;
  padding: 10px 20px;
}

.el-button:hover {
  transform: translateY(-2px);
}
</style>
