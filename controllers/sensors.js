import {addSensors} from '../services/db.js';

const addNewSensors = async function(req, res) {
    const sensors = await addSensors(req.body.sensors);
    if(sensors){
        res.status(200).send(JSON.stringify({'send': 'success'}));
    }else{
        res.status(200).send(JSON.stringify({'send': 'fail'}));
    }
}

export {addNewSensors};