import { execSync } from 'child_process';

// Default value `unknown` if no args provided via CLI.
const arg = process.argv[2] || 'unknown';

const deployDir = `gh-pages/${arg}`;
const options = { stdio: [0, 1, 2] };

// generate coverage
const coverageDir = `${deployDir}/coverage`;
execSync('npm run build', options);
execSync(`nyc --report-dir=${coverageDir} -r lcov -e .ts -x "*.test.ts" npm run test`, options);
console.log(`Coverage generated at ${process.cwd()}/${coverageDir}`);
