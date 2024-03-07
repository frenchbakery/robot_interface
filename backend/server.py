import sqlite3
import json
import asyncio
from websockets.server import serve

con = sqlite3.connect('robotics.db', check_same_thread=False)
cur = con.cursor()

async def getBatStats(websocket):
    print('received bat status request')
    data = websocket.recv()
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

async def getCurrentBatStats(websocket):
    print('received current bat status request')
    data = websocket.recv()
    print(data)
    cur.execute("SELECT * FROM battery")
    batteries = cur.fetchall()

    res = {}

    for battery in batteries:
        print(battery)
        cur.execute('select * from battery_log where battery_id = ? order by time_stamp desc limit 1', (battery[0],))
        logs = cur.fetchall()
        if len(logs) > 0:
            res[battery[1]] = logs[0][2]
    await websocket.send(json.dumps(res))

async def handler(websocket, path):
    print('received request')
    if path == "/getBatteryStats":
        await getBatStats(websocket)
    elif path == "/getCurrentBatteryStats":
        await getCurrentBatStats(websocket)

async def main():
    async with serve(handler, "localhost", 5000):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())
