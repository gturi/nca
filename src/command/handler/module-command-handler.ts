import { CommandHandlerInput } from '../../model/command-handler-input';
import { CommandType } from "../../model/command-type";
import { AnyObj } from "../../util/custom-types";
import { CommandHandler } from "./command-handler";

export class ModuleCommandHandler<T = AnyObj> implements CommandHandler {

  private input: CommandHandlerInput<T>;
  private path: string;

  constructor(input: CommandHandlerInput<T>, path: string) {
    this.input = input;
    this.path = path;
  }

  get commandType(): CommandType {
    return CommandType.Module;
  }

  run(): void {
    // modules need to assign a function to module.exports
    // i.e. module.exports = function (input) { /* code */ };
    import(this.path).then(module => module.default(this.input));
  }
}
