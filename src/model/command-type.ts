export enum CommandType {
  /** The command will be run as a shell command. */
  Simple = 'Simple',
  /** The command will be run as a javascript function. */
  Function = 'Function',
  /** The command will be a path which will be imported as a CommonJS module. */
  Module = 'Module'
}
