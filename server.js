const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("@fastify/redis"), { host: "127.0.0.1" });

fastify.register(require("./routes"));

fastify.listen({ port: 8888 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
