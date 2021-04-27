import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { route } from "./router";

const app: Koa = new Koa();

app.use(bodyParser());
app.use(route());

app.listen(8080);

console.log("Server running on http://localhost:8080");
