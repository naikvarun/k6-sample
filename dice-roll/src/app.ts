/*app.ts*/
import { getRandomNumber } from './dice';
import { setupTracing } from './instrumentation';
const tracer = setupTracing('water-api', '0.0.1');

import express, { Express, Response } from 'express';
const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).send('HEALTHY')); // endpoint that is called by framework/cluster
app.get('/rolldice', (req, res: Response) => {
  const tea = req.query.tea;
  console.log('Rolling dice');
  const roll = getRandomNumber(1, 6);
  if (roll === 6) {
    return res.status(500).json({ error: 'got a roll of 6' });
  }
  console.log(`Received tea: ${tea}`);
  res.json({ roll, tea });
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
