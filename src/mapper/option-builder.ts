import yargs from "yargs";
import { OptionParam } from "../model/api/option-param";
import { AnyObj } from "../util/custom-types";

export class OptionBuilder {

  static build<T = AnyObj>(yargs: yargs.Argv<T>, options?: OptionParam[]) {
    options?.forEach(option => this.mapOption<T>(yargs, option));
  }

  private static mapOption<T = AnyObj>(yargs: yargs.Argv<T>, option: OptionParam) {
    yargs.option(option.name, {
      alias: option.alternativeName,
      description: option.description,
      type: option.optionType,
      default: option.defaultValue
    });
  }
}
