import { CommandType } from "./command-type"
import { Completion } from "./completion";
import { OptionParam } from "./option-param";
import { PositionalArgument } from "./positional-argument";

export interface NcaCommand {
  /**
   * The name that will be used to recall the command.
   */
  name: string;
  /**
   * The nca command description. It is showed when using the help command or
   * when providing wrong/urecognized input.
   */
  description?: string;
  /**
   * The command to run when the nca command is called. Its execution mode will
   * depend on a shell command on {@link NcaCommand.commandType} value.
   * It can be left empty when {@link NcaCommand.subCommands} are defined.
   */
  command?: string;
  /**
   * Determines how the command will be executed.
   * When left empty defaults to {@link CommandType.Simple}.
   */
  commandType?: CommandType;
  /**
   * Options passed down to this nca command and its subCommands when {@link NcaCommand.commandType}
   * is {@link CommandType.Function} or {@link CommandType.Module}.
   */
  options?: OptionParam[];
  /**
   * Positional arguments passed down to this nca command and its sub commands when
   * {@link NcaCommand.commandType} is {@link CommandType.Function} or {@link CommandType.Module}.
   */
  positionalArguments?: PositionalArgument[];
  /**
   * Sub commands, used to define a more complex command structure.
   */
  subCommands?: NcaCommand[];
  /**
   * Defines a custom completion for this nca command.
   */
  completion?: Completion;
  // TODO: move it to a new file, to avoid exposing an useless field
  /**
   * Set internally to allow usage of relative paths with
   * {@link CommandType.Module} command and completionPath.
   */
  directory: string;
}