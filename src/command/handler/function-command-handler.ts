import yargs from "yargs";
import { CommandType } from "../../model/command-type";
import { AnyObj } from "../../util/custom-types";
import shelljs from 'shelljs';
import { ShelljsUtils } from "../../util/shelljs-utils";
import { CommandHandler } from "./command-handler";

export class FunctionCommandHandler<T = AnyObj> implements CommandHandler {

  private args: yargs.ArgumentsCamelCase<T>;
  private code: string;

  constructor(args: yargs.ArgumentsCamelCase<T>, code: string) {
    this.args = args;
    this.code = code;
  }

  get commandType(): CommandType {
    return CommandType.Function;
  }

  run(): void {
    const fun = new Function(`
      "use strict;"
      const args = arguments[0];
      const shelljs = arguments[1];
      const safeExec = arguments[2];
      ${this.code}
    `);
    fun(this.args, shelljs, ShelljsUtils.safeExec);
  }
}
