const axios = require("axios");
const Redis = require("ioredis");
var CronJob = require("cron").CronJob;
var counter = 0;

const naukariConfig = {
  headers: {
    appid: "{your-app-id}",
    systemid: "{your-system-id}",
    authorization: "{your-login-token}",
  },
};
const redisConfig = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || "127.0.0.1",
};

const redis = new Redis(redisConfig);

new CronJob(
  "*/5 * * * * *",
  function () {
    if (counter <= 10) {
      let url = `https://www.naukri.com/jobapi/v3/search?noOfResults=10&urlType=search_by_key_loc&searchType=adv&keyword=nodejs&location=india&pageNo=${counter}&seoKey=nodejs-jobs-in-india&src=jobsearchDesk&latLong=`;
      axios
        .get(url, naukariConfig)
        .then((res) => {
          redis.set(
            `naukari-cache`,
            JSON.stringify(res.data.jobDetails),
            "EX",
            60 * 60
          );
          console.log(
            `-- Storing data to redis for page number: ${counter} --`
          );
        })
        .catch((err) => console.log(err));
      counter++;
    }
  },
  null,
  true
);
