import { CommandType } from "./command-type"
import { Completion } from "./completion";
import { OptionParam } from "./option-param";
import { PositionalArgument } from "./positional-argument";

export interface Alias {
  /**
   * The name that will be used to recall the alias.
   */
  name: string;
  /**
   * The alias description. It is showed when using the help command or
   * when providing wrong/urecognized input.
   */
  description?: string;
  /**
   * The command to run when the alias is called. It is evaluated as a shell command
   * or a javascript function based on {@link Alias.commandType} value.
   * It can be left empty when {@link Alias.subAliases} are defined.
   */
  command?: string;
  /**
   * Determines how the command will be executed.
   * When left empty defaults to {@link CommandType.Simple}.
   */
  commandType?: CommandType;
  /**
   * Options passed down to this alias and its subaliases when {@link Alias.commandType}
   * is {@link CommandType.Function} or {@link CommandType.Module}.
   */
  options?: OptionParam[];
  /**
   * Positional arguments passed down to this alias and its subaliases when
   * {@link Alias.commandType} is {@link CommandType.Function} or {@link CommandType.Module}.
   */
  positionalArguments?: PositionalArgument[];
  /**
   * Subaliases, to have more complex alias structures.
   */
  subAliases?: Alias[];
  /**
   * Defines a command custom completion
   */
  completion?: Completion;
  // TODO: move it to a new file, to avoid exposing an useless field
  /**
   * Set internally to allow usage of relative paths with
   * {@link CommandType.Module} command and completionPath.
   */
  aliasDirectory: string;
}
