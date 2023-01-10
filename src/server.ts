import express from 'express';
import { profileRouter } from './routes/ProfileRoute';

const app = express();

app.use('/profiles',profileRouter)

export {
  app
}