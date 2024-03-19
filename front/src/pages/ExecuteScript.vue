<template>
  <q-page class="q-ma-md">
    <q-card class="q-pa-md">
      <div class="row">
        <div class="col-3">
          <!-- Selecting scripts -->
          <div class="text-h6">Execute Scripts</div>
          <q-select
            v-model="selectedScript"
            :options="scripts"
            label="Select a script"
            emit-value
            map-options
          />
          <q-btn label="Run" color="primary" class="q-mt-md" @click="executeScript"/>
          <div class="text-h6 q-mt-md">Compile</div>
          <q-select
            v-model="selectedCompileScripts"
            :options="scripts"
            label="Select a script"
            emit-value
            map-options
            multiple
          />
          <q-btn label="Compile" color="primary" class="q-mt-md" @click="executeScript"/>
        </div>
        <div class="col-9">
          <!-- Logging and connected nodes -->
          <q-card class="q-pa-md">
            <div class="text-h6">Logs</div>
            <div class="q-mt-md">
              <q-list bordered>
                <q-item v-for="(log, key) in logs" :key="key">
                  <q-item-section>{{ log[0] }}: {{ log[1].msg}}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card>
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
const logs = ref([] as any[])
const selectedScript = ref(null);
const selectedCompileScripts = ref(null);

const ws = new WebSocket('ws://localhost:5000/script')

ws.onopen = () => {
  console.log('Connected to websocket')
  ws.send(JSON.stringify({type: 'fetchScripts'}))
  ws.send(JSON.stringify({type: 'fetchConnectedNodes'}))
}

ws.onmessage = (event: MessageEvent) => {
  // event.data: {type: str, data: any}
  console.log('Message from server ', event.data)
  const data = JSON.parse(event.data)
  const time = new Date()
  if (data.type === 'fetchScripts') {
    scripts.value = data.data
  } else if (data.type === 'log') {
    logs.value.push([time.toISOString().substring(11, 19), data.data])
  }
}

const executeScript = () => {
  console.log('Executing script', selectedScript.value)
  ws.send(JSON.stringify({type: 'executeScript', data: selectedScript.value}))
}
</script>

<style scoped></style>
