const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

function toArray(x) {
  if (x === undefined) return [];
  return Array.isArray(x) ? x : [x];
}

function parseConfig(xml) {
  const config = parser.parse(xml).config;

  const subdomains = toArray(config.subdomains && config.subdomains.subdomain);

  const cookies = toArray(config.cookies && config.cookies.cookie).map((c) => ({
    name: c.name,
    host: c.host,
    value: c['#text'],
  }));

  return { subdomains, cookies };
}

module.exports = { parseConfig };
