const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0NMQVpCcXZmQWhYaGFlUVJmZ2RHN0pxdWk5azRmZjZGbWZaVlMrN3RIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWM2MFE0QVVnUlE2UmpRNzBYdXVyWXNidUlJUDBDdkVmaDFXVmVGbG5IMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDSko0ZnFjM1dteXc0My8wNmxWT2hIc00rV0Y0cHU0WUFxaTRBNjRteFd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTi93ZDBzaklxV0p6U2Z5TjIzemNYYS91RDVCVnovV3BLdjNRMkY4bTIwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRQZ2p6ZWpZY2Z3V0lRdkwzanBQaWJqY3ZURFRqQndkd3hjVi9uS0s4VVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZPMU53QmtUSUY2dTBHRDl4NlVVQWdVdTRmRW1iZUN5dFhpaHkwQmcyblE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0wvaTcybDVJYTVMN0FKYUk0aDMrNnJ6dnlhd01vVVBqMW5pOXFrSlkzMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzJvcmdnY1NNWDd6V1gxMnllQWxyQWtnNE9TcXVZenR5NmlHTnZuNmJYaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcxMGY1WFB3dVR5UWJ1V1cwVUFGcHdGMC96aUF1c0pCaGQxVUFkd3VLcUN4ZmF2RXZGVWdjeFNFQ2tuUy90eHgrekkvZDJOU21Wem9wVTdzdTNUVUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM0LCJhZHZTZWNyZXRLZXkiOiJHZ1N5YVpsT1UvNUUwVXV2cU9Fb0ZZRlp4WlZnREhoT1BCM05uellISlJnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJfT1Z4YTlndFFpU2k2LXhMU0E0RWl3IiwicGhvbmVJZCI6IjMwZTlmZGY5LTE2OWEtNDBmNi05NzIzLTRkMGUwMWExYjJhZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvb1c2MjJ1T3RYa2g1SWdWMnUzLy9reWlPcFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSDYzSjlwOHN0M0thaGJJTXMzWEMwaVVOalh3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlCNjRWNlBGIiwibWUiOnsiaWQiOiIyNTg4NjMyNzYwMzM6MjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiUVVFRU4gRUxJU0EgTUQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tId2cvY0dFT1RvdTdFR0dCa2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkNBZ3pSYmVEQ1J1K1VzSVZuSlczYm1iYkNaWVVWeS9HUExiclR2QUV6bFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJ5M05rc0V1N3czQ21vc1F4em5GMzlXY2k2bW1NNGVka0R1MmE4UDF4WlF5ODR4eTh5N2dUSjE3aklPU3JIWjZsSmh0SEZoTmg3Ujk5aVpJeTI3TEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYdG5rWUh1QTBFZ0cxeEZRdkF4N0lGSFZqVlE2Q2dBeDNSdDVQZU9FS3dRQVljL2NVWUYvcjk2L3BUNm1UeEEydExrekdUMFl6eEhnMzllMHM1OHVDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1ODg2MzI3NjAzMzoyM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRZ0lNMFczZ3drYnZsTENGWnlWdDI1bTJ3bVdGRmN2eGp5MjYwN3dCTTVVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE0MzUzMjY2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "©ghostmodz",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "258875835086",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
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
