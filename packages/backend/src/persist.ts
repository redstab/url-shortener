import { redis } from './db';

export const SlugExists = async (slug: string) =>
  (await redis.exists(slug)) === 1;

export const ExpireKey = async (key: string, sec: number) =>
  (await redis.expire(key, sec)) === 1;

export const PersistKey = async (key: string, value: string) =>
  (await redis.setnx(key, value)) === 1;

export const PersistUrlWithSlug = async (url: string, slug: string) => {
  const exists = await SlugExists(slug);

  if (exists) {
    return {
      error: 'Slug already used',
    };
  }

  await PersistKey(slug, url); // Save
  await ExpireKey(slug, 60 * 60 * 24 * 30); // Expire in about 30 days

  return {
    error: '',
  };
};
