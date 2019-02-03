"use strict";

// const argv = require("argv");
const fs = require("fs");
const jimp = require("jimp");
const sizeList = require("./sizeList");
const DIR_PATH = "./generated";

// generated dirを作成
try {
  fs.statSync(DIR_PATH);
} catch (e) {
  fs.mkdirSync(DIR_PATH);
}

Promise.all(sizeList.map(info => execute(info.size, info.rate)))
  .then(() => {
    console.log("COMPLETED!");
  })
  .catch(error => {
    console.log(`FAILED: ${error}`);
  })

function execute(size, rate) {
  return jimp.read("./icon.png")
    .then(icon => {
      const side = size * rate;
      const file = `${DIR_PATH}/${size}@${rate}.png`;
      icon.resize(side, side).write(file);
      return file;
    })
    .then((file) => {
      console.log(`Created: ${file}`);
    })
    .catch(error => {
      console.log(`Failed: ${error}`);
    })
}
