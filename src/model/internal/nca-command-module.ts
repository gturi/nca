import yargs from "yargs";
import { OptionParam } from "../api/option-param";
import { PositionalArgument } from "../api/positional-argument";
import { AnyObj } from "../../util/custom-types";

export class NcaCommandModule<T = AnyObj> {

  private readonly _commandName: string;
  private readonly _commandDescription: string;
  private readonly _optionParams: OptionParam[];
  private readonly _positionalArguments: PositionalArgument[];
  private readonly _subCommands: NcaCommandModule[];
  private readonly _handler: (args: yargs.ArgumentsCamelCase<T>) => void;

  constructor(
    commandName: string,
    commandDescription: string,
    optionParams: OptionParam[] = [],
    positionalArguments: PositionalArgument[] = [],
    subCommands: NcaCommandModule[] = [],
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/no-empty-function */
    handler: (args: yargs.ArgumentsCamelCase<T>) => void = (_) => { }
  ) {
    this._commandName = commandName;
    this._commandDescription = commandDescription;
    this._optionParams = optionParams;
    this._positionalArguments = positionalArguments;
    this._subCommands = subCommands;
    this._handler = handler;
  }

  get commandName(): string {
    return this._commandName;
  }

  get commandDescription(): string {
    return this._commandDescription;
  }

  get optionParams(): OptionParam[] {
    return this._optionParams;
  }

  get positionalArguments(): PositionalArgument[] {
    return this._positionalArguments;
  }

  get subCommands(): NcaCommandModule[] {
    return this._subCommands;
  }

  get handler(): (args: yargs.ArgumentsCamelCase<T>) => void {
    return this._handler;
  }
}
