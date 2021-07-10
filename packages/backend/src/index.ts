import express, { Application, Request, Response } from 'express';
import path from 'path';

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.post('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ msg: 'Done' });
});

try {
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
