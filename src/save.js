const { parseConfig } = require('./parse');

async function save(xml, redis) {
  const { subdomains, cookies } = parseConfig(xml);
  const saved = [];

  const json = JSON.stringify(subdomains);
  await redis.set('subdomains', json);
  saved.push(['subdomains', json]);

  for (const cookie of cookies) {
    const key = 'cookie:' + cookie.name + ':' + cookie.host;
    await redis.set(key, cookie.value);
    saved.push([key, cookie.value]);
  }

  return saved;
}

module.exports = { save };
