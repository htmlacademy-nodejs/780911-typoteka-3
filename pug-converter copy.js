const path = require(`path`);
const fs = require(`fs`);
const {exec} = require('child_process');

function fromDir(startPath, filter) {

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  const files = fs.readdirSync(startPath);

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      const name = files[i].split(`.`).slice(0, -1).join(`.`)
      console.log(`-- convert: `, filename, name);
      exec(`html2pug < ./${filename} > ./src/express/raw-templates/${name}.pug`);
    }

  }

}

fromDir(`./markup`, `.html`);
