import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;
export const DBUSERNAME = process.env.DBUSERNAME;
export const DBDATABASE = process.env.DBDATABASE;
export const DBHOST = process.env.DBHOST;
export const DBPASSWORD = process.env.DBPASSWORD;
export const DBPORT = process.env.DBPORT;
