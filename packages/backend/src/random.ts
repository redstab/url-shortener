import { rword } from 'rword';
import { redis } from './db';

export const GenerateRandomWord = (): string => rword.generate() as string;

export const GenerateRandomKey = async () => {
  let randomWord = GenerateRandomWord();
  let randomKey = randomWord;

  let exists = await redis.exists(randomKey);

  while (exists) {
    randomKey += '-' + GenerateRandomWord();
    exists = await redis.exists(randomKey);
  }

  return randomKey;
};
