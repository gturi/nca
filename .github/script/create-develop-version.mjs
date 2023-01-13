import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const packageJson = require('../../package.json');

const currentVersion = packageJson.version;

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

const currentDateFormat = `${year}.${month}.${day}-${hours}.${minutes}.${seconds}`;

console.log(`${currentVersion}-${currentDateFormat}`);
