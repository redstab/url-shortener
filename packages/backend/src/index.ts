import express, { Application, Request, Response } from 'express';
import path from 'path';
import Joi from 'joi';
import { RateLimitKey } from './utils';
import { redis } from './db';
//2YYBcpZ76MSo5xtB
const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('/:slug', async (req: Request, res: Response): Promise<Response> => {
  const { slug } = req.params;

  const getResponse = await redis.get(slug);

  if (getResponse === null) {
    return res.status(404).send('Page not found!');
  }

  res.redirect(getResponse);
  res.end();
});

const schema = Joi.object({
  url: Joi.string().uri(),
  slug: Joi.string().min(1),
});

app.post(
  '/',
  async (
    req: Request<{ url: string; slug: string }>,
    res: Response
  ): Promise<Response> => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    const { slug, url } = req.body;

    const response = await redis.setnx(slug, url);

    if (response === 0) {
      return res.status(409).send('Slug already used');
    }

    await redis.expire(slug, 60 * 60 * 24 * 30); // Expire in about 30 days

    return res.status(200).send(`http://472.se/${slug}`);
  }
);

try {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
