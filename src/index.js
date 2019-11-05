const Path = require('path');
const fs = require('fs-extra');
const CopyManager = require('./CopyManager.js');

const copyManager = new CopyManager();

const remotePath = Path.resolve(__dirname, '../node_modules');
const downloadPath = Path.resolve(__dirname, '../copy');
// For the demo, remove the output directory (so we can run it multiple times)
fs.removeSync(downloadPath);
// Copy the directory
copyManager.copyFolder(remotePath, downloadPath);
