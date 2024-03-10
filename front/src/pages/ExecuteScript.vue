<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="row">
        <div class="col-4">
          <!-- Selecting scripts -->
          <div class="text-h6">Execute Scripts</div>
        </div>
        <div class="col-8">
          <!-- Logging and connected nodes -->
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">

// Procedure:
// 1. connect to websocket
// 2. Fetch all scripts
// 3. Fetch all connected nodes
// 4. show scripts to user
// 5. select a script
// 6. press run
// 7. send websocket message to run the script
// 8. get continuous logs from websocket
// 9. show logs to user

import { ref } from 'vue'

const scripts = ref([]);
const connectedNodes = ref([])
const logs = ref([] as string[])
const selectedScript = ref(null);

const ws = new WebSocket('ws://localhost:5000/script')

ws.onopen = () => {
  console.log('Connected to websocket')
}

ws.onmessage = (event: MessageEvent) => {
  console.log('Message from server ', event.data)
}

ws.addEventListener('log', (event: any) => {
  console.log('Test event', event)
  logs.value.push(event.data)
});
</script>

<style scoped></style>
