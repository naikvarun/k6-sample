import express from 'express';
import { waterController } from './water.controller';

const waterRoute = express.Router();

waterRoute.get('/', waterController.findAll)
waterRoute.get('/search/findBySize', waterController.search);
waterRoute.get('/:id', waterController.findById);

export {waterRoute}