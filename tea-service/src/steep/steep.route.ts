import express from 'express';
import { steepController } from './steep.controller';

const steepRoute = express.Router({ mergeParams: true });

steepRoute.get('/', steepController.steep);

export { steepRoute };
