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

const PORT = process.env.PORT || 8888;
const HOST = process.env.PORT ? "0.0.0.0" : "127.0.0.1";
const redis_info = process.env.REDIS_URL
  ? parseRedisUrl(process.env.REDIS_URL)
  : "127.0.0.1";

fastify.register(require("@fastify/redis"), {
  host: redis_info.host,
  port: redis_info.port || 6379,
  password: redis_info.password || "",
});

fastify.register(require("./routes"));

fastify.listen({ host: HOST, port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
