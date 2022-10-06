import { PositionalArgumentType } from "./positional-argument-type";

export interface PositionalArgument {
  /** Name of the positional argument. */
  name: string;
  /** Description of the positional argument. */
  description: string;
  /** Type of the positional argument. */
  type: PositionalArgumentType;
  /** Positional argument default value. */
  defaultValue?: string;
  /** Whether the positional argument is required. Defaults to true when {@link PositionalArgument.defaultValue} is not defined. */
  required: boolean;
}
