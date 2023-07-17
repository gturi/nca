import shelljs, { ShellString } from 'shelljs';
import { ChildProcessUtils } from "../../util/child-process-utils";
import { ShelljsUtils } from "../../util/shelljs-utils";
import { SpawnSyncReturns } from 'child_process';

/**
 * CLI utilities, useful to run commands.
 */
export class CliUtils {

  /**
   * Shelljs instance, useful to run scripts.
   */
  get shelljs(): typeof shelljs {
    return shelljs;
  }

  /**
   * Function that executes a command using shelljs.
   * If the exit code is not 0 it throws an exception.
   */
  get shelljsSafeExec(): (command: string, errorMessage?: string) => ShellString {
    return ShelljsUtils.safeExec;
  }

  /**
   * Function that executes a command using javascript spawn.
   * The result is a resolved promise when the exit code is 0,
   * otherwise it is a rejected promise.
   */
  get spawn(): (command: string, params?: string[]) => Promise<number | null> {
    return ChildProcessUtils.spawn;
  }

  /**
   * Function that executes a command using javascript spawnSync.
   * The result is a resolved promise when the exit code is 0,
   * otherwise it is a rejected promise.
   */
  get spawnSync(): (command: string, params?: string[]) => SpawnSyncReturns<Buffer> {
    return ChildProcessUtils.spawnSync;
  }
}
