<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="text-h6">Overview:</div>
      <div class="row">
        <div @click="$router.push(`/battery/${key}`)" class="col-3 q-pa-sm cursor-pointer" v-for="(value, key) in data"
          :key="key">
          <div class="text-h6">{{ key }}: {{ value['percentage'] * 100 }} %</div>
          <battery-status :percentage="value['percentage'] * 100" :isCharging="value['is_charging']" />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import BatteryStatus from 'src/components/BatteryStatus.vue';
import { ref } from 'vue';

const url = 'ws://localhost:5000/getCurrentBatteryStats';

const socket = new WebSocket(url);
const data = ref({})

socket.onopen = (event) => {
  socket.send('');
  console.log(event);
};

socket.addEventListener('message', (event) => {
  console.log(event.data);
  data.value = JSON.parse(event.data);
});
</script>
