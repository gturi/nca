import yargs from "yargs";
import { CommandType } from "../../model/api/command-type";
import { AnyObj } from "../../util/custom-types";
import { CommandHandler } from "./command-handler";
import shelljs from 'shelljs';
import { iter } from "iterator-helper";
import { ProcessArgumentUtils } from "../../util/process-arguments-utils";

export class NativeCommandHandler<T = AnyObj> implements CommandHandler {

  private args: yargs.ArgumentsCamelCase<T>;
  private command: string;
  private positionalArgumentsAsOptions: boolean;

  constructor(
    args: yargs.ArgumentsCamelCase<T>,
    command: string,
    positionalArgumentsAsOptions: boolean
  ) {
    this.args = args;
    this.command = command;
    this.positionalArgumentsAsOptions = positionalArgumentsAsOptions;
  }

  get commandType(): CommandType {
    return CommandType.Native;
  }

  run(): void {
    const parameters = this.getParameters();

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
        const paramValue = `${this.args[param]}`;
        const sanitizedParamValue = ProcessArgumentUtils.wrapInQuotesIfItHasWhitespace(
          paramValue
        );

        if (this.isOptionParam(param) || this.positionalArgumentsAsOptions) {
          return `${this.getParamForCli(param)} ${sanitizedParamValue}`;
        } else {
          return sanitizedParamValue;
        }
      }).join(' ');
  }

  private getParamForCli(param: string): string {
    return this.isOptionParam(param) ? `-${param}` : `--${param}`;
  }

  private isOptionParam(param: string): boolean {
    return param.length === 1;
  }

}
