import os from "os";
import path from 'path';
import { Alias } from "./alias";

export interface Config {
  /** Absolute paths to external configs. */
  includePaths?: string[];
  /** List of aliases. */
  aliases?: Alias[];
}

export namespace Config {

  export function getMainConfigFilePath(): string {
    return path.join(getMainConfigFolderPath(), 'config.yml');
  }

  export function getMainConfigFolderPath(): string {
    return path.join(os.homedir(), '.nca');
  }
}
