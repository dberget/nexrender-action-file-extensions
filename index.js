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
          let newFileName = `${asset.dest}.${ext}`;
          image.dest = newFileName;
          fs.rename(asset.dest, newFileName);
        }

        console.log(job.assets);
      });

    resolve(job);
  });
};
