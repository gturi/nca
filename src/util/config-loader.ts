import fs from 'fs';
import os from "os";
import path from 'path';
import yaml from 'js-yaml';
import { Alias } from '../model/alias';
import { Config } from '../model/config';
import { ConfigValidator } from './config-validator';


export class ConfigLoader {

  static loadAliases(): Alias[] {
    const configPath = path.join(os.homedir(), '.nca', 'config.yml');

    return ConfigLoader.loadConfigs(configPath).flatMap(config => config.aliases);
  }

  private static loadConfigs(configPath: string): Config[] {
    const result: Config[] = [];

    const mainConfig = ConfigLoader.loadConfig(configPath);
    if (mainConfig) {
      result.push(mainConfig);

      if (mainConfig.includePaths) {
        mainConfig.includePaths
          .flatMap(path => ConfigLoader.loadConfigs(path))
          .forEach(path => result.push(path));
      }
    }

    return result;
  }

  private static loadConfig(configPath: string): Config | null {
    if (!fs.existsSync(configPath)) {
      return null;
    }

    const data = fs.readFileSync(configPath, 'utf8');
    const config = yaml.load(data) as Config;

    ConfigValidator.validate(config);

    return config;
  }
}
