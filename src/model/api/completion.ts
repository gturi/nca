export interface Completion {
  /** When set to true the provided custom completion will be merged to yargs default one. */
  merge?: boolean;
  /** Static list of possible completion values. */
  completionArray?: string[];
  /** Path to javascript module that will provide the list of possible completion values. */
  completionPath?: string;
}
