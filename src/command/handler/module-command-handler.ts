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
    // modules need to assign a function to module.exports
    // i.e. module.exports = function (args, shelljs, safeExec) { /* code */ };
    import(this.path).then(module => module.default(this.args, shelljs, ShelljsUtils.safeExec));
  }
}
