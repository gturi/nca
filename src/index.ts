import { YargsLoader } from './loader/yargs-loader';
import { CommandHandlerInput } from './model/input/command-handler-input';
import { CompletionInput } from './model/input/completion-input';


function nca() {
  const yargsLoader = new YargsLoader();
  yargsLoader.init();
}

export {
  nca,
  CommandHandlerInput,
  CompletionInput
}
