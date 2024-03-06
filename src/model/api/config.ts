import { NcaCommand } from "./nca-command";

export interface Config {
  /**
   * Absolute paths to external configs.
   */
  includePaths?: string[];
  /**
   * List of nca commands.
   */
  commands?: NcaCommand[];
}
