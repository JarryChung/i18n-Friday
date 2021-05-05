import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import { createConnection } from 'typeorm';
import { route } from './router';

const Port = 3001;

createConnection()
  .then(async () => {
    const app: Koa = new Koa();

    app.use(logger());
    app.use(bodyParser());
    app.use(route());

    app.listen(Port);

    console.log(`Server running on http://localhost:${Port}`);
  })
  .catch((err) => {
    console.log('[typeorm] Connection error: ', err);
  });
