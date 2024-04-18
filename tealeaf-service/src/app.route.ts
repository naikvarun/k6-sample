import express from 'express';
import { tealeafRoute } from './tealeaf/tealeaf.routes';

const appRoutes = express.Router();
appRoutes.use('/tealeaves', tealeafRoute);

export { appRoutes };
