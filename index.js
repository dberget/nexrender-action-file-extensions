const { name } = require("./package.json");
const path = require("path");

module.exports = (job, settings, options, type) => {
  return new Promise((resolve, reject) => {
    job.assets
      .filter(asset => asset.type === "image")
      .forEach(asset => {
        console.log(path.extname(asset.dest));
      });

    resolve(job);
  });
};
