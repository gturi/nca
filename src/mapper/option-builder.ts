import yargs from "yargs";
import { AliasOption } from "../model/alias-option";
import { AnyObj } from "../util/custom-types";

export class OptionBuilder {

  static build<T = AnyObj>(yargs: yargs.Argv<T>, aliasOptions?: AliasOption[]) {
    if (aliasOptions) {
      aliasOptions.forEach(aliasOption => {
        OptionBuilder.mapOption<T>(yargs, aliasOption);
      });
    }
  }

  private static mapOption<T = AnyObj>(yargs: yargs.Argv<T>, aliasOption: AliasOption) {
    yargs.option(aliasOption.name, {
      alias: aliasOption.alternativeName,
      type: aliasOption.optionType,
      default: aliasOption.defaultValue
    });
  }
}
