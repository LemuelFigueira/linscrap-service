import { LogService } from "@services/LogService";
import { profileRouter } from '@routes/ProfileRoute';
import express, { urlencoded } from 'express';

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

const log = new LogService('SERVER')

app.use(express.json())

app.use('/profiles', profileRouter)

app.get("*", (req, res) => {
  res.status(404).send("Resource Not Found");
});


app.use(urlencoded({ extended: true, limit: "50mb" }))

app.listen(port, () => {
  log.info(`Server running on port ${port}`)
})
