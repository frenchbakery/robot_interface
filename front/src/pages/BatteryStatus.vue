<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="text-h6">Battery Status</div>
      <div v-for="(value, key) in result" :id="key" :key="key">
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VuePlotly } from 'vue3-plotly';


const hostname = window.location.hostname;
const url = `ws://${hostname}/script`;

const socket = new WebSocket(url);
const data = ref({} as Record<string, object>);

const route = useRoute();

socket.onopen = (event) => {
  socket.send('');
  console.log(event);
};

socket.onmessage = (event) => {
  console.log(event.data);
  const parsedData = JSON.parse(event.data);
  if (parsedData.type === 'getBatStats') {
    data.value = parsedData.data;
  }
};

socket.onclose = (event) => {
  console.log(event)
}

const result = computed(() => {
  const param = route.params.id as string;
  if (param && data.value[param]) {
    const res = {} as Record<string, object>;
    res[route.params.id as string] = data.value[route.params.id as string]
    return res;
  }
  return data.value;
});

onBeforeUnmount(() => {
  socket.close()
})

</script>

<style scoped></style>
