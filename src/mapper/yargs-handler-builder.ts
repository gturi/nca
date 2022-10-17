import yargs from "yargs";
import { Alias } from "../model/alias";
import { CommandType } from "../model/command-type";
import shelljs, { ShellString } from 'shelljs';
import { StringUtils } from "../util/string-utils";
import { AnyObj } from "../util/custom-types";

export class YargsHandlerBuilder {

  static getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>, alias: Alias) {
    if (!StringUtils.isEmpty(alias.command)) {
      if (CommandType.Function === alias.commandType) {
        this.functionRunner(args, alias.command ?? '');
      } else {
        shelljs.exec(alias.command ?? '');
      }
    }
  }

  private static functionRunner<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>, code: string) {
    const fun = new Function(`
      "use strict;"
      const args = arguments[0];
      const shelljs = arguments[1];
      const safeExec = arguments[2];
      ${code}
    `);
    fun(args, shelljs, this.safeExec);
  }

  private static safeExec(command: string, errorMessage?: string): ShellString {
    const result = shelljs.exec(command);
    if (result.code !== 0) {
      throw new Error(errorMessage ?? 'Command returned non 0 error code');
    }
    return result;
  }
}
