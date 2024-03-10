<template>
  <div class="parent">
    <img class="image1" :src="imageSrc" />
    <!--charging image-->
    <img v-if="isCharging" class="image2" src="src/assets/battery/b.png" />
    <!--border-->
    <img v-if="percentage > 29" class="image2" src="src/assets/battery/frame_white.png" />
    <img v-else class="image2" src="src/assets/battery/frame_red.png" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
  },
  isCharging: {
    type: Boolean,
    default: false,
  },
});

const { percentage, isCharging } = toRefs(props);

const imageSrc = computed(() => {
  return `src/assets/battery/${Math.floor(7 * percentage.value / (100))}.png`;

});

</script>

<style scoped>
img {
  width: 50%;
  height: auto;
}
.parent {
  position: relative;
  top: 0;
  left: 0;
}

.image1 {
  position: relative;
  top: 0;
  left: 0;
}

.image2 {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
