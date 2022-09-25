import yaml from 'js-yaml';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import os from "os";
import path from 'path';
import { Config } from './model/config';
import { ModelMapper } from './util/model-mapper';
import { ConfigValidator } from './util/config-validator';

try {
  const data = fs.readFileSync(path.join(os.homedir(), '.nca', 'config.yml'), 'utf8');
  const config = yaml.load(data) as Config;

  const argvBuilder = yargs(hideBin(process.argv));

  ConfigValidator.validate(config);

  config.aliases.sort((a, b) => a.name.localeCompare(b.name))
    .map(alias => ModelMapper.map(alias))
    .forEach(commandModule => argvBuilder.command(commandModule));

  argvBuilder
    .completion()
    .alias('help', 'h')
    .alias('version', 'v')
    .strict()
    .wrap(argvBuilder.terminalWidth())
    .demandCommand(1, '')
    .parse();

} catch (e) {
  console.log(e);
}
