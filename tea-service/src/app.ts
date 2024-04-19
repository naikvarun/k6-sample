/*app.ts*/

import express, { Express } from 'express';
import 'express-async-errors';
import { appRoutes } from './app.route';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler.ts';
import cors from 'cors';
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', appRoutes);
//app.use('/api/steep', steepRoute);
//app.use('/api/tea/make', teaController.makeTea);
// app.get('/api/steep', steepController.steep);

// app.get('/api/tea', (req, res) => res.status(200).send('TEA'));

app.get('/health', (req, res) => res.status(200).send('HEALTHY')); // endpoint that is called by framework/cluster
app.use(notFound());
app.use(errorHandler());

export { app };
