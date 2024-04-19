import express from 'express';
import { teaRoute } from './tea/tea.routes';
import { steepRoute } from './steep/steep.route';
import { steepController } from './steep/steep.controller';
const appRoutes = express.Router({ mergeParams: true });

appRoutes.use('/steep', steepRoute);
appRoutes.use('/tea', teaRoute);

export { appRoutes };
