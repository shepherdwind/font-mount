'use strict';

const mount = require('../');
const sinon = require('sinon');
const os = require('os');
const test = require('ava');
const fs = require('fs-extra');
const child_process = require('child_process');

test.before(function() {
  sinon.stub(os, 'homedir', () => __dirname + '/fixtures/');
  sinon.stub(child_process, 'execSync', () => 'ok');
  fs.removeSync(__dirname + '/fixtures/.fonts');
});

test.after(() => {
  os.homedir.restore();
  child_process.execSync.restore();
});

test('mout ok', t => {
  sinon.stub(os, 'platform', () => 'linux');
  const ret = mount(__dirname + '/fixtures/foo.ttf');
  t.is(ret, 'ok');
  os.platform.restore();
});

test('not run the next try', t => {
  sinon.stub(os, 'platform', () => 'linux');
  mount(__dirname + '/fixtures/foo.ttf');
  const ret = mount(__dirname + '/fixtures/foo.ttf');
  t.is(ret, null);
  os.platform.restore();
});

test('error source', t => {
  sinon.stub(os, 'platform', () => 'linux');
  const ret = mount(__dirname + '/fixtures/foo.ttf1');
  t.is(ret, null);
  os.platform.restore();
});

test('empty source', t => {
  const ret = mount();
  t.is(ret, null);
  t.is(mount({}), null);
});

test('not support platform', t => {
  sinon.stub(os, 'platform', () => 'win');
  const ret = mount(__dirname + '/fixtures/foo.ttf');
  t.is(ret, null);
  os.platform.restore();
});
