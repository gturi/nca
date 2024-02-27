import shelljs from "shelljs";
import { NcaConfig } from "../config/nca-config";

export class NodeUtils {

  static refreshLocalAliases(): void {
    this.unlinkLocalAliases();

    this.linkLocalAliases();
  }

  static unlinkLocalAliases(): void {
    this.unlink('node-command-alias-local');
  }

  static unlink(packageName: string): void {
    shelljs.exec(`npm unlink --global ${packageName}`);
  }

  static linkLocalAliases(): void {
    this.link(NcaConfig.getAliasFolderPath());
  }

  static link(path: string): void {
    // TODO: understand why this error is logged but the command is successfully executed
    // npm ERR! Cannot set properties of null (setting 'dev')
    shelljs.exec(`npm link "${path}"`);
  }
}
