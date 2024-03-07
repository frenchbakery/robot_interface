<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="text-h6">Overview:</div>
      <div class="row">
        <q-card @click="$router.push('/battery')" class="col-6 q-pa-sm cursor-pointer" v-for="(value, key) in data" :key="key">
          <div class="text-h6">{{ key }}: {{ value * 100 }} %</div>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
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
  socket.close();
});
</script>
