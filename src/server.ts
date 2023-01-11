import express from 'express';
import { profileRouter } from '@routes/ProfileRoute';

const app = express();

app.use(express.json())

app.get("*", (req, res) => {
  res.status(404).send("Resource Not Found");
});

app.use('/profiles',profileRouter)

export {
  app
}