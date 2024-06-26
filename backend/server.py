import sqlite3
import json
import asyncio
from websockets.server import serve, WebSocketServerProtocol
import os

from models import ExecutionStruct

con = sqlite3.connect('robotics.db', check_same_thread=False)
cur = con.cursor()

async def getBatStats(websocket, data):
    print('received bat status request')
    print(data)
    cur.execute("SELECT * FROM battery")
    batteries = cur.fetchall()

    res = {}

    for battery in batteries:
        print(battery)
        cur.execute('select * from battery_log where battery_id = ? order by time_stamp desc limit 30', (battery[0],))
        logs = cur.fetchall()
        res[battery[1]] = {'x': [log[3] for log in logs], 'y': [log[2] for log in logs], 'type': 'scatter'}

    await websocket.send(json.dumps(res))
    await asyncio.sleep(0)

async def getCurrentBatStats(websocket, data):
    print('received current bat status request')
    print(data)
    cur.execute("SELECT * FROM battery")
    batteries = cur.fetchall()

    res = {}

    for battery in batteries:
        print(battery)
        cur.execute('select * from battery_log where battery_id = ? order by time_stamp desc limit 1', (battery[0],))
        logs = cur.fetchall()
        if len(logs) > 0:
            res[battery[1]] = { 'percentage': logs[0][2], 'is_charging': logs[0][4] }
    await websocket.send(json.dumps(res))
    await asyncio.sleep(0)

async def servo(websocket, data):
    print('received servo request')
    # data format: {servo1: { servo_position: value, active: boolean }, servo2: { servo_position: value, active: boolean }, ...}

    print(data)
    # update database
    if len(data) != 0:
        for key, value in json.loads(data).items():
            cur.execute('update servo set servo_position = ?, is_active = ? where name = ?', (value["servo_position"], value["active"], key))
    con.commit()
    # set servos to values in data
    # return all servo data
    cur.execute('select * from servo')
    servos = cur.fetchall()
    res = {}
    for servo in servos:
        res[servo[1]] = {'servo_position': servo[2], 'active': servo[3]}
    # await websocket.send(json.dumps(res))
    await websocket.send(json.dumps(res))

async def script(websocket: WebSocketServerProtocol, data):
    print('received script request')
    print(data)

    data = json.loads(data)

    response = ExecutionStruct(type='any', data='')
    if data['type'] == 'start':
        print('starting script')
        # start script
    elif data['type'] == 'stop':
        print('stopping script')
        # stop script
    elif data['type'] == 'fetchScripts':
        print('fetching scripts')
        # fetch scripts
        files = os.listdir('scripts') 
        response.data = files
        response.type = 'fetchScripts'
        await websocket.send(json.dumps(response.__dict__))
    elif data['type'] == 'executeScript':
        # https://www.linuxquestions.org/questions/programming-9/python%27s-subprocess-run-method-is-held-up-by-stdout-4175613294/
        print('executing script')
        # execute script
        script = data['data']
        # warten auf matteo
        response.data = 'executing script'
        response.type = 'log'
        await websocket.send(json.dumps(response.__dict__))
    elif data['type'] == 'fetchConnectedNodes':
        print('fetching connected nodes')
        # fetch connected nodes
        response.data = ['node1', 'node2', 'node3']
        response.type = 'fetchConnectedNodes'
        await websocket.send(json.dumps(response.__dict__))

    else:
        print('invalid script command')

connected_clients = set()
async def handler(websocket: WebSocketServerProtocol, path):
    print('received request')
    connected_clients.add(websocket)
    try:
        async for data in websocket:
            if path == "/getBatteryStats":
                await getBatStats(websocket, data)
            elif path == "/getCurrentBatteryStats":
                await getCurrentBatStats(websocket, data)
            elif path == "/servo":
                await servo(websocket, data)
            elif path == "/script":
                await script(websocket, data) 
    finally:
        connected_clients.remove(websocket)


async def main():
    async with serve(handler, "localhost", 5000, close_timeout=None):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
