import shelljs from 'shelljs';
import yargs, { Arguments } from "yargs";
import yaml from "js-yaml";
import * as iteratorHelper from "iterator-helper";
import { CommandHandlerInput } from "../model/input/command-handler-input";
import { CompletionInput } from "../model/input/completion-input";
import { ShelljsUtils } from "../util/shelljs-utils";
import { ChildProcessUtils } from "../util/child-process-utils";
import { CliUtils } from "../model/input/cli-utils";

export class InputBuilder {

  static getCommandHandlerInput<T>(args: yargs.ArgumentsCamelCase<T>): CommandHandlerInput<T> {
    return {
      args: args,
      cliUtils: this.getCliUtils(),
      iteratorHelper: iteratorHelper,
      yaml: yaml
    };
  }

  static getCompletionInput(
    current: string,
    argv: Arguments,
    error: Error | null,
    defaultCompletions: string[] | undefined,
    modulePath: string | null
  ): CompletionInput {
    return {
      current: current,
      argv: argv,
      error: error,
      defaultCompletions: defaultCompletions ?? [],
      modulePath: modulePath,
      cliUtils: this.getCliUtils(),
      iteratorHelper: iteratorHelper,
      yaml: yaml
    };
  }

  private static getCliUtils(): CliUtils {
    return {
      shelljs: shelljs,
      shelljsSafeExec: ShelljsUtils.safeExec,
      spawn: ChildProcessUtils.spawn,
      spawnSync: ChildProcessUtils.spawnSync
    };
  }
}
