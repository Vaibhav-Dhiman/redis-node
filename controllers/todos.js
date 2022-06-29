const Redis = require("ioredis");
const { StatusCodes } = require("http-status-codes");
const redisConfig = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
};

const redis = new Redis(redisConfig);

const getAllTodo = async (req, res) => {
  try {
    redis.get("todo-redis", (err, rawData) => {
      if (rawData) {
        const result = JSON.parse(rawData);
        res.status(StatusCodes.OK).send(result);
      }
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

const getSingleTodo = async (req, res) => {
  try {
    redis.get("todo-redis", (err, rawData) => {
      if (rawData) {
        const result = JSON.parse(rawData);
        const data = result.filter((item) => item.id == req.params.id);
        res.status(StatusCodes.OK).send(data);
      }
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

module.exports = {
  getAllTodo,
  getSingleTodo,
};
