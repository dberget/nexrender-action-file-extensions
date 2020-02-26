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
          let newFileName = `${image.dest}.${ext}`;

          if (fs.existsSync(image.dest)) {
            fs.renameSync(image.dest, newFileName);
          }

          image.dest = newFileName;
        }
      });

    resolve(job);
  });
};
