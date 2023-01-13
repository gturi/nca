import fs from 'fs';
import walkdir from 'walkdir';
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
        const pathsToLoad = [...new Set(mainConfig.includePaths)]
          .filter(path => !loadedConfigs.has(path))
          .filter(path => fs.existsSync(path))
          .map(path => {
            loadedConfigs.add(path);
            return path;
          });

        pathsToLoad.filter(path => !fs.statSync(path).isDirectory())
          .flatMap(path => this.loadConfigs(path, loadedConfigs))
          .forEach(path => result.push(path));

        pathsToLoad.filter(path => fs.statSync(path).isDirectory())
          .flatMap(path => this.loadDirectoryConfigs(path, loadedConfigs))
          .forEach(path => result.push(path));
      }
    }

    return result;
  }

  private static loadDirectoryConfigs(directoryPath: string, loadedConfigs: Set<string>): Config[] {
    const paths = walkdir.sync(directoryPath);

    paths.filter(path => fs.statSync(path).isDirectory())
      .forEach(path => loadedConfigs.add(path))

    return paths.filter(path => !fs.statSync(path).isDirectory())
      .filter(path => this.isYamlFile(path))
      .filter(path => !loadedConfigs.has(path))
      .flatMap(path => this.loadConfigs(path, loadedConfigs))
  }

  private static isYamlFile(file: string): boolean {
    const extension = file.split('.').pop();
    return extension === 'yml' || extension === 'yaml';
  }

  private static nullableLoadConfig(configPath: string): Config | null {
    if (fs.existsSync(configPath)) {
      return this.loadConfig(configPath);
    } else {
      console.warn(`Config file not found: ${configPath}`);
      return null;
    }
  }

  public static loadConfig(configPath: string): Config {
    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }

    const data = fs.readFileSync(configPath, 'utf8');
    try {
      return yaml.load(data) ?? {};
    } catch (e) {
      console.error(`Error encountered while reading ${configPath}`);
      throw e;
    }
  }
}
