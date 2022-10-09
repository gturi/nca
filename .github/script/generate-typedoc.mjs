import { execSync } from 'child_process';

// Default value `unknown` if no args provided via CLI.
const arg = process.argv[2] || 'unknown';

const deployDir = `gh-pages/${arg}`;
const options = { stdio: [0, 1, 2] };


const typedocOutputDir = `${deployDir}/docs/`;
const sourcesDir = `src/model`;

// generate typedoc
execSync(`npx typedoc --out ${typedocOutputDir} --entryPointStrategy expand --entryPoints ${sourcesDir}`, options);

console.log(`Typedoc generated at ${process.cwd()}/${typedocOutputDir}`);
