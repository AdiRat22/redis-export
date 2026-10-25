const fs = require('fs');
const { createClient } = require('redis');
const { save } = require('./save');

async function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('-v');
  const file = args.find((a) => a !== '-v');

  if (!file) {
    console.log('Usage: export.sh [-v] /path/to/config.xml');
    process.exit(1);
  }

  const xml = fs.readFileSync(file, 'utf8');
  const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
  await redis.connect();

  const saved = await save(xml, redis);
  console.log('Saved ' + saved.length + ' keys');

  if (verbose) {
    for (const [key, value] of saved) {
      console.log(key + ' = ' + value);
    }
  }

  await redis.quit();
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
