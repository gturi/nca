import fs from 'fs';
import path from 'path';
import { iter } from "iterator-helper";
import { FileSystemUtils } from "../util/file-system-utils";
import { NcaConfig } from '../config/nca-config';

export class PackageJsonLoader {

  private readonly packageJsonPath: string;
  private readonly _packageJson: Record<string, unknown>;

  constructor(packageJsonPath: string) {
    this.packageJsonPath = packageJsonPath;
    if (fs.existsSync(packageJsonPath)) {
      this._packageJson = FileSystemUtils.readJsonFile(packageJsonPath);
    } else {
      this._packageJson = NcaConfig.getAliasPackageJson();
    }
  }

  get bin(): Record<string, string | null> {
    return this._packageJson.bin as Record<string, string | null>;
  }

  getBrokenAliases(): string[] {
    const bin = this.bin;
    return iter(Object.keys(bin))
      .filter(aliasName => {
        const aliasCodeRelativePath = this.getAliasCodePath(aliasName);
        return aliasCodeRelativePath !== null && !fs.existsSync(aliasCodeRelativePath);
      })
      .toArray();
  }

  getAliasCodePath(aliasName: string): string | null {
    const aliasCodeRelativePath = this.bin[aliasName];
    return aliasCodeRelativePath
      ? path.join(NcaConfig.getAliasFolderPath(), aliasCodeRelativePath)
      : null;
  }

  get aliasCount(): number {
    return Object.entries(this.bin).length
  }

  addAlias(aliasName: string): void {
    this.bin[aliasName] = `./bin/${aliasName}`;
  }

  deleteAlias(aliasName: string): void {
    delete this.bin[aliasName];

    const aliasCodePath = path.join(NcaConfig.getAliasSourceFolderPath(), aliasName);
    FileSystemUtils.deleteFile(aliasCodePath);
  }

  renameAlias(aliasName: string, aliasNewName: string): void {
    const aliasCodePath = this.getAliasCodePath(aliasName);
    if (aliasCodePath == null) {
      throw new Error(`Alias '${aliasName}' not found`);
    }
    delete this.bin[aliasName];

    this.addAlias(aliasNewName);
    const aliasCodeNewPath = this.getAliasCodePath(aliasNewName);
    if (aliasCodeNewPath == null) {
      throw new Error(`Alias '${aliasNewName}' not found`);
    }

    FileSystemUtils.renameFile(aliasCodePath, aliasCodeNewPath);
  }

  getAliasCommand(aliasName: string): string | null {
    return this.bin[aliasName];
  }

  writeOnDisk(): void {
    FileSystemUtils.writePrettyJsonFile(this.packageJsonPath, this._packageJson);
  }
}
