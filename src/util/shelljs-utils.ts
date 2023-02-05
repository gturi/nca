import shelljs, { ShellString } from 'shelljs';

export class ShelljsUtils {

  static safeExec(command: string, errorMessage?: string): ShellString {
    const result = shelljs.exec(command);
    const exitCode = result.code;
    if (exitCode === 0) {
      return result;
    } else {
      throw new Error(errorMessage ?? `Command returned with ${exitCode} exit code`);
    }
  }
}
