'use strict';
const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const debug = require('debug')('font-mount');
const child_process = require('child_process');

// { fontName: String, fontSource: String, fontDist: String }
module.exports = function mount(fontConfig) {

  if (typeof fontConfig === 'string') {
    debug('param string get %s', fontConfig);
    fontConfig = {
      fontName: path.basename(fontConfig),
      fontSource: fontConfig,
    };
  }

  if (!fontConfig || !fontConfig.fontSource) {
    debug('fontConfig is empty, so just return');
    return null;
  }

  if (os.platform() !== 'linux') {
    debug('only run on linux');
    return null;
  }

  const dist = fontConfig.fontDist || os.homedir() + '/.fonts/';
  const fullpath = path.join(dist, fontConfig.fontName);

  // already installed
  if (fs.existsSync(fullpath)) {
    debug('font %s installed, just return', fullpath);
    return null;
  }

  if (!fs.existsSync(fontConfig.fontSource)) {
    debug('font source empty, just return');
    return null;
  }

  debug('start copy file from %s to %s', fontConfig.source, fullpath);
  // copy file
  fs.copySync(fontConfig.fontSource, fullpath)
  debug('copy file end');
  // update fonts config
  return child_process.execSync('which fc-cache && fc-cache -f -v');
};
