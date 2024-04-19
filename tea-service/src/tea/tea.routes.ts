import express from 'express';
import { teaController } from './tea.controller';

const teaRoute = express.Router({ mergeParams: true });

teaRoute.get('/make', teaController.makeTea);

export { teaRoute };
