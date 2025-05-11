import pandas as pd
import numpy as np
import math



def get3PhasePower(Va: pd.Series, Vb: pd.Series, Vc: pd.Series, Ia: pd.Series, Ib: pd.Series, Ic: pd.Series ):
    return Va*Ia + Vb*Ib + Vc*Ic

def getVISensorDataFrame(voltageCurrentList):
    VISensorDataFrame = pd.DataFrame(voltageCurrentList)
    VISensorDataFrame = VISensorDataFrame.assign(S=get3PhasePower(VISensorDataFrame['Va'], VISensorDataFrame['Vb'],\
        VISensorDataFrame['Vc'], VISensorDataFrame['Ia'], VISensorDataFrame['Ib'], VISensorDataFrame['Ic']))
    return VISensorDataFrame

def getApparentPower(realPower: pd.Series, activePower: pd.Series ):
    return pd.Series(np.sqrt((realPower**2 + activePower**2).to_numpy()))

def getDCPowerDataFrame(powerList):
    powerDataFrame = pd.DataFrame(powerList)
    powerDataFrame = powerDataFrame.assign(Sfeed=getApparentPower(powerDataFrame['Pfeed'], powerDataFrame['Qfeed']))
    return powerDataFrame

def getPowersDataFrame(VISensors: pd.DataFrame, DCPowers: pd.DataFrame):
    powersDataFrame = DCPowers.loc[:, ['timestamp', 'Sfeed']]
    VISensorGroupBy = VISensors.groupby('sensorId')
    i = 1
    for sensorId, indices in VISensorGroupBy.groups.items():
        sensorPowers = (VISensors.loc[indices, 'S'])
        sensorPowers.index=[n for n in range(len(indices))]
        powersDataFrame[f'S{sensorId}'] = sensorPowers
        if(sensorId[-1] == '1'):
            powersDataFrame[f'S{sensorId[-1]}'] = powersDataFrame['Sfeed'] - powersDataFrame[f'S{sensorId}']
        else:
            powersDataFrame[f'S{sensorId[-1]}'] = powersDataFrame[f'S{sensorId[:-1]+str(int(sensorId[-1])-1)}'] - powersDataFrame[f'S{sensorId}']
        
        if(i == len(VISensorGroupBy.groups)):
            powersDataFrame[f'S{i+1}'] = powersDataFrame[f'S{sensorId}']
        
        i += 1

    return powersDataFrame


def getSegmentPowers(dataConcentrator):
    return dataConcentrator
