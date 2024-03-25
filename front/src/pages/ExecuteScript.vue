<template>
  <q-page class="q-ma-xs" style="overflow: none">
    <q-card class="q-pa-sm">
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
          <q-btn @click="selectedTab='logs'" class="text-h6">Logs</q-btn>
          <q-btn @click="selectedTab='nodes'" class="text-h6">Nodes</q-btn>
          <q-btn @click="selectedTab='scripts'" class="text-h6">Scripts</q-btn>
          <q-card class="q-pa-md" v-if="selectedTab == 'logs'">
          <div class="text-h6">Logs</div>
            <div class="q-mt-md">
              <q-list bordered style="max-height: 275px; overflow-y: scroll">
                <q-item v-for="(log, key) in logs" :key="key">
                  <q-item-section>{{ log[0] }}: {{ log[1].msg}}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <q-card class="q-pa-md" v-if="selectedTab == 'nodes'">
          <div class="text-h6">Nodes</div>
            <div class="q-mt-md">
              <q-list bordered style="max-height: 275px; overflow-y: scroll">
                <q-item v-for="(node, key) in connectedNodes" :key="key">
                  <q-item-section>{{node[0]}}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <q-card class="q-pa-md" v-if="selectedTab == 'scripts'">
          <div class="text-h6">Scripts</div>
            <div class="q-mt-md">
              <q-list bordered style="max-height: 275px; overflow-y: scroll">
                <q-item v-for="(node, key) in runningScripts" :key="key">
                  <q-item-section>{{node}}</q-item-section>
                  <q-item-section><q-btn label="Kill" @click="killScript(node)"/></q-item-section>
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
const selectedTab = ref('logs')
const connectedNodes = ref([] as any[])
const logs = ref([] as any[])
const selectedScript = ref(null);
const selectedCompileScripts = ref(null);
const runningScripts = ref([] as any[])

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
    logs.value.unshift([time.toISOString().substring(11, 19), data.data])
  } else if (data.type === 'fetchConnectedNodes') {
    connectedNodes.value = data.data
  } else if (data.type === 'runningScripts') {
    runningScripts.value = data.data
  }
}

const executeScript = () => {
  console.log('Executing script', selectedScript.value)
  ws.send(JSON.stringify({type: 'executeScript', data: selectedScript.value}))
}

const killScript = (script: string) => {
  console.log('Killing script', script)
  ws.send(JSON.stringify({type: 'killScript', data: script}))
}

</script>

<style scoped></style>
