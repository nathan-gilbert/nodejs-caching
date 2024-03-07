# nodejs-caching

## Getting Started

1. `nvm use` -- setup Node
2. `npm install` -- install dependencies
3. `node server.js` -- run server

## Testing Latency

Run `curl -w "@curl-format.txt" -o /dev/null -s "<http://localhost:8888/api/user-data>"`
