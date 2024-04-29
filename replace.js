const fs = require('fs');

const pathIndexFileBuilded = './build/index.html';

const readIndexFile = () => fs.readFileSync(pathIndexFileBuilded);
const replaceAbsolutePathsToRelativePaths = () => content.toString().replace(/\/assets/g, './assets');
const upgradeIndexFile = (newFile) => fs.writeFileSync(pathIndexFileBuilded, newFile);

const content = readIndexFile();

const newFile = replaceAbsolutePathsToRelativePaths();

upgradeIndexFile(newFile);
