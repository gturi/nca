import yargs from "yargs";
import { OptionParam } from '../../model/api/option-param';
import { OptionParamType } from '../../model/api/option-param-type';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { Command } from "../command";
import { NodeUtils } from '../../util/node-utils';
import { PackageJsonLoader } from '../../loader/package-json-loader';

export class ListAliasCommand extends Command {

  override getCommandName(): string {
    return YargsUtils.getCommand('list', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'list the global aliases';
  }

  override getOptionParams(): OptionParam[] {
    const broken: OptionParam = {
      name: 'b',
      alternativeName: 'broken',
      description: 'show only the broken aliases',
      optionType: OptionParamType.Boolean,
      defaultValue: 'false'
    }
    const removeBroken: OptionParam = {
      name: 'r',
      alternativeName: 'remove-broken',
      description: 'remove the broken aliases',
      optionType: OptionParamType.Boolean,
      defaultValue: 'false'
    }
    return [broken, removeBroken];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const showBroken = args.b as boolean;
    const removeBroken = args.r as boolean;

    const packageJsonLoader = new PackageJsonLoader();

    let aliases: string[];
    if (showBroken === true || removeBroken === true) {
      aliases = packageJsonLoader.getBrokenAliases();
    } else {
      aliases = Object.keys(packageJsonLoader.bin);
    }

    if (aliases.length === 0) {
      console.log('No aliases found');
      return;
    }

    this.prettyPrintAliases(packageJsonLoader, aliases);

    if (removeBroken === true && aliases.length > 0) {
      aliases.forEach(aliasName => packageJsonLoader.deleteAlias(aliasName));

      NodeUtils.refreshLocalAliases();
    }
  }

  private prettyPrintAliases(packageJsonLoader: PackageJsonLoader, aliasNames: string[]): void {
    aliasNames.forEach(aliasName => {
      const aliasCodePath = packageJsonLoader.getAliasCodePath(aliasName) ?? 'unknown';
      console.log(`${aliasName} --> '${aliasCodePath}'`);
    });
  }
}
