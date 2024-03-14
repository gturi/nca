import yargs from "yargs";
import { CommandType } from "../../model/api/command-type";
import { AnyObj } from "../../util/custom-types";
import { CommandHandler } from "./command-handler";
import shelljs from 'shelljs';
import { iter } from "iterator-helper";
import { ProcessArgumentUtils } from "../../util/process-arguments-utils";

export class SimpleCommandHandler<T = AnyObj> implements CommandHandler {

  private args: yargs.ArgumentsCamelCase<T>;
  private command: string;

  constructor(args: yargs.ArgumentsCamelCase<T>, command: string) {
    console.log(Object.keys(args))
    this.args = args;
    this.command = command;
  }

  get commandType(): CommandType {
    return CommandType.Simple;
  }

  run(): void {
    const parameters = this.getParameters()

    if (parameters.length > 0) {
      shelljs.exec(`${this.command} ${parameters}`);
    } else {
      shelljs.exec(this.command);
    }
  }

  private getParameters(): string {
    return iter(Object.keys(this.args))
      .filter(param => param !== '_' && param !== '$0')
      .map(param => {
        const sanitizedParamValue = ProcessArgumentUtils.wrapInQuotesIfItHasWhitespace(
          `${this.args[param]}`
        );
        return `${this.getParamForCli(param)} ${sanitizedParamValue}`;
      }).join(' ');
  }

  private getParamForCli(param: string): string {
    return param.length === 1 ? `-${param}` : `--${param}`;
  }

}
