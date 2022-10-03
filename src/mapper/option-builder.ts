import yargs from "yargs";
import { AliasOption } from "../model/alias-option";

export class OptionBuilder {

  static build<T = {}>(yargs: yargs.Argv<T>, aliasOptions?: AliasOption[]) {
    if (aliasOptions) {
      aliasOptions.forEach(aliasOption => {
        OptionBuilder.mapOption<T>(yargs, aliasOption);
      });
    }
  }

  private static mapOption<T = {}>(yargs: yargs.Argv<T>, aliasOption: AliasOption) {
    yargs.option(aliasOption.name, {
      alias: aliasOption.alternativeName,
      type: aliasOption.optionType,
      default: aliasOption.defaultValue
    });
  }
}
