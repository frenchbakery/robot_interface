<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="text-h6">Battery Status</div>
      <div v-for="(value, key) in data" :key="key">
        <div class="text-h6">{{ key }}:</div>

        <VuePlotly :data="[value]" :layout="{
          title: 'Battery Status',
          xaxis: {
            title: 'Time'
          },
          yaxis: {
            title: 'Battery Level'
          },
        }" :config="{ staticPlot: true }" />

      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { VuePlotly } from 'vue3-plotly';


const url = 'ws://localhost:5000/getBatteryStats';

const socket = new WebSocket(url);
const data = ref({})

socket.onopen = (event) => {
  socket.send('');
  console.log(event);
  /* setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    socket.send(sendMessage);
  }, 1); */

};

socket.onmessage = (event) => {
  console.log(event.data);
  data.value = JSON.parse(event.data);
};

/* onMounted(() => {
  socket.onopen = (event) => {
    socket.send('');
    console.log(event);

    interval = setInterval(() => {
    const sendMessage = JSON.stringify({ ping: 1 });
    socket.send(sendMessage);
  }, 120000);
  };

  socket.addEventListener('message', (event) => {
    console.log(event.data);
    data.value = JSON.parse(event.data);
    socket.close();
  });

  socket.onerror = function (error) {
    console.log(error);
  };

  socket.onclose = function (event) {
    console.log(event);
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      console.log('[close] Connection died');
    }
  };
}) */

</script>

<style scoped></style>
