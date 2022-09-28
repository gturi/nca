import { CommandType } from "./command-type"
import { AliasOption } from "./alias-option";

export interface Alias {
  name: string;
  description: string;
  command: string;
  commandType?: CommandType;
  options?: AliasOption[];
}
