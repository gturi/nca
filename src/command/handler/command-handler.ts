import { CommandType } from "../../model/api/command-type";

export interface CommandHandler {

  get commandType(): CommandType;

  run(): void;
}
