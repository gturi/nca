import yargs from "yargs";
import { Alias } from "../model/alias";
import { CommandType } from "../model/command-type";
import shelljs from 'shelljs';

export class YargsHandlerBuilder {

  static getHandler<T = {}>(args: yargs.ArgumentsCamelCase<T>, alias: Alias) {
    if (alias.command !== undefined && alias.command !== null && alias.command !== '') {
      if (CommandType.Function === alias.commandType) {
        YargsHandlerBuilder.functionRunner(args, alias.command);
      } else {
        shelljs.exec(alias.command);
      }
    }
  }

  private static functionRunner<T = {}>(args: yargs.ArgumentsCamelCase<T>, code: string) {
    const fun = new Function(`
      "use strict;"
      const args = arguments[0];
      const shelljs = arguments[1];
      ${code}
    `);
    fun(args, shelljs);
  }
}
