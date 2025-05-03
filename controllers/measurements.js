import {addPowers, addVoltageCurrents, addSubStationPowers} from '../services/db.js';

const addNewMeasurements = async function(req, res) {
    const startTime = Date.parse(req.body.metadata.timestamp_start);
    const stopTime = Date.parse(req.body.metadata.timestamp_stop);
    const setStopTimeS = req.body.metadata.stop_time_s;
    const simulationTimeMs = stopTime-startTime;
    const dataConcentrators = req.body.data_concentrators;
    let reply = {
        send : ''
    };
    try{
        for(let i = 0; i < dataConcentrators.length; i++){
            let powers = dataConcentrators[i].payload.powers;
            for(let j = 0; j < powers.length; j++){
                powers[j].timestamp = new Date(startTime + (powers[j].timestamp * simulationTimeMs / setStopTimeS));
            }
            powers = await addPowers(powers);

            let voltageCurrents = dataConcentrators[i].payload.voltageCurrents; 
            for(let j = 0; j < voltageCurrents.length; j++){
                voltageCurrents[j].timestamp = new Date(startTime + (voltageCurrents[j].timestamp * simulationTimeMs / setStopTimeS));
            }
            voltageCurrents = await addVoltageCurrents(voltageCurrents);

            if(powers && voltageCurrents){
                reply.send = 'sucess';
            }else{
                reply.send = 'fail';
            }
        }
        let subStationPowers = req.body.sub_station;
        for(let j = 0; j < subStationPowers.length; j++){
            subStationPowers[j].timestamp = new Date(startTime + (subStationPowers[j].timestamp * simulationTimeMs / setStopTimeS));
        }
        subStationPowers = await addSubStationPowers(subStationPowers);
        if(subStationPowers){
            reply.send = 'sucess';
        }else{
            reply.send = 'fail';
        }
        res.status(200).send(JSON.stringify(reply));

    }catch(err){
        console.error(err);
        res.status(500).send(JSON.stringify(err));
    
    }
}

export {addNewMeasurements};