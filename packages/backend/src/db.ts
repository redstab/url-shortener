import { createNodeRedisClient } from 'handy-redis';

const client = createNodeRedisClient({
  host: process.env.REDIS_HOST,
});

export { client };
