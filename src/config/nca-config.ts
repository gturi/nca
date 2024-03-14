import os from "os";
import path from 'path';
import { StringUtils } from "../util/string-utils";

export class NcaConfig {

  static getMainConfigFilePath(): string {
    const envNcaMainConfigFilePath = process.env.ncaMainConfigFilePath;
    return StringUtils.ifNotEmptyOrDefault(
      envNcaMainConfigFilePath, () => path.join(this.getMainConfigFolderPath(), 'config.yml')
    );
  }

  static getLogFilePath(): string {
    return path.join(this.getMainConfigFolderPath(), 'out.log');
  }

  static getMainConfigFolderPath(): string {
    return path.join(os.homedir(), '.nca');
  }

  static isDebugEnabled(): boolean {
    return process.env.ncaDebug === 'true'
  }

  static getForbiddenNames(): string[] {
    return ['nca', ''];
  }

  static getAliasSourceFolderPath(): string {
    return path.join(this.getAliasFolderPath(), 'bin');
  }

  static getAliasPackageJsonPath(): string {
    return path.join(this.getAliasFolderPath(), 'package.json');
  }

  static getAliasFolderPath(): string {
    return path.join(this.getMainConfigFolderPath(), 'alias');
  }

  static getAliasPackageJson(): Record<string, unknown> {
    return {
      "name": "node-command-alias-local",
      "bin": {
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/gturi/nca.git"
      },
      "bugs": {
        "url": "https://github.com/gturi/nca/issues"
      },
      "homepage": "https://github.com/gturi/nca#readme"
    };
  }
}
