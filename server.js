const fastify = require("fastify")({
  logger: true,
});

function parseRedisUrl(redisUrl) {
  const url = new URL(redisUrl);
  const username = url.username;
  const password = url.password;
  return {
    host: url.hostname,
    port: url.port,
    username,
    password,
  };
}

const REDIS_HOST = process.env.REDIS_URL
  ? parseRedisUrl(process.env.REDIS_URL)
  : "127.0.0.1";
const PORT = process.env.PORT || 8888;

console.log(parseRedisUrl(process.env.REDIS_URL));

fastify.register(require("@fastify/redis"), {
  host: REDIS_HOST.host,
  port: REDIS_HOST.port || 6379,
  password: REDIS_HOST.password || "",
});

fastify.register(require("./routes"));

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
