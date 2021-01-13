'use strict';

const packageVersion = require('../../../package.json').version;

module.exports = {
  name: '--version',
  run() {
    console.log(packageVersion);
  }
}
