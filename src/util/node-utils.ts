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
    shelljs.exec(`npm link "${path}"`);
  }
}
