import express, { Application, Request, Response } from 'express';
import path from 'path';
//2YYBcpZ76MSo5xtB
const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../frontend/build')));

app.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  return res.status(200).send({ id, ip: req.ip });
});

app.post('/', async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({ msg: 'Done' });
});

try {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on http://localhost:${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
