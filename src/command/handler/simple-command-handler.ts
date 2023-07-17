import { CommandType } from "../../model/api/command-type";
import { CommandHandler } from "./command-handler";
import shelljs from 'shelljs';

export class SimpleCommandHandler implements CommandHandler {

  private command: string;

  constructor(command: string) {
    this.command = command;
  }

  get commandType(): CommandType {
    return CommandType.Simple;
  }

  run(): void {
    shelljs.exec(this.command);
  }
}
