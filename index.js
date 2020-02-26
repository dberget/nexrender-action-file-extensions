const { name } = require("./package.json");
const path = require("path");

module.exports = (job, settings, options, type) => {
  return new Promise((resolve, reject) => {
    job.assets.forEach(asset => {
      console.log(asset);
    });

    resolve(job);
  });
};
