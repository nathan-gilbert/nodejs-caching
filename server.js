const fastify = require("fastify")({
  logger: true,
});

const redis_host = process.env.REDIS_TLS_URL || "127.0.0.1";
const socket =
  process.env.REDIS_TLS_URL != ""
    ? {
        tls: true,
        rejectUnauthorized: false,
      }
    : { tls: false, rejectUnauthorized: false };

fastify.register(require("@fastify/redis"), {
  host: redis_host,
  socket: socket,
});

fastify.register(require("./routes"));

fastify.listen({ port: 8888 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
