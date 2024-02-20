import fs from 'fs';
import path from 'path';
import { iter } from "iterator-helper";
import { FileSystemUtils } from "../util/file-system-utils";
import { NcaConfig } from '../config/nca-config';

export class PackageJsonLoader {

  private readonly _packageJson: Record<string, unknown>;

  constructor(packageJsonPath: string) {
    this._packageJson = FileSystemUtils.readJsonFile(packageJsonPath);
  }

  get bin(): Record<string, string | null> {
    return this._packageJson.bin as Record<string, string | null>;
  }

  getBrokenAliases(): string[] {
    const bin = this.bin;
    return iter(Object.keys(bin))
      .filter(aliasName => {
        const aliasCodeRelativePath = bin[aliasName];
        return aliasCodeRelativePath !== null && !fs.existsSync(this.getAliasCodePath(aliasName));
      })
      .toArray();
  }

  getAliasCodePath(aliasName: string): string {
    const aliasCodeRelativePath = this.bin[aliasName];
    return aliasCodeRelativePath
      ? path.join(NcaConfig.getAliasFolderPath(), aliasCodeRelativePath)
      : 'unknown';
  }
}
