#!/usr/bin/env node

/**
 * Azure Deployment Helper Script for React Portfolio
 * 
 * This script helps prepare your React portfolio for Azure deployment
 * by creating necessary configuration files and providing deployment guidance.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're in the correct directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Please run this script from your project root directory.');
  process.exit(1);
}

// Read package.json to verify it's a React project
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
if (!packageJson.dependencies || !packageJson.dependencies.react) {
  console.error('❌ Error: This doesn\'t appear to be a React project (no react dependency found).');
  process.exit(1);
}

console.log('✅ React project detected.');

// 1. Create staticwebapp.config.json if it doesn't exist
const staticWebAppConfig = {
  navigationFallback: {
    rewrite: "/index.html"
  },
  responseOverrides: {
    "401": {
      redirect: "/login"
    }
  }
};

const configPath = path.join(process.cwd(), 'staticwebapp.config.json');
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(configPath, JSON.stringify(staticWebAppConfig, null, 2));
  console.log('✅ Created staticwebapp.config.json for Azure Static Web Apps');
} else {
  console.log('ℹ️  staticwebapp.config.json already exists');
}

// 2. Verify build script exists
if (!packageJson.scripts || !packageJson.scripts.build) {
  console.error('❌ Error: No build script found in package.json');
  process.exit(1);
}

console.log('✅ Build script found:', packageJson.scripts.build);

// 3. Check if dist folder exists after building
console.log('\n🔧 To prepare for Azure deployment:');

console.log('\n1. Build your project:');
console.log('   npm run build');

console.log('\n2. Test locally (optional but recommended):');
console.log('   npm run preview');

console.log('\n3. Deploy to Azure Static Web Apps:');
console.log('   - Go to https://portal.azure.com/');
console.log('   - Create a new "Static Web App" resource');
console.log('   - Connect it to your GitHub repository');
console.log('   - Set build configuration:');
console.log('     * App location: /');
console.log('     * Output location: dist');
console.log('     * App build command: npm run build');

console.log('\n📝 Note: This script only prepares configuration files.');
console.log('   Actual deployment must be done through Azure Portal or Azure CLI.');

console.log('\n✅ Your React portfolio is ready for Azure deployment!');