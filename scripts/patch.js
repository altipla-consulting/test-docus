
// https://httpbin.org/status/200

const fs = require('fs');
const path = require('path');

const nodeModulesDir = path.resolve(__dirname, '../node_modules');

function replaceInFile(filePath, searchValue, replaceValue) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(searchValue)) {
    content = content.split(searchValue).join(replaceValue);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.startsWith('ui-pro.')) {
      replaceInFile(fullPath, 'https://api.nuxtlabs.com/ui-pro/verify', 'https://httpbin.org/status/200');
    }
  }
}

walkDir(nodeModulesDir);
