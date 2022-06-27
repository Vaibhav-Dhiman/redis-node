const Redis = require("ioredis");
const { StatusCodes } = require("http-status-codes");
const redisConfig = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
};

const redis = new Redis(redisConfig);

const getAllJobs = async (req, res) => {
  const { location } = req.query;
  let page = req.query.page == null ? 0 : req.query.page - 1;

  let returnData = "";
  try {
    redis.get("naukari-cache", (err, rawData) => {
      if (rawData) {
        const result = JSON.parse(rawData);
        if (location) {
          returnData = Object.values(result).filter((item) =>
            item.placeholders[2].label.includes(location)
          );
        } else {
          returnData = result;
        }
        res.status(StatusCodes.OK).send(returnData.slice(10 * page, 10));
      }
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
};

module.exports = {
  getAllJobs,
};
