const { name } = require("./package.json");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = (job, settings, options, type) => {
  return new Promise((resolve, reject) => {
    job.assets
      .filter(asset => asset.type === "image")
      .forEach(image => {
        if (path.extname(image.dest) === "") {
          let ext = getContentType(image.src);
          let newFileName = `${image.dest}.${ext}`;

          if (fs.existsSync(image.dest)) {
            fs.renameSync(image.dest, newFileName);
          }

          image.dest = newFileName;

          settings.logger.log(
            `changed ${image.layerName} file to ${newFileName}`
          );
        }
      });

    resolve(job);
  });
};

const regex = /([^\/]+$)/;

async function getContentType(src) {
  const options = {
    method: "HEAD"
  };

  return await fetch(src, options).then(res => {
    return res.headers.get("content-type").split("/")[1];
  });
}
