import * as dotenv from 'dotenv';
dotenv.config();

const {PORT, DATABASE_URL, ANALYTICS_SERVER_URL} = process.env;
export {PORT, DATABASE_URL, ANALYTICS_SERVER_URL};