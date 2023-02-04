import { CommandType } from "../../model/command-type";
import { AnyObj } from "../../util/custom-types";
import { CommandHandler } from "./command-handler";
import { CommandHandlerInput } from "../../model/command-handler-input";

export class FunctionCommandHandler<T = AnyObj> implements CommandHandler {

  private input: CommandHandlerInput<T>;
  private code: string;

  constructor(input: CommandHandlerInput<T>, code: string) {
    this.input = input;
    this.code = code;
  }

  get commandType(): CommandType {
    return CommandType.Function;
  }

  run(): void {
    const fun = new Function(`
      "use strict;"
      const input = arguments[0];
      ${this.code}
    `);
    fun(this.input);
  }
}
