<template>
  <div class="container">
    <div class="chart-container">
      <v-chart :option="chartOption" class="chart"></v-chart>
    </div>
    <div class="button-container">
      <el-button type="primary" @click="goBack">上一页</el-button>
      <el-button type="success" @click="goForward">结束</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { useRouter } from 'vue-router';

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, GridComponent, LegendComponent]);

const chartOption = ref({});

const modelsData = [
  {
    model: "CNN",
    accuracy: 0.6802721088435374,
    precision: 0.6930105823490764,
    recall: 0.6802721088435374,
    f1_score: 0.6842701053156133
  },
  {
    model: "Transformer",
    accuracy: 0.2585034013605442,
    precision: 0.28115782653913696,
    recall: 0.2585034013605442,
    f1_score: 0.22288524113533523
  },
  {
    model: "CatBoost",
    accuracy: 0.6190476190476191,
    precision: 0.6558724628822233,
    recall: 0.6190476190476191,
    f1_score: 0.6191390850651199
  },
  {
    model: "MLP",
    accuracy: 0.6530612244897959,
    precision: 0.6858013366636977,
    recall: 0.6530612244897959,
    f1_score: 0.6567629141745546
  },
  {
    model: "RandomForest",
    accuracy: 0.7482993197278912,
    precision: 0.7718946366672989,
    recall: 0.7482993197278912,
    f1_score: 0.7536839176513512
  },
  {
    model: "TabNet",
    accuracy: 0.4421768707482993,
    precision: 0.4629149905576265,
    recall: 0.4421768707482993,
    f1_score: 0.4130546275832962
  },
  {
    model: "MetaModel(堆叠学习）",
    accuracy: 0.7755102040816326,
    precision: 0.7843864418625774,
    recall: 0.7755102040816326,
    f1_score: 0.7788758253896916
  }
];

const initChart = () => {
  chartOption.value = {
    title: {
      text: '模型性能比较',
      left: 'center',
      textStyle: {
        fontSize: 20,
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Accuracy', 'Precision', 'Recall', 'F1 Score'],
      bottom: 0
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: modelsData.map(model => model.model),
      axisLabel: {
        rotate: 30,
        interval: 0,
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1
    },
    series: [
      {
        name: 'Accuracy',
        type: 'bar',
        data: modelsData.map(model => model.accuracy),
        itemStyle: {
          color: '#5470c6'
        }
      },
      {
        name: 'Precision',
        type: 'bar',
        data: modelsData.map(model => model.precision),
        itemStyle: {
          color: '#91cc75'
        }
      },
      {
        name: 'Recall',
        type: 'bar',
        data: modelsData.map(model => model.recall),
        itemStyle: {
          color: '#fac858'
        }
      },
      {
        name: 'F1 Score',
        type: 'bar',
        data: modelsData.map(model => model.f1_score),
        itemStyle: {
          color: '#ee6666'
        }
      }
    ]
  };
};

const router = useRouter();

const goBack = () => {
  router.push("/ShowModels");
};

const goForward = () => {
  router.push('/');
};

onMounted(() => {
  window.resizeTo(800, 700);
  initChart()
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.chart-container {
  margin: 0 auto;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart {
  width: 600px;
  height: 500px;
}

.button-container {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
.el-button {
  border-radius: 20px;
  padding: 10px 20px;
}

.el-button:hover {
  transform: translateY(-2px);
}
</style>
