import express from 'express';
import { tealeafController } from './tealeaf.controller';

const tealeafRoute = express.Router();

tealeafRoute.get('/', tealeafController.findAll);
tealeafRoute.get('/search/findByType', tealeafController.search);
tealeafRoute.get('/search/findByName', tealeafController.searchByName);
tealeafRoute.get('/:id', tealeafController.findById);

export { tealeafRoute };
