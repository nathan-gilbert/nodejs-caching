const fastify = require("fastify")({
  logger: true,
});

const REDIS_HOST = process.env.REDIS_URL || "127.0.0.1";
const SOCKET = { tls: false, rejectUnauthorized: false };
const PORT = process.env.PORT || 8888;

fastify.register(require("@fastify/redis"), {
  host: REDIS_HOST,
  socket: SOCKET,
});

fastify.register(require("./routes"));

fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
