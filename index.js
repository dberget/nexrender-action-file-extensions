const { name } = require("./package.json");
const path = require("path");
const fs = require("fs");

module.exports = (job, settings, options, type) => {
  let ext = (options && options.ext) || "png";

  return new Promise((resolve, reject) => {
    job.assets
      .filter(asset => asset.type === "image")
      .forEach(image => {
        if (path.extname(image.dest) === "") {
          console.log(image.dest);

          let newFileName = `${image.dest}.${ext}`;

          console.log(newFileName);
          fs.renameSync(image.dest, newFileName);

          image.dest = newFileName;
        }
      });
    console.log(job.assets);

    resolve(job);
  });
};
