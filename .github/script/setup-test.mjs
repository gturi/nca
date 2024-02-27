import { execSync } from 'child_process';

console.log('Compiling the project');
execSync('npm run build');

console.log('Installing the external dependency for the test');
execSync('npm install --prefix "./test/integration/command-handler/module/external-dependency"');
