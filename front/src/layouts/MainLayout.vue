<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-grey">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
        <div>
          <!-- <span v-for="(value, key) in data" :key="key" style="margin: 10px; border: 1px solid black">
            {{ key }}
            <q-tooltip>
              Batterie {{ key }}: {{ Math.round(value['percentage'] * 100) }} %
            </q-tooltip>
          </span> -->
          IP: {{ ip }}
          <q-btn flat dense class="bg-negative q-ml-md" label="Shutdown" @click="send('shutdown')" />
          <q-btn flat dense class="bg-negative q-ml-md" label="Reboot" @click="send('reboot')" />
          <q-btn flat dense class="bg-negative q-ml-md" label="Reload site" @click="reload" />
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
        <q-item to="/logs">
          Logs
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
import axios from 'axios';
import BatteryStatus from 'src/components/BatteryStatus.vue';

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const hostname = window.location.hostname

const url = `ws://${hostname}/script`;

const socket = new WebSocket(url);
const data = ref({})
const ip = ref('')

socket.onopen = (event) => {
  socket.send(JSON.stringify({type: 'getCurrentBatStats', data: ''}));
  console.log(event);
};

socket.addEventListener('message', (event) => {
  console.log(event.data);
  const parsedData = JSON.parse(event.data);
  if (parsedData.type === 'getCurrentBatStats') {
    data.value = parsedData.data;
  } else if(parsedData.type === 'ip') {
    ip.value = parsedData.data;
  }
});

onBeforeUnmount(() => {
  socket.close()
})

const reload = () => {
  location.reload()
}
const send = (type: string) => {
  axios.get(`http://${hostname}/${type}`)
}
</script>
