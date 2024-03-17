import yargs from "yargs";
import { NcaCommand } from "../model/api/nca-command";
import { CommandType } from "../model/api/command-type";
import { StringUtils } from "../util/string-utils";
import { AnyObj } from "../util/custom-types";
import { NativeCommandHandler } from "../command/handler/native-command-handler";
import { FunctionCommandHandler } from "../command/handler/function-command-handler";
import { ModuleCommandHandler } from "../command/handler/module-command-handler";
import { PathUtils } from "../util/path-utils";
import { CommandHandler } from "../command/handler/command-handler";
import { CommandHandlerInput } from "../model/input/command-handler-input";

export class YargsHandlerBuilder {

  static getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>, ncaCommand: NcaCommand) {
    if (StringUtils.isEmpty(ncaCommand.command)) {
      return;
    }

    const commandHandler = this.getCommandHandler(args, ncaCommand);
    if (commandHandler) {
      commandHandler.run()
    } else {
      console.error(`Command type not supported ${ncaCommand.commandType}`);
    }
  }

  private static getCommandHandler<T = AnyObj>(
    args: yargs.ArgumentsCamelCase<T>,
    ncaCommand: NcaCommand
  ): CommandHandler | null {
    if (ncaCommand.runInConfigDirectory) {
      process.chdir(ncaCommand.directory);
    }

    const commandType = ncaCommand.commandType ?? CommandType.Native
    const command = ncaCommand.command ?? '';

    switch (commandType) {
      case CommandType.Native:
        return new NativeCommandHandler(args, command, ncaCommand.positionalArgumentsAsOptions);
      case CommandType.Function: {
        const input = new CommandHandlerInput<T>(args);
        return new FunctionCommandHandler<T>(input, command);
      }
      case CommandType.Module: {
        const input = new CommandHandlerInput<T>(args);
        const jsModulePath = PathUtils.resolvePath(command, ncaCommand.directory);
        return new ModuleCommandHandler<T>(input, jsModulePath);
      }
      default:
        return null;
    }
  }
}
