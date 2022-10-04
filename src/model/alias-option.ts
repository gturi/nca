import { AliasOptionType } from "./alias-option-type";

export interface AliasOption {
  /** Option name. */
  name: string;
  /** Option alternative name. */
  alternativeName?: string;
  /** Option type. */
  optionType: AliasOptionType;
  /** Default option value. */
  defaultValue: string;
}
