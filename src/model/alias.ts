import { CommandType } from "./command-type"
import { OptionParam } from "./option-param";
import { PositionalArgument } from "./positional-argument";

export interface Alias {
  /** The name that will be used to recall the alias. */
  name: string;
  /** The alias description. It is showed when using the help command or 
   * when providing wrong/urecognized input. */
  description: string;
  /** The command to run when the alias is called. It is evaluated as a shell command
   * or a javascript function based on {@link Alias.commandType} value.
   * It can be left empty when {@link Alias.subAliases} are defined. */
  command?: string;
  /** Determines how the command will be executed.
   * When left empty defaults to {@link CommandType.Simple}. */
  commandType?: CommandType;
  /** Options passed down to this alias and its subaliases when commandType=Function*/
  options?: OptionParam[];
  /** Positional arguments passed down to this alias and its subaliases when commandType=Function */
  positionalArguments?: PositionalArgument[];
  /** Subaliases, to have more complex alias structures. */
  subAliases?: Alias[];
}
