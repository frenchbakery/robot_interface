<template>
  <q-page class="q-ma-sm">
    <div class="text-h6">Logs</div>
    <q-card>
      <div v-for="(value, key) in logs" :key="key">
        <q-card-section>
          <div class="text-h6">{{ value.time_stamp }}</div>
          <div class="text-subtitle1">{{ value.logger }}</div>
          <div class="text-body2">{{ value.msg }}</div>
          <div class="text-caption">{{ value.file }}:{{ value.line }} {{ value.function }}</div>
        </q-card-section>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Log {
  id: number;
  logger: string;
  msg: string;
  file: string;
  line: number;
  function: string;
  name: string;
  level: number;
  time_stamp: string;
}

const logs = ref([] as Log[])

const url = 'ws://localhost:5000/getLogs';
const socket = new WebSocket(url);

socket.onopen = (event) => {
  socket.send('');
  console.log(event);
};

socket.addEventListener('message', (event) => {
  console.log(event.data);
  const parsedData = JSON.parse(event.data);
  if (parsedData.type === 'getLogs') {
    logs.value = parsedData.data;
  } else if (parsedData.type === 'log') {
    logs.value.push(parsedData.data);
  }
});

</script>
