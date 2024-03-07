const fs = require("node:fs");

function readData() {
  try {
    const data = fs.readFileSync("data.txt", "utf8");
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function routes(fastify, options) {
  fastify.get("/api/user-data", async (request, reply) => {
    const userData = readData();
    return { data: userData };
  });
}

module.exports = routes;
