import { NcaConfig } from "../config/nca-config";
import { ChildProcessUtils } from "./child-process-utils";

export class NodeUtils {

  static refreshLocalAliases(): void {
    ChildProcessUtils.spawnSync('npm', ['unlink', '--global', 'node-command-alias-local']);

    ChildProcessUtils.spawnSync('npm', ['link', `"${NcaConfig.getAliasFolderPath()}"`]);
  }
}
