import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;
export const DBUSERNAME = process.env.DBUSERNAME;
export const DBDATABASE = process.env.DBDATABASE;
export const DBHOST = process.env.DBHOST;
export const DBPASSWORD = process.env.DBPASSWORD;
export const DBPORT = process.env.DBPORT;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUD_KEY = process.env.CLOUD_KEY;
export const CLOUD_SECRET = process.env.CLOUD_SECRET;
