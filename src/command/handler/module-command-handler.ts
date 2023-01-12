import yargs from "yargs";
import { CommandType } from "../../model/command-type";
import { AnyObj } from "../../util/custom-types";
import shelljs from 'shelljs';
import { ShelljsUtils } from "../../util/shelljs-utils";
import { CommandHandler } from "./command-handler";

export class ModuleCommandHandler<T = AnyObj> implements CommandHandler {

  private args: yargs.ArgumentsCamelCase<T>;
  private path: string;

  constructor(args: yargs.ArgumentsCamelCase<T>, path: string) {
    this.args = args;
    this.path = path;
  }

  get commandType(): CommandType {
    return CommandType.Module;
  }

  run(): void {
    const defaultExport = require(this.path);
    defaultExport(this.args, shelljs, ShelljsUtils.safeExec);
  }
}
