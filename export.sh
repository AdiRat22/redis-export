#!/bin/sh
# Usage: ./export.sh [-v] /path/to/config.xml
set -e

VERBOSE=""
XML=""
for arg in "$@"; do
  if [ "$arg" = "-v" ]; then VERBOSE="-v"; else XML="$arg"; fi
done

if [ -z "$XML" ] || [ ! -f "$XML" ]; then
  echo "Usage: export.sh [-v] /path/to/config.xml" >&2
  exit 1
fi

DIR=$(cd "$(dirname "$XML")" && pwd)
FILE=$(basename "$XML")
cd "$(dirname "$0")"

docker compose --profile tools run --rm -v "$DIR":/data:ro app $VERBOSE "/data/$FILE"
