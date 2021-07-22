import express, { Application, Request, Response } from 'express';
import path from 'path';
import Joi from 'joi';
import { redis } from './db';
import { GenerateRandomKey } from './random';
import { PersistUrlWithSlug, SlugExists } from './persist';
import cors from 'cors';
//2YYBcpZ76MSo5xtB
const app: Application = express();
const port: number = 3000;

app.use(cors());
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
  slug: Joi.string().min(1).allow(''),
});

app.put(
  '/',
  async (
    req: Request<{ url: string; slug: string }>,
    res: Response
  ): Promise<Response> => {
    const { slug } = req.body;
    return res.send({
      slug: !slug ? true : !(await SlugExists(slug)),
    });
  }
);

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

    let { slug, url } = req.body;

    if (!slug) {
      slug = await GenerateRandomKey();
    }

    const { error: persistError } = await PersistUrlWithSlug(url, slug);

    const ttl = await redis.ttl(slug);

    return res.status(persistError ? 409 : 200).send({
      url,
      slug,
      ttl,
      error: persistError ? 'Slug already used' : '',
    });
  }
);

try {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
