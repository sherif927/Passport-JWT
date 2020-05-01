const { promisify } = require("util");
const redis = require('redis');


const redisClient = redis.createClient().on('error', err => console.log(err));


const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.setex).bind(redisClient);

module.exports = {
  redisClient,
  getAsync,
  setAsync
}
