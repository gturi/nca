import { execSync } from 'child_process';

// Default value `unknown` if no args provided via CLI.
const arg = process.argv[2] || 'unknown';

const deployDir = `gh-pages/${arg}`;
const options = { stdio: [0, 1, 2] };

// generate coverage
const coverageDir = `${deployDir}/coverage`;
const command = [
  'nyc',
  `--report-dir=${coverageDir}`,
  '-r lcov', // reporter
  '-e .ts',
  '-x "*.test.ts"', // excluded files
  'npm run test'
].join(' ');
execSync(command, options);
console.log(`Coverage generated at ${process.cwd()}/${coverageDir}`);
