import fs from 'fs';
import path from 'path';
import walkdir from 'walkdir';
import yaml from 'js-yaml';
import { Alias } from '../model/api/alias';
import { Config } from '../model/api/config';
import { ConfigValidator } from '../validator/config-validator';
import { AliasValidator } from '../validator/alias-validator';
import { PathUtils } from '../util/path-utils';
import { NcaConfig } from '../config/nca-config';
import { HIterator, iter } from 'iterator-helper';
import { FileUtils } from '../util/file-utils';

type LazyIterator<T> = HIterator<T, any, any>;
type ConfigIterator = LazyIterator<Config>;

export class ConfigLoader {

  loadAliases(): Alias[] {
    const configPath = NcaConfig.getMainConfigFilePath();

    const configs = this.loadConfigsFromPath(configPath, new Set(configPath));
    const aliases = configs.flatMap(config => iter(config.aliases ?? [])).toArray();

    AliasValidator.validate(aliases);

    return aliases;
  }

  private loadConfigsFromPath(path: string, loadedConfigs: Set<string>): ConfigIterator {
    return fs.statSync(path).isDirectory()
      ? this.loadDirectoryConfigs(path, loadedConfigs)
      : this.loadConfigs(path, loadedConfigs)
  }

  private loadDirectoryConfigs(directoryPath: string, loadedConfigs: Set<string>): ConfigIterator {
    const paths = walkdir.sync(directoryPath);

    iter(paths)
      .filter(path => fs.statSync(path).isDirectory())
      .forEach(path => loadedConfigs.add(path))

    return iter(paths)
      .filter(path => !fs.statSync(path).isDirectory())
      .filter(path => FileUtils.hasYamlExtension(path))
      .filter(path => !loadedConfigs.has(path))
      .flatMap(path => iter(this.loadConfigs(path, loadedConfigs)));
  }

  private loadConfigs(configPath: string, loadedConfigs: Set<string>): ConfigIterator {
    const mainConfig = this.nullableLoadConfig(configPath);
    if (!mainConfig) {
      return iter([]);
    }

    ConfigValidator.validate(configPath, mainConfig);

    const configDirectoryPath = path.dirname(configPath);
    mainConfig.aliases?.forEach(alias => alias.aliasDirectory = configDirectoryPath);

    if (!mainConfig.includePaths) {
      return iter([mainConfig]);
    }

    const includedPaths = iter(new Set(mainConfig.includePaths))
      .map(path => PathUtils.resolvePath(path, configDirectoryPath))
      .filter(path => !loadedConfigs.has(path))
      .filter(path => fs.existsSync(path))
      .map(path => {
        loadedConfigs.add(path)
        return path;
      })
      .flatMap(path => iter(this.loadConfigsFromPath(path, loadedConfigs)));

    return iter([mainConfig]).chain(includedPaths);
  }

  private nullableLoadConfig(configPath: string): Config | null {
    if (fs.existsSync(configPath)) {
      return this.loadConfig(configPath);
    } else {
      console.warn(`Config file not found: ${configPath}`);
      return null;
    }
  }

  loadConfig(configPath: string): Config {
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
