import { spawn, spawnSync, SpawnSyncReturns } from 'child_process';

export class ChildProcessUtils {

  static spawn(command: string, params: string[] = []): Promise<number | null> {
    return new Promise<number | null>((resolve, reject) => {
      // inherit flag makes the spawned process to use console colors
      spawn(command, params, { stdio: "inherit" }).on('exit', code => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(code);
        }
      });
    });
  }

  static spawnSync(command: string, params: string[] = []): SpawnSyncReturns<Buffer> {
    // inherit flag makes the spawned process to use console colors
    return spawnSync(command, params, { stdio: "inherit" });
  }
}
