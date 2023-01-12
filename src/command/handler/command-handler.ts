import { CommandType } from "../../model/command-type";

export interface CommandHandler {

  get commandType(): CommandType;

  run(): void;
}
