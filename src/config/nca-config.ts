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
}
