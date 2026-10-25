const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { parseConfig } = require('../src/parse');

test('reads subdomains', () => {
  const xml = '<config><subdomains><subdomain>http://a.com</subdomain><subdomain>http://b.com</subdomain></subdomains></config>';
  assert.deepStrictEqual(parseConfig(xml).subdomains, ['http://a.com', 'http://b.com']);
});

test('reads cookies', () => {
  const xml = '<config><cookies><cookie name="dlp" host="amazon">abc</cookie></cookies></config>';
  assert.deepStrictEqual(parseConfig(xml).cookies, [{ name: 'dlp', host: 'amazon', value: 'abc' }]);
});

test('works with an empty config', () => {
  assert.deepStrictEqual(parseConfig('<config></config>'), { subdomains: [], cookies: [] });
});

test('reads the real config file', () => {
  const xml = fs.readFileSync(path.join(__dirname, '../sample/config.xml'), 'utf8');
  const result = parseConfig(xml);
  assert.strictEqual(result.subdomains.length, 38);
  assert.strictEqual(result.cookies.length, 46);
});
