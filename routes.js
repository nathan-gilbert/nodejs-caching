const fs = require("node:fs");

function readData() {
  try {
    //const data = fs.readFileSync("data.txt", "utf8");
    const data = "Hello, World!";
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
    return { data: userData };
  });

  fastify.get("/api/cached-user-data", async (_, reply) => {
    const { redis } = fastify;
    const data = await redis.get("user-data2", (err, val) => {
      if (val) {
        console.log("cached data", val);
        return { data: val };
      }
      return null;
    });

    if (data) {
      console.log("cached data outer", data);
      return data;
    }

    const userData = readData();
    await sleep(10000);
    redis.set("user-data2", userData);
    return { data: userData };
  });
}

module.exports = routes;
