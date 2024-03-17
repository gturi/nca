import shelljs, { ShellString } from 'shelljs';
import { SpawnSyncReturns } from 'child_process';

/**
 * CLI utilities, useful to run commands.
 */
export interface CliUtils {
  /**
   * Shelljs instance, useful to run scripts.
   * For more information refer to shelljs npm package.
   */
  shelljs: typeof shelljs;
  /**
   * Function that executes a command using shelljs.
   * If the exit code is not 0 it throws an exception.
   */
  shelljsSafeExec: (command: string, errorMessage?: string) => ShellString;
  /**
   * Function that executes a command using javascript spawn.
   * The result is a resolved promise when the exit code is 0,
   * otherwise it is a rejected promise.
   */
  spawn: (command: string, params?: string[]) => Promise<number | null>;
  /**
   * Function that executes a command using javascript spawnSync.
   * The result is a resolved promise when the exit code is 0,
   * otherwise it is a rejected promise.
   */
  spawnSync: (command: string, params?: string[]) => SpawnSyncReturns<Buffer>;
}
