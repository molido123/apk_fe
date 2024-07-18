<template>
  <div class="custom-button" @click="handleClick" :style="[borderStyle, { background: props.backgroundColor }]">
    <div class="button-content">
      <el-image :src="imageSrc" fit="contain" />
      <el-button type="primary" class="button">{{ buttonText }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const props = defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  shadowType: {
    type: String,
    default: '',
  },
  backgroundColor: {
    type: String,
    default: 'linear-gradient(135deg, #42a5f5, #478ed1)',
  },
});

const emits = defineEmits(['click']);

const router = useRouter();

const handleClick = () => {
  emits('click', props.redirectUrl);
  router.push(props.redirectUrl);
};

const getCssVarName = (type: string) => {
  return `var(--el-box-shadow${type ? '-' : ''}${type})`;
};

const borderStyle = computed(() => ({
  boxShadow: getCssVarName(props.shadowType),
}));
</script>

<style scoped>
.custom-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s, background 0.3s;
  margin: 10px;
  width: 100%; /* 确保按钮容器占满父元素的宽度 */
  height: 150px; /* 你可以根据需要调整高度 */
  box-sizing: border-box;
  border-radius: 8px; /* 添加圆角 */
}
.custom-button:hover {
  filter: brightness(0.95);
}
.button-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* 确保图片在上半部分，按钮在下半部分 */
  height: 100%;
  width: 100%;
}
.button-image {
  max-height: 60%; /* 图片占容器高度的 60% */
  width: auto; /* 保持图片的宽高比 */
}
.button {
  width: 100%; /* 确保按钮占满容器宽度 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
