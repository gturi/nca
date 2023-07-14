import os from "os";
import path from 'path';
import { Alias } from "./alias";
import { StringUtils } from "../util/string-utils";

export interface Config {
  /** Absolute paths to external configs. */
  includePaths?: string[];
  /** List of aliases. */
  aliases?: Alias[];
}

export namespace Config {

  export function getMainConfigFilePath(): string {
    const envNcaMainConfigFilePath = process.env.ncaMainConfigFilePath;
    return StringUtils.isEmpty(envNcaMainConfigFilePath)
      ? path.join(getMainConfigFolderPath(), 'config.yml')
      : envNcaMainConfigFilePath!;
  }

  export function getLogFilePath(): string {
    return path.join(getMainConfigFolderPath(), 'out.log');
  }

  export function getMainConfigFolderPath(): string {
    return path.join(os.homedir(), '.nca');
  }
}
