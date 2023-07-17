import { Alias } from "./alias";

export interface Config {
  /** Absolute paths to external configs. */
  includePaths?: string[];
  /** List of aliases. */
  aliases?: Alias[];
}
