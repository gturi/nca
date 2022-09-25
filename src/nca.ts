import yaml from 'js-yaml';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import os from "os";
import path from 'path';
import { Config } from './model/config';
import { ModelMapper } from './util/model-mapper';

try {
  const data = fs.readFileSync(path.join(os.homedir(), '.nca', 'config.yml'), 'utf8');
  const config = yaml.load(data) as Config;

  const argvBuilder = yargs(hideBin(process.argv));

  config.aliases.sort((a, b) => a.name.localeCompare(b.name))
    .map(alias => ModelMapper.map(alias))
    .forEach(commandModule => argvBuilder.command(commandModule));

  argvBuilder
    .completion('completion')
    .parse();

} catch (e) {
  console.log(e);
}
