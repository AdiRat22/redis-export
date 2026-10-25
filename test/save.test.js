const test = require('node:test');
const assert = require('node:assert');
const { save } = require('../src/save');

const xml = `<config>
  <subdomains><subdomain>http://a.com</subdomain><subdomain>http://b.com</subdomain></subdomains>
  <cookies><cookie name="dlp-avast" host="amazon">mmm_amz_dlp_777_ppc_m</cookie></cookies>
</config>`;

function fakeRedis() {
  const data = {};
  return { data, set: async (key, value) => { data[key] = value; } };
}

test('saves subdomains as json', async () => {
  const redis = fakeRedis();
  await save(xml, redis);
  assert.strictEqual(redis.data.subdomains, '["http://a.com","http://b.com"]');
});

test('saves cookie under cookie:name:host', async () => {
  const redis = fakeRedis();
  await save(xml, redis);
  assert.strictEqual(redis.data['cookie:dlp-avast:amazon'], 'mmm_amz_dlp_777_ppc_m');
});

test('returns all saved keys', async () => {
  const saved = await save(xml, fakeRedis());
  assert.deepStrictEqual(saved.map((s) => s[0]), ['subdomains', 'cookie:dlp-avast:amazon']);
});
