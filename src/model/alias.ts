import { CommandType } from "./command-type"

export interface Alias {
  name: string;
  description: string;
  command: string;
  commandType?: CommandType;
}
