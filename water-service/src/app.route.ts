import express from 'express';
import { waterRoute } from './water/water.routes';

const appRoutes = express.Router();
appRoutes.use('/water', waterRoute);

export {appRoutes}