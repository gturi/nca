import { AliasOptionType } from "./alias-option-type";

export interface AliasPositionalArgument {
  name: string;
  description: string;
  type: AliasOptionType;
  defaultValue: string;
  required: boolean;
}
