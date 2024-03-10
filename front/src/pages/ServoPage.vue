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
import { ref } from 'vue';

const url = 'ws://localhost:5000/servo';

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

const updateServo = (event) => {
  socket.send(JSON.stringify(data.value))
}


/* const setvalue = (event: any) => {
  value.value = event.args.value
}

const marks = ref({
  colorRemaining: '#fff',
  colorProgress: '#fff',
  type: 'line',
  offset: '75%',
  thickness: 5,
  size: '15%',
  majorSize: '15%',
  drawAboveProgressBar: false,
  majorInterval: 15,
  minorInterval: 5,
})

const labels = ref({
  offset: '90%',
  rotate: false,
  step: 15
})

const progressBar = ref({
  size: '45%',
  offset: '25%',
  style: {
    stroke: '#a2da39', strokeWidth: 1, fill: '#a2da39'
  },
  background: {
    stroke: '#d1d2d4', strokeWidth: 1, fill: '#d1d2d4'
  }
})

const pointer = ref({
  type: 'arrow',
  style: { fill: '#a2da39' },
  size: '55%',
  thickness: 5,
  offset: '0%'
}) */




</script>

<style scoped></style>
