const axios = require("axios");
const Redis = require("ioredis");

const redisConfig = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
};

const redis = new Redis(redisConfig);
let url = "https://jsonplaceholder.cypress.io/todos";

axios
  .get(url)
  .then((res) => {
    redis.set(`todo-redis`, JSON.stringify(res.data), "EX", 60 * 60);
    process.exit();
  })
  .catch((err) => console.log(err));
