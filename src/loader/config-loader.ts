import fs from 'fs';
import path from 'path';
import walkdir from 'walkdir';
import yaml from 'js-yaml';
import { NcaCommand } from '../model/api/nca-command';
import { Config } from '../model/api/config';
import { ConfigValidator } from '../validator/config-validator';
import { NcaCommandValidator } from '../validator/nca-command-validator';
import { PathUtils } from '../util/path-utils';
import { NcaConfig } from '../config/nca-config';
import { iter } from 'iterator-helper';
import { FileUtils } from '../util/file-utils';
import { ConfigIterator } from '../util/custom-types';
import { FileSystemUtils } from '../util/file-system-utils';
import { command } from 'yargs';


export class ConfigLoader {

  loadNcaCommands(): NcaCommand[] {
    const configPath = NcaConfig.getMainConfigFilePath();

    const configs = this.loadConfigsFromPath(configPath, new Set(configPath));

    const ncaCommands = configs
      ?.map(config => config.commands ?? [])
      .filter(commands => commands.length > 0)
      .flatMap(commands => iter(commands))
      .toArray() ?? [];

    NcaCommandValidator.validate(ncaCommands);

    return ncaCommands;
  }

  private loadConfigsFromPath(path: string, loadedConfigs: Set<string>): ConfigIterator | null {
    const pathStats = FileSystemUtils.tryGetStatSync(path);

    if (!pathStats) {
      return null;
    }

    return pathStats.isDirectory()
      ? this.loadDirectoryConfigs(path, loadedConfigs)
      : this.loadConfigs(path, loadedConfigs)
  }

  private loadDirectoryConfigs(directoryPath: string, loadedConfigs: Set<string>): ConfigIterator {
    const paths = walkdir.sync(directoryPath);

    iter(paths)
      .filter(path => FileSystemUtils.tryGetStatSync(path)?.isDirectory() ?? false)
      .forEach(path => loadedConfigs.add(path));

    return iter(paths)
      .filter(path => !FileSystemUtils.tryGetStatSync(path)?.isDirectory() ?? false)
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
    this.setNcaCommandDirectory(mainConfig.commands, configDirectoryPath);

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
      .map(path => this.loadConfigsFromPath(path, loadedConfigs))
      .flatMap(configIterator => iter(configIterator ?? []));

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

  private setNcaCommandDirectory(
    ncaCommands: NcaCommand[] | undefined,
    configDirectoryPath: string
  ) {
    ncaCommands?.forEach(ncaCommand => {
      ncaCommand.directory = configDirectoryPath;
      if (ncaCommand.subCommands) {
        this.setNcaCommandDirectory(ncaCommand.subCommands, configDirectoryPath);
      }
    });
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
