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
   * when providing wrong/unrecognized input.
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
   * When left empty defaults to {@link CommandType.Native}.
   */
  commandType?: CommandType;
  /**
   * Options passed down to this nca command and its subCommands.
   */
  options?: OptionParam[];
  /**
   * Positional arguments passed down to this nca command and its sub commands.
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
  /**
   * When set to true, the command execution directory will be changed to
   * the one where its yaml configuration is located.
   */
  runInConfigDirectory: boolean;
  /**
   * Considered only when {@link NcaCommand.commandType} value is {@link CommandType.Native}.
   * When set to true, the program will receive the positional arguments like options
   * (i.e. --myParam myParamValue).
   */
  positionalArgumentsAsOptions: boolean;
  // TODO: move it to a new file, to avoid exposing an useless field
  /**
   * Set internally. Allows commands and completionPaths to be used
   * with relative paths.
   */
  directory: string;
}
