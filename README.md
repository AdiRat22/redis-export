# XML to Redis

Reads config.xml and saves it to Redis:

- `subdomains` holds a JSON list of all subdomains
- `cookie:NAME:HOST` holds the value of each cookie

Run (needs Docker):

    ./export.sh -v /path/to/config.xml

`-v` prints every key that was saved.

Tests:

    npm install
    npm test
