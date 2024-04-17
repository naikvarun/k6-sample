/*app.ts*/
import { getRandomNumber } from './dice';
import { setupTracing } from './instrumentation';

import express, { Express, Response } from 'express';
import { getLogger } from './logger';

const logger = getLogger();
setupTracing('water-api', '0.0.1');

const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).send('HEALTHY')); // endpoint that is called by framework/cluster
app.get('/rolldice', (req, res: Response) => {
  const tea = req.query.tea;
  logger.info('Rolling dice');
  const roll = getRandomNumber(1, 6);
  if (roll === 6) {
    logger.error(`Got a roll of 6`);
    return res.status(500).json({ error: 'got a roll of 6' });
  }
  logger.info(`Received tea: ${tea}`);
  res.json({ roll, tea });
});

app.listen(PORT, () => {
  logger.info(`Listening for requests on http://localhost:${PORT}`);
});
