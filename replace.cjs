/* eslint-disable @typescript-eslint/no-var-requires */
const fsNode = require('fs');

const pathIndexFileBuild = './build/index.html';

const readIndexFile = () => fsNode.readFileSync(pathIndexFileBuild);
const replaceAbsolutePathsToRelativePaths = () => content.toString().replace(/\/assets/g, './assets');
const upgradeIndexFile = (newFile) => fsNode.writeFileSync(pathIndexFileBuild, newFile);

const content = readIndexFile();

const newFile = replaceAbsolutePathsToRelativePaths();

upgradeIndexFile(newFile);
