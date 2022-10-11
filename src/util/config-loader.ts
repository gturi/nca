import fs from 'fs';
import yaml from 'js-yaml';
import { Alias } from '../model/alias';
import { Config } from '../model/config';
import { ConfigValidator } from '../validator/config-validator';
import { AliasValidator } from '../validator/alias-validator';


export class ConfigLoader {

  static loadAliases(): Alias[] {
    const configPath = Config.getMainConfigFilePath();

    const configs = this.loadConfigs(configPath, new Set(configPath));
    const aliases = configs.flatMap(config => config.aliases ?? []);

    AliasValidator.validate(aliases);

    return aliases;
  }

  private static loadConfigs(configPath: string, loadedConfigs: Set<string>): Config[] {
    const result: Config[] = [];

    const mainConfig = this.nullableLoadConfig(configPath);
    if (mainConfig) {
      ConfigValidator.validate(configPath, mainConfig);

      result.push(mainConfig);

      if (mainConfig.includePaths) {
        [...new Set(mainConfig.includePaths)]
          .filter(path => !loadedConfigs.has(path))
          .map(path => {
            loadedConfigs.add(path);
            return path;
          })
          .flatMap(path => this.loadConfigs(path, loadedConfigs))
          .forEach(path => result.push(path));
      }
    }

    return result;
  }

  private static nullableLoadConfig(configPath: string): Config | null {
    if (!fs.existsSync(configPath)) {
      console.warn(`Config file not found: ${configPath}`);
      return null;
    }
    return this.loadConfig(configPath);
  }

  public static loadConfig(configPath: string): Config {
    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }

    const data = fs.readFileSync(configPath, 'utf8');
    return yaml.load(data) ?? {};
  }
}
