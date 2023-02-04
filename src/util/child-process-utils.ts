import { spawn } from 'child_process';

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
}
