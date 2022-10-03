import fs from 'fs';
import os from "os";
import path from 'path';
import yaml from 'js-yaml';
import { Alias } from '../model/alias';
import { Config } from '../model/config';
import { ConfigValidator } from '../validator/config-validator';
import { AliasValidator } from '../validator/alias-validator';


export class ConfigLoader {

  static loadAliases(): Alias[] {
    const configPath = path.join(os.homedir(), '.nca', 'config.yml');

    const aliases = ConfigLoader.loadConfigs(configPath, new Set(configPath)).flatMap(config => config.aliases ?? []);

    AliasValidator.validate(aliases);

    return aliases;
  }

  private static loadConfigs(configPath: string, loadedConfigs: Set<string>): Config[] {
    const result: Config[] = [];

    const mainConfig = ConfigLoader.loadConfig(configPath);
    if (mainConfig) {
      result.push(mainConfig);

      if (mainConfig.includePaths) {
        [...new Set(mainConfig.includePaths)]
          .filter(path => !loadedConfigs.has(path))
          .map(path => {
            loadedConfigs.add(path);
            return path;
          })
          .flatMap(path => ConfigLoader.loadConfigs(path, loadedConfigs))
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
    const config: Config = yaml.load(data) ?? {};

    ConfigValidator.validate(configPath, config);

    return config;
  }
}
