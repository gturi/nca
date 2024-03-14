import yargs from "yargs";
import { OptionParam } from "../api/option-param";
import { PositionalArgument } from "../api/positional-argument";
import { AnyObj } from "../../util/custom-types";
import { NcaCommandModule } from "./nca-command-module";

export abstract class NcaCommandTemplate {

  getNcaCommandModule<T = AnyObj>(): NcaCommandModule<T> {
    return new NcaCommandModule<T>(
      this.getCommandName(),
      this.getCommandDescription(),
      this.getOptionParams(),
      this.getPositionalArguments(),
      this.getSubCommands().map(subCommand => subCommand.getNcaCommandModule()),
      (args) => this.getHandler(args)
    );
  }

  abstract getCommandName(): string;

  abstract getCommandDescription(): string;

  getPositionalArguments(): PositionalArgument[] {
    return [];
  }

  getOptionParams(): OptionParam[] {
    return [];
  }

  getSubCommands(): NcaCommandTemplate[] {
    return [];
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable @typescript-eslint/no-empty-function */
  getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
  }
}
