/*app.ts*/
import 'dotenv/config'
import { setupTracing } from './instrumentation';
const tracer = setupTracing('water-api', '0.0.1');
import { app } from './app';

import { getLogger } from './logger';

const logger = getLogger();

const PORT: number = parseInt(process.env.PORT || '8092');


app.listen(PORT, () => {
  logger.info(`Listening for requests on http://localhost:${PORT}`);
});
