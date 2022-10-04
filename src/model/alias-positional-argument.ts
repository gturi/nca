import { AliasPositionalArgumentType } from "./alias-positional-argument-type";

export interface AliasPositionalArgument {
  /** Name of the positional argument. */
  name: string;
  /** Description of the positional argument. */
  description: string;
  /** Type of the positional argument. */
  type: AliasPositionalArgumentType;
  /** Positional argument default value. */
  defaultValue?: string;
  /** Whether the positional argument is required. Defaults to true when {@link AliasPositionalArgument.defaultValue} is not defined. */
  required: boolean;
}
