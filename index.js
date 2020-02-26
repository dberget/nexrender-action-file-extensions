const { name } = require("./package.json");
const path = require("path");
const fs = require("fs");
var request = require("request");

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

function getContentType(src) {
  const options = {
    method: "HEAD",
    headers: headers,
    url: src
  };

  let contentType = request(src, function(res) {
    return res.headers["content-type"].match(regex);
  });

  return contentType;
}
