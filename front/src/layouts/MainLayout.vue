<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>
          <span v-for="(value, key) in data" :key="key" style="margin: 10px; border: 1px solid black">
            {{ key }}
            <q-tooltip>
              Batterie {{ key }}: {{ Math.round(value['percentage'] * 100) }} %
            </q-tooltip>
          </span>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item icon="info" label="Essential Links" to="/">
          Overview
        </q-item>
        <q-item to="/battery">
          Battery
        </q-item>
        <q-item to="/servo">
          Servo
        </q-item>
        <q-item to="/script">
          System
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue';
import BatteryStatus from 'src/components/BatteryStatus.vue';

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const url = 'ws://localhost:5000/getCurrentBatteryStats';

const socket = new WebSocket(url);
const data = ref({})

socket.onopen = (event) => {
  socket.send('');
  console.log(event);
};

socket.addEventListener('message', (event) => {
  console.log(event.data);
  const parsedData = JSON.parse(event.data);
  if (parsedData.type === 'getCurrentBatStats') {
    data.value = parsedData.data;
  }
});

onBeforeUnmount(() => {
  socket.close()
})
</script>
