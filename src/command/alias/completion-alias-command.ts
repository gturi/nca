import yargs from "yargs";
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { PackageJsonLoader } from '../../loader/package-json-loader';
import { ProcessArgumentUtils } from "../../util/process-arguments-utils";
import { NcaCommandTemplate } from "../../model/internal/nca-command-template";

export class CompletionAliasCommand extends NcaCommandTemplate {

  override getCommandName(): string {
    return YargsUtils.getCommand('completion', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'get completion for a global alias for a nca command';
  }

  override getPositionalArguments(): PositionalArgument[] {
    const aliasArgument: PositionalArgument = {
      name: 'aliasName',
      description: 'alias to get completion for',
      type: PositionalArgumentType.String,
      required: true
    }
    return [aliasArgument];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const aliasName = args.aliasName as string;

    const packageJsonLoader = new PackageJsonLoader();
    const aliasCodePath = packageJsonLoader.getAliasCodePath(aliasName);

    if (aliasCodePath === null) {
      throw new Error(`Alias '${aliasName}' not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { commandArray } = require(aliasCodePath);

    const completion = this.getCompletion(aliasName, commandArray);
    console.log(completion);
  }

  private getCompletion(aliasName: string, commandArray: string[]): string {
    const aliasCompletionFunction = `_nca_${aliasName}_yargs_completions`;
    const inputArgs = ProcessArgumentUtils.sanitizeCommandArray(commandArray).join(' ');
    return [
      `# ${aliasName} completion`,
      `${aliasCompletionFunction}()`,
      `{`,
      `    _nca_yargs_completions ${inputArgs}`,
      ``,
      `    return 0`,
      `}`,
      `complete -o bashdefault -o default -F ${aliasCompletionFunction} ${aliasName}`
    ].join('\n') + '\n';
  }
}
