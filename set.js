const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZmQlkzczFiTTZEZWFCaGNwVnNHWDkzWU14YXJzamtGK2xNalVUSHUxUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2JvN3hldmQ0Y0NVQjVhVTVoazQ1UDFHeXFWOUt3VTV6ZDY4TUJkSloxVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1RjM3MnlEQkZIYjAvRXFOVitrbjltSm9SQ2dNSzBHNC9pbFI5enVhSW1NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJveFdOV3pYbkNCbk84Ym1DTEJGN3BjZ0tJU3FsaUNXRWpJUXViS3VoRkNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMMUlBWldiZ0tkY0grK1hSM3lWZU9ZMGhBL3FhK0ludTVRdE9SV2xDbXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im8yak9oSU0rNFZ0cUxMY3VjeFRodmRRYVFlQWM4Qm5jeE1BS2p0RXR6Ulk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEE5MFBqS3cxZnR2L0FuOEdKRTZwWWd4MklxZ0tLZEhjeFhMWEppbEdudz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic3YrbDhVelRTZEcrSUZ6S01QVTIxVGJqTlhjcithOGhMOXFZK2xtQm14MD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRPM3hWQWJvaDNMUnZ1OTFjTHd1UHJqNlBBWFV3Uld1TXFiT2dnS2ZOL25aY0RGUzFxVWVGMSszamZibzBSOXBSS1JJd252NmE0NUpuRFExMCtPa0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYwLCJhZHZTZWNyZXRLZXkiOiI0R3cyYzNITnhicUU4Q1VMKzRzQVRMZlFrZGZ3eUFMK2xBLytGQWM4WlVVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYTFN6YU9ETVF6Q2VHYnJzSDR1VzBRIiwicGhvbmVJZCI6IjUzZTBkZWFjLThlNDgtNDY5Yi1iNmQ5LTQ4ZjUxZGFjYzI0MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3cW5jMWhIQVpDWHdaajV4bk9TYndzZ0NGdXM9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9Ma2tIUjBGc2RHRDZnK0JPSmFMZDRZeVRMVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01UWWpyRUpFUHJEcGJRR0dBd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InRWbHVWOXNqQmFhMllTWEoyZnpieFNKUGJVSm1GeS9WMWZQWHgrWXh3RW89IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9zVlV1ZXE0VGdzNXl6OUZuKzJ0OFNDSkhKazlCSUN4eXRSMUc3allvY1d1dk1jYXRodzdkRi9JenRMSVdRTm1DY0Y2U3BtdmVaZDkyWCtqTU9TL0RRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJIMVZwdjAyYjdCREIrT01rdTdBMXJSVkYya28zSElSbncxcDN4OFZvdDU1YU96bEMyb1hReTUwMCt2eUgzQ2pNUGlNTmVOTFM3dUVXRVdadVMrOUdBdz09In0sIm1lIjp7ImlkIjoiMjM3NjkyNDQ2ODUwOjg0QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTIyNDkzOTc3NTYxNDY6ODRAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY5MjQ0Njg1MDo4NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiVlpibGZiSXdXbXRtRWx5ZG44MjhVaVQyMUNaaGN2MWRYejE4Zm1NY0JLIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDI3OTU0OSwibGFzdFByb3BIYXNoIjoiMXloSVJBIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHRDUifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE || '.',
    NOM_OWNER: process.env.NOM_OWNER || "Monsieur Richy",
    NUMERO_OWNER : process.env.NUMERO_OWNER ||"237692446820",              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PRIVEE,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Monsieur Richy',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
