import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const addSensors = async function(sensors){
    const result = await prisma.sensor.createMany({
        data : sensors,
    })
    return result;
}
const addPowers = async function(powers){
    const result = await prisma.power.createMany({
        data : powers,
    })
    return result;
}
const addVoltageCurrents = async function(voltageCurrents){
    const result = await prisma.voltageCurrent.createMany({
        data : voltageCurrents,
    })
    return result;
}
const addSubStationPowers = async function(subStationPowers){
    const result = await prisma.subStationPower.createMany({
        data: subStationPowers, 
    });
}
const addCustomerConsumption = async function(customerConsumption){
    const result = await prisma.customerConsumption.createMany({
        data: customerConsumption, 
    });
}

const addPowerLoss = async function(powerLoss){
    const result = await prisma.loss.createMany({
        data: powerLoss, 
    });
    console.log(powerLoss);
}


export {addSensors, addPowers, addVoltageCurrents, addSubStationPowers, addCustomerConsumption, addPowerLoss};