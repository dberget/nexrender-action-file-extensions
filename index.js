const { name } = require("./package.json");
const path = require("path");
const fs = require("fs");

module.exports = (job, settings, options, type) => {
  let ext = (options && options.ext) || "png";

  return new Promise((resolve, reject) => {
    job.assets
      .filter(asset => asset.type === "image")
      .forEach(image => {
        console.log(image.dest);
        // if (path.extname(image.dest) === "") {
        //   let newFileName = `${image.dest}.${ext}`;
        //   fs.renameSync(image.dest, newFileName);
        //   image.dest = newFileName;
        //   return;
        // }
      });

    resolve(job);
  });
};
