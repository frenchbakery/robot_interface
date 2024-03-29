<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="text-h6">Servo Control</div>
      <div v-for="(item, key) in data" :key="key">
        <div>{{ key }}</div>
        <div>{{ item.servo_position }}</div>
        <q-slider @change="updateServo" v-model="item.servo_position" vertical reverse :min="0" :max="180" />
      </div>
      <!-- <JqxKnob :value="value" :min="0" :max="180" :startAngle="150" :endAngle="390"
        :rotation="'clockwise'" :labels="labels" :progressBar="progressBar" >
      </JqxKnob> -->

      {{ data }}
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';

const hostname = window.location.hostname;
const url = `ws://${hostname}/script`;

const socket = new WebSocket(url);
const data = ref({} as Record<string, object>);

socket.onopen = (event) => {
  socket.send('');
  console.log(event);
};

socket.onmessage = (event) => {
  console.log(event.data);
  data.value = JSON.parse(event.data);
  return false
};

socket.onclose = (event) => {
  console.log(event)
}

onBeforeUnmount(() => {
  socket.close()
})

const updateServo = (event) => {
  socket.send(JSON.stringify(data.value))
}
</script>

<style scoped></style>
