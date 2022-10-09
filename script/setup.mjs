import fs from 'fs';
import os from "os";
import path from 'path';

console.log('Running setup script');

const configDir = path.join(os.homedir(), '.nca');
const configPath = path.join(configDir, 'config.yml');

if (fs.existsSync(configPath)) {
  console.log('Config file already exists, nothing to do');
} else {
  fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(configPath, '');
  console.log('Config file created successfully');
}

console.log('Setup script ended successfully');
