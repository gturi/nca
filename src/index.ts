import { YargsLoader } from './loader/yargs-loader';

function nca() {
  const yargsLoader = new YargsLoader();
  yargsLoader.init();
}

export { nca };
