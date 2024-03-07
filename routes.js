const fs = require("node:fs");

function readData() {
  try {
    const data = fs.readFileSync("data.txt", "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function routes(fastify, options) {
  fastify.get("/api/user-data", async (_, reply) => {
    const userData = readData();
    return reply.send({ data: userData });
  });

  fastify.get("/api/cached-user-data", async (_, reply) => {
    const { redis } = fastify;

    const data = await redis.get("user-data", (err, val) => {
      if (val) {
        return { data: val };
      }
      return null;
    });

    if (data) {
      return reply.send(data);
    }

    const userData = readData();
    await sleep(10000);
    redis.set("user-data", userData);
    return reply.send({ data: userData });
  });
}

module.exports = routes;
