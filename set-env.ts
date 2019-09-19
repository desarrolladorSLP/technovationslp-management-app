import {existsSync, mkdirSync, writeFileSync} from "fs";


// Configure Angular `environment.ts` file path
const targetFolder = `${__dirname}\\src\\environments`;
const targetPath = `${targetFolder}\\environment.ts`;

// Load node modules
const colors = require('colors');
require('dotenv').load();

// `environment.ts` file structure
const envConfigFile: string = `export const environment = {
  backendUrl: '${process.env.BACKEND_URL}',
  client: {
    username: '${process.env.CLIENT_USERNAME}',
    password: '${process.env.CLIENT_PASSWORD}'
  },
  firebaseConfig: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
    appId: '${process.env.FIREBASE_APP_ID}'
  },
  production: ${process.env.PRODUCTION}
};`;

console.log(colors.magenta(`The file 'environment.ts' will be written to ${targetPath} with the following content: \n`));
console.log(colors.grey(envConfigFile));

const myMkdirFunction = async (dirname) => {
  if (!existsSync(dirname)) {
    await mkdirSync(dirname);
  }
};

const myWriteFunction = async (filename) => {
  await writeFileSync(filename, envConfigFile, {
    encoding: 'utf-8'
  });
};

myMkdirFunction(targetFolder).then().catch(reason => {
  console.log(reason);
});

myWriteFunction(targetPath).then().catch(reason => {
  console.log(reason);
});

console.log('done');
