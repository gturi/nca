import { AliasOptionType } from "./alias-option-type";

export interface AliasOption {
  name: string;
  alternativeName?: string;
  optionType: AliasOptionType;
  defaultValue: string;
}
