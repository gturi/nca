import yargs from "yargs";
import { Alias } from "../model/alias";
import { CommandType } from "../model/command-type";
import { StringUtils } from "../util/string-utils";
import { AnyObj } from "../util/custom-types";
import { SimpleCommandHandler } from "../command/handler/simple-command-handler";
import { FunctionCommandHandler } from "../command/handler/function-command-handler";
import { ModuleCommandHandler } from "../command/handler/module-command-handler";

export class YargsHandlerBuilder {

  static getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>, alias: Alias) {
    if (!StringUtils.isEmpty(alias.command)) {
      const commandType = alias.commandType ?? CommandType.Simple
      const command = alias.command ?? '';

      const commandHandlersSupplier = [
        () => new SimpleCommandHandler(command),
        () => new FunctionCommandHandler<T>(args, command),
        () => new ModuleCommandHandler<T>(args, command)
      ];

      const commandSupplier = commandHandlersSupplier.map(getCommandHandler => getCommandHandler())
        .find(commandHandler => commandType === commandHandler.commandType)

      if (commandSupplier) {
        commandSupplier.run()
      } else {
        console.error(`Command type not supported ${alias.commandType}`);
      }
    }
  }
}
