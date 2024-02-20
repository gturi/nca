import shelljs from "shelljs";
import { NcaConfig } from "../config/nca-config";

export class NodeUtils {

  static refreshLocalAliases(): void {
    this.unlinkLocalAliases();

    this.linkLocalAliases();
  }

  static unlinkLocalAliases(): void {
    shelljs.exec(`npm unlink --global node-command-alias-local`);
  }

  static linkLocalAliases(): void {
    shelljs.exec(`npm link "${NcaConfig.getAliasFolderPath()}"`);
  }
}
