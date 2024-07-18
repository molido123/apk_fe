<template>
  <div class="modelPage">
    <el-card class="model-card">
      <div class="title">
        <h2>AI模型介绍页</h2>
      </div>
      <div class="stacking-section">
        <el-card class="stacking-card" shadow="hover">
          <div class="subtitle">
            <h2>堆叠学习</h2>
          </div>
          <div class="model-description">
            <el-row :gutter="20">
              <el-col :xs="20" :sm="12" :md="8" v-for="model in models" :key="model.name">
                <el-card class="model-card-inner" :style="{ background: model.gradient }">
                  <div class="model-icon">
                    <img :src="model.icon" alt="Model Icon">
                  </div>
                  <h3>{{ model.name }}</h3>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
      <div class="navigation-buttons">
        <el-button @click="previousStep">上一页</el-button>
        <el-button type="primary" @click="nextStep">下一页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import router from "../../router";

const models = ref([
  {
    name: 'CNN-1D',
    icon: 'src/assets/卷积网络.png',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    name: 'Random Forest',
    icon: 'src/assets/random-forest.png',
    gradient: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)'
  },
  {
    name: 'TabNet',
    icon: 'src/assets/res-network.png',
    gradient: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)'
  },
  {
    name: 'MLP',
    icon: 'src/assets/机器学习_分类_多层感知机.png',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    name: 'Transformer',
    icon: 'src/assets/深度学习.png',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)'
  },
  {
    name: 'CatBoost',
    icon: 'src/assets/catboost.png',
    gradient: 'linear-gradient(135deg, #6f9a9e 0%, #fecfef 99%, #fecfef 100%)'
  }
]);

const previousStep = () => {
  router.push('/')
  console.log('上一步');
};

const nextStep = () => {
  router.push('/ShowBarChart')
  console.log('下一步');
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
  animateResizeTo(800, 1100, 40); // 目标尺寸和动画持续时间

});
</script>

<style scoped>
.modelPage {
  padding: 10px;

  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.model-card {
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.stacking-section {
  width: 100%;
  margin-top: 5px;
}

.stacking-card {
  padding: 10px;
  border: 2px solid #dcdfe6; /* 边框颜色和厚度 */
  border-radius: 10px; /* 边框圆角 */
}

.title, .subtitle {
  text-align: center;
}

.model-description {
  margin-bottom: 10px;
}

.model-card-inner {
  text-align: center;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s;
}

.model-card-inner:hover {
  transform: scale(1.05);
}

.model-icon img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
}

@media (max-width: 768px) {
  .modelPage {
    padding: 10px;
  }

  .model-card {
    padding: 10px;
  }

  .model-card-inner {
    padding: 15px;
  }

  .navigation-buttons {
    flex-direction: column;
    align-items: center;
  }

  .navigation-buttons el-button {
    margin-bottom: 10px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .model-card-inner {
    padding: 10px;
  }

  .model-icon img {
    width: 40px;
    height: 40px;
  }

  .title h2, .subtitle h3 {
    font-size: 1.2em;
  }
}
</style>
