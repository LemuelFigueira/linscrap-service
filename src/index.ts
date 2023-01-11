import { app } from "./server";
import { LogService } from "@services/LogService";

require('dotenv').config()

const port = process.env.PORT || 3000;

const log = new LogService('SERVER')

app.listen(port, () => {
  log.info(`Server running on port ${port}`)
})
