from flask import Flask, request, Response
from threading import Thread
from queue import Queue
from time import sleep
import json
from data_handler import getVISensorDataFrame, getDCPowerDataFrame, getPowersDataFrame

taskQueue = Queue()
app = Flask(__name__)

def detectLineFault(dataConcentrator):
    pass

def detectPowerTheft(dataConcentrator):
    pass

def analyseDataConcentrator():
    while True:
        dataConcentrator = taskQueue.get()
        if dataConcentrator:
            VISensorDataFrame = getVISensorDataFrame(dataConcentrator["payload"]["voltageCurrents"])
            DCPowerDataFrame = getDCPowerDataFrame(dataConcentrator["payload"]["powers"])
            print(getPowersDataFrame(VISensorDataFrame, DCPowerDataFrame))
            detectLineFault(dataConcentrator)
            detectPowerTheft(dataConcentrator)
            print(f'INFO: Processed data concentrator {dataConcentrator["id"]}')
            taskQueue.task_done()
        
        sleep(1)

def startThreads():
    for i in range(6):
        thread = Thread(target=analyseDataConcentrator)
        thread.start()

@app.route('/analyse', methods=['POST'])
def createAnalysisTask():
    task = request.get_json()
    taskQueue.put(task)
    return Response(f'Started analytics for {task["id"]}')

if __name__ == '__main__':
    startThreads()
    app.run(debug=False)