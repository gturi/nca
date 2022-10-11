import fs from 'fs';
import yaml from 'js-yaml';
import { Config } from '../model/config';

export class ConfigSaver {

  static save(configPath: string, config: Config) {
    fs.writeFileSync(configPath, yaml.dump(config), { encoding: 'utf8' });
  }
}
