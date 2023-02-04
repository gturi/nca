import yargs from "yargs";
import { Alias } from "../model/alias";
import { CommandType } from "../model/command-type";
import { StringUtils } from "../util/string-utils";
import { AnyObj } from "../util/custom-types";
import { SimpleCommandHandler } from "../command/handler/simple-command-handler";
import { FunctionCommandHandler } from "../command/handler/function-command-handler";
import { ModuleCommandHandler } from "../command/handler/module-command-handler";
import { PathUtils } from "../util/path-utils";
import { CommandHandler } from "../command/handler/command-handler";
import { CommandHandlerInput } from "../model/command-handler-input";

export class YargsHandlerBuilder {

  static getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>, alias: Alias) {
    if (!StringUtils.isEmpty(alias.command)) {
      const commandHandler = this.getCommandHandler(args, alias);

      if (commandHandler) {
        commandHandler.run()
      } else {
        console.error(`Command type not supported ${alias.commandType}`);
      }
    }
  }

  private static getCommandHandler<T = AnyObj>(
    args: yargs.ArgumentsCamelCase<T>,
    alias: Alias
  ): CommandHandler | null {
    const commandType = alias.commandType ?? CommandType.Simple
    const command = alias.command ?? '';

    switch (commandType) {
      case CommandType.Simple:
        return new SimpleCommandHandler(command);
      case CommandType.Function: {
        const input = new CommandHandlerInput<T>(args);
        return new FunctionCommandHandler<T>(input, command);
      }
      case CommandType.Module: {
        const input = new CommandHandlerInput<T>(args);
        const jsModulePath = PathUtils.resolvePath(command, alias.aliasDirectory);
        return new ModuleCommandHandler<T>(input, jsModulePath);
      }
      default:
        return null;
    }
  }
}
