import shelljs, { ShellString } from 'shelljs';

export class ShelljsUtils {

  static safeExec(command: string, errorMessage?: string): ShellString {
    const result = shelljs.exec(command);
    if (result.code !== 0) {
      throw new Error(errorMessage ?? 'Command returned non 0 error code');
    }
    return result;
  }
}
