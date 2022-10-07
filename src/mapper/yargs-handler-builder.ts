import yargs from "yargs";
import { Alias } from "../model/alias";
import { CommandType } from "../model/command-type";
import shelljs from 'shelljs';
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
      ${code}
    `);
    fun(args, shelljs);
  }
}
