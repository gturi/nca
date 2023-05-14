import { execSync } from 'child_process';

execSync('npm run build')
execSync("npm install --prefix './test/command-handler/module/external-dependency'");
