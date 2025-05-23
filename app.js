import express from 'express';
import {addNewMeasurements} from './controllers/measurements.js';
import { addNewSensors } from './controllers/sensors.js';
import { addPowerLoss } from './services/db.js';
import {PORT} from './config/index.js';
let app = express();

//attach inbuilt bodyParse
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.post('/measurements/add', (req, res, next)=>{
	console.log(req.body.metadata); next();},addNewMeasurements);
app.post('/sensors/add', addNewSensors);

app.post('/loss', async (req, res) => {
	await addPowerLoss(req.body);
	res.status(200).send(JSON.stringify({update: 'success'}));
} )
app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});

//sensor can be VI_sensor or DC