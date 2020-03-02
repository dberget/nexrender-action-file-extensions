const { name } = require("./package.json");
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = (job, settings, options, type) => {
  return new Promise((resolve, reject) => {
    job.assets
      .filter(asset => asset.type === "image")
      .forEach((image, i) => {
        if (path.extname(image.dest) === "") {
          getContentType(image.src).then(res => {
            settings.logger.log(`getting content type`);

            let ext = res.split("/")[1];
            let newFileName = `${image.dest}-${i}.${ext}`;

            if (fs.existsSync(image.dest)) {
              fs.renameSync(image.dest, newFileName);
            }

            image.dest = newFileName;

            settings.logger.log(
              `changed ${image.layerName} file to ${newFileName}`
            );
          });
        } else {
          let ext = path.extname(image.dest);
          let dir = path.dirname(image.dest);

          let newFileName = `${dir}\\image_${i}${ext}`;

          settings.logger.log("dest: ", image.dest);
          settings.logger.log("newFile: ", newFileName);

          if (fs.existsSync(image.dest)) {
            fs.renameSync(image.dest, newFileName);
          } else {
            settings.logger.log(
              `${image.dest} file doesn't exist, can't rename.`
            );
          }

          image.dest = newFileName;
          settings.logger.log(`renamed file name - ${newFileName}`);
        }
      });

    settings.logger.log(job.assets);

    resolve(job);
  });
};

async function getContentType(src) {
  const options = {
    method: "HEAD"
  };

  return await fetch(src, options).then(res => {
    return res.headers.get("content-type");
  });
}
