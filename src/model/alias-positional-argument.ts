import { AliasPositionalArgumentType } from "./alias-positional-argument-type";

export interface AliasPositionalArgument {
  name: string;
  description: string;
  type: AliasPositionalArgumentType;
  defaultValue: string;
  required: boolean;
}
