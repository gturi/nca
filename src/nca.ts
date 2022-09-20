import yaml from 'js-yaml';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import os from "os";
import path from 'path';

try {
  const config = yaml.load(fs.readFileSync(path.join(os.homedir(), '.nca', 'config.yml'), 'utf8'));
  console.log(config);
} catch (e) {
  console.log(e);
}
