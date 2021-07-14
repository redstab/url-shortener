import { createNodeRedisClient } from 'handy-redis';

export const redis = createNodeRedisClient({
  host: process.env.REDIS_HOST,
});
