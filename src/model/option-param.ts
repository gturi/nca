import { OptionParamType } from "./option-param-type";

export interface OptionParam {
  /** Option name. */
  name: string;
  /** Option alternative name. */
  alternativeName?: string;
  /** Option description. */
  description?: string;
  /** Option type. */
  optionType: OptionParamType;
  /** Default option value. */
  defaultValue: string;
}
