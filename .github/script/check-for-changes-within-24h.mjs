import { execSync } from 'child_process';

try {
  // folders or files (separated by spaces) to look for changes within 24 
  const arg = process.argv[2] || '';
  const folders = arg === '' ? arg : `-- ${arg}`;
  const command = `git log --pretty=format: --name-only --since="1 days ago" ${folders}`;
  const changedFiles = execSync(command).toString();

  if (changedFiles.split('\n').some(file => file !== '')) {
    // a commit was made within the last 24 hours
    console.log('run');
  } else {
    // no commit was made within the last 24 hours
    console.log('skip');
  }
} catch (e) {
  console.error(e);
  process.exit(-1);
}
