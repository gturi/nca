import { CommandType } from "./command-type"
import { AliasOption } from "./alias-option";
import { AliasPositionalArgument } from "./alias-positional-argument";

export interface Alias {
  name: string;
  description: string;
  command: string;
  commandType?: CommandType;
  options?: AliasOption[];
  positionalArguments?: AliasPositionalArgument[];
}
