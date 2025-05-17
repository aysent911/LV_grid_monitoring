import axios from 'axios';
import { ANALYTICS_SERVER_URL } from '../config/index.js';

const exportToAnalytics = function(data){
    axios.post(ANALYTICS_SERVER_URL, data, {
        headers: {
            'Content-Type':'application/json',
        }
    })
    .then((response) => {
            console.log(`${response.data}`);
        })
    .catch((err) => {
        console.error(`EXPORT ERROR: ${err}`);
    });
}

export {exportToAnalytics};